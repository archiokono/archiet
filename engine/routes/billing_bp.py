"""Stripe billing — checkout + webhook + portal.

Routes:
  POST /api/billing/checkout          — create Stripe checkout session
  POST /api/billing/portal            — customer portal session
  POST /api/billing/webhook           — Stripe webhook (no JWT)
  GET  /billing/upgrade               — upgrade page (HTML)
  GET  /api/billing/status            — current plan status
"""
from __future__ import annotations
import os, json, logging
from datetime import datetime
from flask import Blueprint, jsonify, request, render_template, redirect
from flask_jwt_extended import jwt_required, get_jwt_identity

from database import db
from app.models.workspace import Workspace

logger = logging.getLogger(__name__)
billing_bp = Blueprint("billing", __name__)

PLANS = {
    "starter": {"price_id": os.environ.get("STRIPE_PRICE_STARTER"), "limit": 20,   "name": "Starter"},
    "pro":     {"price_id": os.environ.get("STRIPE_PRICE_PRO"),     "limit": 100,  "name": "Pro"},
    "enterprise": {"price_id": None,                                  "limit": 9999, "name": "Enterprise"},
}

@billing_bp.get("/billing/upgrade")
def upgrade_page():
    return render_template("billing/upgrade.html", plans=PLANS, title="Upgrade — Archiet")

@billing_bp.get("/api/billing/status")
@jwt_required()
def billing_status():
    user_id = get_jwt_identity()
    ws = Workspace.query.filter_by(owner_id=user_id).first()
    if not ws:
        return jsonify({"plan": "free", "can_generate": True, "generations_this_month": 0, "monthly_limit": 3})
    return jsonify(ws.to_dict())

@billing_bp.post("/api/billing/checkout")
@jwt_required()
def create_checkout():
    user_id = get_jwt_identity()
    data = request.get_json(force=True) or {}
    plan = data.get("plan", "starter")
    if plan not in PLANS or not PLANS[plan]["price_id"]:
        return jsonify({"error": "Invalid plan or Stripe not configured"}), 400

    try:
        import stripe
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

        ws = Workspace.query.filter_by(owner_id=user_id).first()
        customer_id = ws.stripe_customer_id if ws else None

        session = stripe.checkout.Session.create(
            mode="subscription",
            payment_method_types=["card"],
            line_items=[{"price": PLANS[plan]["price_id"], "quantity": 1}],
            customer=customer_id,
            client_reference_id=user_id,
            success_url=os.environ.get("APP_URL", "http://localhost:5000") + "/billing/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=os.environ.get("APP_URL", "http://localhost:5000") + "/billing/upgrade",
            metadata={"user_id": user_id, "plan": plan},
        )
        return jsonify({"checkout_url": session.url, "session_id": session.id})
    except Exception as exc:
        logger.error("Stripe checkout error: %s", exc)
        return jsonify({"error": str(exc)}), 500

@billing_bp.post("/api/billing/portal")
@jwt_required()
def customer_portal():
    user_id = get_jwt_identity()
    ws = Workspace.query.filter_by(owner_id=user_id).first()
    if not ws or not ws.stripe_customer_id:
        return jsonify({"error": "No billing account found"}), 404
    try:
        import stripe
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
        session = stripe.billing_portal.Session.create(
            customer=ws.stripe_customer_id,
            return_url=os.environ.get("APP_URL", "http://localhost:5000") + "/dashboard",
        )
        return jsonify({"portal_url": session.url})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500

@billing_bp.post("/api/billing/webhook")
def stripe_webhook():
    """Stripe webhook — signature-verified, no JWT."""
    payload = request.get_data()
    sig = request.headers.get("Stripe-Signature")
    secret = os.environ.get("STRIPE_WEBHOOK_SECRET")

    try:
        import stripe
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")
        event = stripe.Webhook.construct_event(payload, sig, secret)
    except Exception as exc:
        logger.warning("Webhook verify failed: %s", exc)
        return jsonify({"error": str(exc)}), 400

    etype = event["type"]
    obj = event["data"]["object"]

    if etype == "checkout.session.completed":
        _handle_checkout_complete(obj)
    elif etype in ("customer.subscription.updated", "customer.subscription.deleted"):
        _handle_subscription_change(obj)
    elif etype == "invoice.payment_failed":
        _handle_payment_failed(obj)

    return jsonify({"received": True})

def _handle_checkout_complete(session_obj: dict):
    user_id = session_obj.get("metadata", {}).get("user_id")
    plan = session_obj.get("metadata", {}).get("plan", "starter")
    customer_id = session_obj.get("customer")
    subscription_id = session_obj.get("subscription")
    if not user_id:
        return
    ws = Workspace.query.filter_by(owner_id=user_id).first()
    if not ws:
        import uuid
        slug = f"ws-{user_id[:8]}"
        ws = Workspace(id=str(uuid.uuid4()), owner_id=user_id, slug=slug, name="My Workspace")
        db.session.add(ws)
    ws.plan = plan
    ws.stripe_customer_id = customer_id
    ws.stripe_subscription_id = subscription_id
    ws.subscription_status = "active"
    ws.monthly_limit = PLANS.get(plan, {}).get("limit", 20)
    ws.updated_at = datetime.utcnow()
    db.session.commit()
    logger.info("Checkout complete: user=%s plan=%s", user_id, plan)

def _handle_subscription_change(sub_obj: dict):
    sub_id = sub_obj.get("id")
    status = sub_obj.get("status")
    ws = Workspace.query.filter_by(stripe_subscription_id=sub_id).first()
    if ws:
        ws.subscription_status = status
        if status in ("canceled", "unpaid"):
            ws.plan = "free"
            ws.monthly_limit = 3
        ws.updated_at = datetime.utcnow()
        db.session.commit()
        logger.info("Subscription %s → %s for workspace %s", sub_id, status, ws.id)

def _handle_payment_failed(invoice_obj: dict):
    customer_id = invoice_obj.get("customer")
    ws = Workspace.query.filter_by(stripe_customer_id=customer_id).first()
    if ws:
        ws.subscription_status = "past_due"
        ws.updated_at = datetime.utcnow()
        db.session.commit()
