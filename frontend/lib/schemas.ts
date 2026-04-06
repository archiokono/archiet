
/**
 * Auto-generated Zod schemas for Archiet — AI-Native Architecture-to-Code SaaS Platform.
 * DO NOT EDIT — regenerate via the ARCHIE Code Workbench.
 */
import { z } from "zod"



export const SmtpRelayGcpSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type SmtpRelayGcpInput = z.infer<typeof SmtpRelayGcpSchema>
export type SmtpRelayGcp = SmtpRelayGcpInput & { id: number | string; created_at?: string; updated_at?: string }




export const PrimaryDataStoreSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  storage_type: z.string().max(50),

  capacity: z.string().max(50),

  connection_string: z.string().max(500),

  status: z.enum(["active", "inactive", "archived"]),

})

export type PrimaryDataStoreInput = z.infer<typeof PrimaryDataStoreSchema>
export type PrimaryDataStore = PrimaryDataStoreInput & { id: number | string; created_at?: string; updated_at?: string }




export const IdentityAndAccessManagementSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type IdentityAndAccessManagementInput = z.infer<typeof IdentityAndAccessManagementSchema>
export type IdentityAndAccessManagement = IdentityAndAccessManagementInput & { id: number | string; created_at?: string; updated_at?: string }




export const AuthenticationServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type AuthenticationServiceInput = z.infer<typeof AuthenticationServiceSchema>
export type AuthenticationService = AuthenticationServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const MonitoringPlatformSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type MonitoringPlatformInput = z.infer<typeof MonitoringPlatformSchema>
export type MonitoringPlatform = MonitoringPlatformInput & { id: number | string; created_at?: string; updated_at?: string }




export const AnalyticsEngineSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  metric_name: z.string().max(100),

  value: z.number(),

  target: z.number(),

  unit: z.string().max(20),

  measured_at: z.string().datetime({ offset: true }),

  status: z.enum(["active", "inactive", "archived"]),

})

export type AnalyticsEngineInput = z.infer<typeof AnalyticsEngineSchema>
export type AnalyticsEngine = AnalyticsEngineInput & { id: number | string; created_at?: string; updated_at?: string }




export const ReportingServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  title: z.string().max(500),

  document_type: z.string().max(50),

  effective_date: z.string().datetime({ offset: true }),

  expiry_date: z.string().datetime({ offset: true }),

  status: z.enum(["active", "inactive", "archived"]),

})

export type ReportingServiceInput = z.infer<typeof ReportingServiceSchema>
export type ReportingService = ReportingServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const GcpCohesityForSystemsBackupSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GcpCohesityForSystemsBackupInput = z.infer<typeof GcpCohesityForSystemsBackupSchema>
export type GcpCohesityForSystemsBackup = GcpCohesityForSystemsBackupInput & { id: number | string; created_at?: string; updated_at?: string }




export const ApiGatewaySchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type ApiGatewayInput = z.infer<typeof ApiGatewaySchema>
export type ApiGateway = ApiGatewayInput & { id: number | string; created_at?: string; updated_at?: string }




export const MessageBrokerSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type MessageBrokerInput = z.infer<typeof MessageBrokerSchema>
export type MessageBroker = MessageBrokerInput & { id: number | string; created_at?: string; updated_at?: string }




export const BusinessLogicLayerSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type BusinessLogicLayerInput = z.infer<typeof BusinessLogicLayerSchema>
export type BusinessLogicLayer = BusinessLogicLayerInput & { id: number | string; created_at?: string; updated_at?: string }




export const CoreBusinessFunctionSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CoreBusinessFunctionInput = z.infer<typeof CoreBusinessFunctionSchema>
export type CoreBusinessFunction = CoreBusinessFunctionInput & { id: number | string; created_at?: string; updated_at?: string }




export const CoreBusinessApiSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CoreBusinessApiInput = z.infer<typeof CoreBusinessApiSchema>
export type CoreBusinessApi = CoreBusinessApiInput & { id: number | string; created_at?: string; updated_at?: string }




export const FrontendApplicationSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type FrontendApplicationInput = z.infer<typeof FrontendApplicationSchema>
export type FrontendApplication = FrontendApplicationInput & { id: number | string; created_at?: string; updated_at?: string }




export const ActiveDirectoryAdSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type ActiveDirectoryAdInput = z.infer<typeof ActiveDirectoryAdSchema>
export type ActiveDirectoryAd = ActiveDirectoryAdInput & { id: number | string; created_at?: string; updated_at?: string }




export const NotificationServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type NotificationServiceInput = z.infer<typeof NotificationServiceSchema>
export type NotificationService = NotificationServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const GoogleGeminiModelsSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GoogleGeminiModelsInput = z.infer<typeof GoogleGeminiModelsSchema>
export type GoogleGeminiModels = GoogleGeminiModelsInput & { id: number | string; created_at?: string; updated_at?: string }




export const VeritasNetbackupSaaSSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type VeritasNetbackupSaaSInput = z.infer<typeof VeritasNetbackupSaaSSchema>
export type VeritasNetbackupSaaS = VeritasNetbackupSaaSInput & { id: number | string; created_at?: string; updated_at?: string }




export const BlueprintJourneyInterfaceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type BlueprintJourneyInterfaceInput = z.infer<typeof BlueprintJourneyInterfaceSchema>
export type BlueprintJourneyInterface = BlueprintJourneyInterfaceInput & { id: number | string; created_at?: string; updated_at?: string }




export const ArchitectureTemplateGallerySchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type ArchitectureTemplateGalleryInput = z.infer<typeof ArchitectureTemplateGallerySchema>
export type ArchitectureTemplateGallery = ArchitectureTemplateGalleryInput & { id: number | string; created_at?: string; updated_at?: string }




export const BlueprintPublicViewerSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type BlueprintPublicViewerInput = z.infer<typeof BlueprintPublicViewerSchema>
export type BlueprintPublicViewer = BlueprintPublicViewerInput & { id: number | string; created_at?: string; updated_at?: string }




export const CicdToolchainSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CicdToolchainInput = z.infer<typeof CicdToolchainSchema>
export type CicdToolchain = CicdToolchainInput & { id: number | string; created_at?: string; updated_at?: string }




export const CicdPipelineSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CicdPipelineInput = z.infer<typeof CicdPipelineSchema>
export type CicdPipeline = CicdPipelineInput & { id: number | string; created_at?: string; updated_at?: string }




export const HealthMonitoringSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type HealthMonitoringInput = z.infer<typeof HealthMonitoringSchema>
export type HealthMonitoring = HealthMonitoringInput & { id: number | string; created_at?: string; updated_at?: string }




export const GenomeSpecGeneratorSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GenomeSpecGeneratorInput = z.infer<typeof GenomeSpecGeneratorSchema>
export type GenomeSpecGenerator = GenomeSpecGeneratorInput & { id: number | string; created_at?: string; updated_at?: string }




export const CodeGenerationServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CodeGenerationServiceInput = z.infer<typeof CodeGenerationServiceSchema>
export type CodeGenerationService = CodeGenerationServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const ExportServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type ExportServiceInput = z.infer<typeof ExportServiceSchema>
export type ExportService = ExportServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const JourneySessionOrchestratorSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type JourneySessionOrchestratorInput = z.infer<typeof JourneySessionOrchestratorSchema>
export type JourneySessionOrchestrator = JourneySessionOrchestratorInput & { id: number | string; created_at?: string; updated_at?: string }




export const StripeWebhookHandlerSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type StripeWebhookHandlerInput = z.infer<typeof StripeWebhookHandlerSchema>
export type StripeWebhookHandler = StripeWebhookHandlerInput & { id: number | string; created_at?: string; updated_at?: string }




export const RowLevelSecurityEnforcerSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type RowLevelSecurityEnforcerInput = z.infer<typeof RowLevelSecurityEnforcerSchema>
export type RowLevelSecurityEnforcer = RowLevelSecurityEnforcerInput & { id: number | string; created_at?: string; updated_at?: string }




export const GdprComplianceServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GdprComplianceServiceInput = z.infer<typeof GdprComplianceServiceSchema>
export type GdprComplianceService = GdprComplianceServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const AiArchitectureEngineSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type AiArchitectureEngineInput = z.infer<typeof AiArchitectureEngineSchema>
export type AiArchitectureEngine = AiArchitectureEngineInput & { id: number | string; created_at?: string; updated_at?: string }




export const UsageMeteringLimitingSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type UsageMeteringLimitingInput = z.infer<typeof UsageMeteringLimitingSchema>
export type UsageMeteringLimiting = UsageMeteringLimitingInput & { id: number | string; created_at?: string; updated_at?: string }




export const QualityScoringEngineSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type QualityScoringEngineInput = z.infer<typeof QualityScoringEngineSchema>
export type QualityScoringEngine = QualityScoringEngineInput & { id: number | string; created_at?: string; updated_at?: string }




export const GitHubIntegrationServiceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  endpoint_url: z.string().max(500),

  service_type: z.string().max(50),

  version: z.string().max(20),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GitHubIntegrationServiceInput = z.infer<typeof GitHubIntegrationServiceSchema>
export type GitHubIntegrationService = GitHubIntegrationServiceInput & { id: number | string; created_at?: string; updated_at?: string }




export const CoreBusinessSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type CoreBusinessInput = z.infer<typeof CoreBusinessSchema>
export type CoreBusiness = CoreBusinessInput & { id: number | string; created_at?: string; updated_at?: string }




export const KeyMetricsAndKpIsSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  metric_name: z.string().max(100),

  value: z.number(),

  target: z.number(),

  unit: z.string().max(20),

  measured_at: z.string().datetime({ offset: true }),

  status: z.enum(["active", "inactive", "archived"]),

})

export type KeyMetricsAndKpIsInput = z.infer<typeof KeyMetricsAndKpIsSchema>
export type KeyMetricsAndKpIs = KeyMetricsAndKpIsInput & { id: number | string; created_at?: string; updated_at?: string }




export const AnalyticsDataStoreSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  metric_name: z.string().max(100),

  value: z.number(),

  target: z.number(),

  unit: z.string().max(20),

  measured_at: z.string().datetime({ offset: true }),

  status: z.enum(["active", "inactive", "archived"]),

})

export type AnalyticsDataStoreInput = z.infer<typeof AnalyticsDataStoreSchema>
export type AnalyticsDataStore = AnalyticsDataStoreInput & { id: number | string; created_at?: string; updated_at?: string }




export const WorkspaceSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type WorkspaceInput = z.infer<typeof WorkspaceSchema>
export type Workspace = WorkspaceInput & { id: number | string; created_at?: string; updated_at?: string }




export const JourneySessionConversationsSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type JourneySessionConversationsInput = z.infer<typeof JourneySessionConversationsSchema>
export type JourneySessionConversations = JourneySessionConversationsInput & { id: number | string; created_at?: string; updated_at?: string }




export const GenomeSpecDefinitionsSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GenomeSpecDefinitionsInput = z.infer<typeof GenomeSpecDefinitionsSchema>
export type GenomeSpecDefinitions = GenomeSpecDefinitionsInput & { id: number | string; created_at?: string; updated_at?: string }




export const GeneratedCodeArtifactsSchema = z.object({

  name: z.string().max(255),

  description: z.string().nullable().optional(),

  status: z.enum(["active", "inactive", "archived"]),

})

export type GeneratedCodeArtifactsInput = z.infer<typeof GeneratedCodeArtifactsSchema>
export type GeneratedCodeArtifacts = GeneratedCodeArtifactsInput & { id: number | string; created_at?: string; updated_at?: string }



