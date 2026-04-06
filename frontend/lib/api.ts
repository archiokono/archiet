


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""
// When basePath is set (nginx subpath proxy), API calls must be prefixed with the
// basePath so they route through Next.js and hit the /api rewrite.

const _BASE_PATH = ""


export class ApiError extends Error {
  status: number
  detail: string
  /** Pydantic / FastAPI validation errors (422 responses) */
  fieldErrors?: Array<{ loc: string[]; msg: string; type: string }>

  constructor(
    status: number,
    detail: string,
    fieldErrors?: Array<{ loc: string[]; msg: string; type: string }>,
  ) {
    super(`API ${status}: ${detail}`)
    this.status = status
    this.detail = detail
    this.fieldErrors = fieldErrors
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  params?: Record<string, string | undefined>,
): Promise<T> {
  // Prepend basePath so API calls route through nginx → Next.js rewrite → FastAPI
  const resolvedPath = BASE_URL ? path : _BASE_PATH + path
  const url = new URL(resolvedPath, BASE_URL || window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== "") url.searchParams.set(key, value)
    })
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" }

  // Include auth token if stored
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    let detail = res.statusText
    let fieldErrors: Array<{ loc: string[]; msg: string; type: string }> | undefined
    try {
      const body = await res.json()
      if (Array.isArray(body.detail)) {
        // FastAPI / Pydantic 422 validation errors
        fieldErrors = body.detail
        detail = body.detail
          .map((e: any) => `${e.loc?.slice(-1)?.[0] ?? "field"}: ${e.msg}`)
          .join("; ")
      } else {
        detail = body.detail || body.error || body.message || detail
      }
    } catch {}

    if (res.status === 401) {
      localStorage.removeItem("token")
      document.cookie = "token=; max-age=0; path=/"
      window.location.href = _BASE_PATH + "/login"
    }

    throw new ApiError(res.status, detail, fieldErrors)
  }

  if (res.status === 204) return undefined as T
  return res.json()
}

export const api = {
  get: <T>(path: string, params?: Record<string, string | undefined>) =>
    request<T>("GET", path, undefined, params),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
}
