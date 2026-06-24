import { query } from "@/utils/db";
import { normalizePortalEmail, type PortalAccessRole } from "./portal-access";

export type PortalRfpJobStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed";

export interface PortalRfpJobRecord {
  id: string;
  createdByEmail: string;
  createdBySubject: string | null;
  portalAccessRole: PortalAccessRole | null;
  opportunityTitle: string | null;
  issuerName: string | null;
  sourceChannel: string | null;
  status: PortalRfpJobStatus;
  statusMessage: string | null;
  errorMessage: string | null;
  workflowExecutionId: string | null;
  resultFileName: string | null;
  resultPdf: Buffer | null;
  hasResultPdf: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  startedAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
}

interface CreatePortalRfpJobInput {
  id: string;
  createdByEmail: string;
  createdBySubject?: string | null;
  portalAccessRole?: PortalAccessRole | null;
  opportunityTitle?: string | null;
  issuerName?: string | null;
  sourceChannel?: string | null;
  status?: PortalRfpJobStatus;
  statusMessage?: string | null;
  workflowExecutionId?: string | null;
  metadata?: Record<string, unknown>;
}

interface UpdatePortalRfpJobInput {
  status?: PortalRfpJobStatus;
  statusMessage?: string | null;
  errorMessage?: string | null;
  workflowExecutionId?: string | null;
  resultFileName?: string | null;
  resultPdf?: Buffer | null;
  metadata?: Record<string, unknown>;
}

function normalizeMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function mapPortalRfpJobRow(row: Record<string, unknown>) {
  return {
    id: String(row.id || ""),
    createdByEmail: String(row.created_by_email || ""),
    createdBySubject:
      typeof row.created_by_subject === "string" ? row.created_by_subject : null,
    portalAccessRole:
      row.portal_access_role === "admin" || row.portal_access_role === "client"
        ? row.portal_access_role
        : null,
    opportunityTitle:
      typeof row.opportunity_title === "string" ? row.opportunity_title : null,
    issuerName: typeof row.issuer_name === "string" ? row.issuer_name : null,
    sourceChannel:
      typeof row.source_channel === "string" ? row.source_channel : null,
    status:
      row.status === "queued" ||
      row.status === "processing" ||
      row.status === "completed" ||
      row.status === "failed"
        ? row.status
        : "queued",
    statusMessage:
      typeof row.status_message === "string" ? row.status_message : null,
    errorMessage:
      typeof row.error_message === "string" ? row.error_message : null,
    workflowExecutionId:
      typeof row.workflow_execution_id === "string"
        ? row.workflow_execution_id
        : null,
    resultFileName:
      typeof row.result_file_name === "string" ? row.result_file_name : null,
    resultPdf: Buffer.isBuffer(row.result_pdf) ? row.result_pdf : null,
    hasResultPdf: Boolean(row.has_result_pdf),
    metadata: normalizeMetadata(row.metadata),
    createdAt: new Date(String(row.created_at || "")).toISOString(),
    updatedAt: new Date(String(row.updated_at || "")).toISOString(),
    startedAt: row.started_at ? new Date(String(row.started_at)).toISOString() : null,
    completedAt: row.completed_at
      ? new Date(String(row.completed_at)).toISOString()
      : null,
    failedAt: row.failed_at ? new Date(String(row.failed_at)).toISOString() : null,
  } satisfies PortalRfpJobRecord;
}

export async function createPortalRfpJob(input: CreatePortalRfpJobInput) {
  const result = await query(
    `
      insert into public.portal_rfp_jobs (
        id,
        created_by_email,
        created_by_subject,
        portal_access_role,
        opportunity_title,
        issuer_name,
        source_channel,
        status,
        status_message,
        workflow_execution_id,
        metadata
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb)
      returning
        id,
        created_by_email,
        created_by_subject,
        portal_access_role,
        opportunity_title,
        issuer_name,
        source_channel,
        status,
        status_message,
        error_message,
        workflow_execution_id,
        result_file_name,
        result_pdf,
        result_pdf is not null as has_result_pdf,
        metadata,
        created_at,
        updated_at,
        started_at,
        completed_at,
        failed_at
    `,
    [
      input.id,
      normalizePortalEmail(input.createdByEmail),
      input.createdBySubject || null,
      input.portalAccessRole || null,
      input.opportunityTitle || null,
      input.issuerName || null,
      input.sourceChannel || null,
      input.status || "queued",
      input.statusMessage || null,
      input.workflowExecutionId || null,
      JSON.stringify(input.metadata || {}),
    ],
  );

  return mapPortalRfpJobRow(result.rows[0] || {});
}

export async function updatePortalRfpJob(
  jobId: string,
  input: UpdatePortalRfpJobInput,
) {
  const result = await query(
    `
      update public.portal_rfp_jobs
      set
        status = coalesce($2, status),
        status_message = coalesce($3, status_message),
        error_message = case
          when $2 = 'completed' then null
          else coalesce($4, error_message)
        end,
        workflow_execution_id = coalesce($5, workflow_execution_id),
        result_file_name = coalesce($6, result_file_name),
        result_pdf = coalesce($7, result_pdf),
        metadata = case
          when $8::jsonb is null then metadata
          else metadata || $8::jsonb
        end,
        updated_at = now(),
        started_at = case
          when coalesce($2, status) in ('processing', 'completed', 'failed')
            and started_at is null
          then now()
          else started_at
        end,
        completed_at = case
          when $2 = 'completed' then now()
          when $2 = 'failed' then null
          else completed_at
        end,
        failed_at = case
          when $2 = 'failed' then now()
          when $2 = 'completed' then null
          else failed_at
        end
      where id = $1
      returning
        id,
        created_by_email,
        created_by_subject,
        portal_access_role,
        opportunity_title,
        issuer_name,
        source_channel,
        status,
        status_message,
        error_message,
        workflow_execution_id,
        result_file_name,
        result_pdf,
        result_pdf is not null as has_result_pdf,
        metadata,
        created_at,
        updated_at,
        started_at,
        completed_at,
        failed_at
    `,
    [
      jobId,
      input.status || null,
      input.statusMessage || null,
      input.errorMessage || null,
      input.workflowExecutionId || null,
      input.resultFileName || null,
      input.resultPdf || null,
      input.metadata ? JSON.stringify(input.metadata) : null,
    ],
  );

  if (!result.rowCount) {
    return null;
  }

  return mapPortalRfpJobRow(result.rows[0] || {});
}

export async function getPortalRfpJobForEmail(jobId: string, email: string) {
  const result = await query(
    `
      select
        id,
        created_by_email,
        created_by_subject,
        portal_access_role,
        opportunity_title,
        issuer_name,
        source_channel,
        status,
        status_message,
        error_message,
        workflow_execution_id,
        result_file_name,
        null::bytea as result_pdf,
        result_pdf is not null as has_result_pdf,
        metadata,
        created_at,
        updated_at,
        started_at,
        completed_at,
        failed_at
      from public.portal_rfp_jobs
      where id = $1 and created_by_email = $2
      limit 1
    `,
    [jobId, normalizePortalEmail(email)],
  );

  if (!result.rowCount) {
    return null;
  }

  return mapPortalRfpJobRow(result.rows[0] || {});
}

export async function getPortalRfpJobResultForEmail(jobId: string, email: string) {
  const result = await query(
    `
      select
        id,
        created_by_email,
        created_by_subject,
        portal_access_role,
        opportunity_title,
        issuer_name,
        source_channel,
        status,
        status_message,
        error_message,
        workflow_execution_id,
        result_file_name,
        result_pdf,
        result_pdf is not null as has_result_pdf,
        metadata,
        created_at,
        updated_at,
        started_at,
        completed_at,
        failed_at
      from public.portal_rfp_jobs
      where id = $1 and created_by_email = $2
      limit 1
    `,
    [jobId, normalizePortalEmail(email)],
  );

  if (!result.rowCount) {
    return null;
  }

  return mapPortalRfpJobRow(result.rows[0] || {});
}
