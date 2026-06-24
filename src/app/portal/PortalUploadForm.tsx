"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DownloadIcon from "@mui/icons-material/Download";
import ArticleIcon from "@mui/icons-material/Article";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getRfpPricingProfiles } from "@/lib/rfp-pricing-profiles";
import { PortalSignOutButton } from "../login/PortalSignOutButton";

interface PortalUploadFormProps {
  displayName: string;
  email: string;
  role: "admin" | "client";
}

function parseFilenameFromDisposition(value: string | null) {
  if (!value) return null;

  const encodedMatch = value.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedMatch?.[1]) {
    return decodeURIComponent(encodedMatch[1]);
  }

  const match = value.match(/filename="?([^"]+)"?/i);
  return match?.[1] ?? null;
}

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  return url;
}

function triggerUrlDownload(url: string, fileName?: string) {
  const anchor = document.createElement("a");
  anchor.href = url;
  if (fileName) {
    anchor.download = fileName;
  }
  anchor.click();
}

interface PortalRfpJobState {
  id: string;
  status: "queued" | "processing" | "completed" | "failed";
  statusMessage: string | null;
  errorMessage: string | null;
  opportunityTitle: string | null;
  issuerName: string | null;
  resultFileName: string | null;
  hasResultPdf: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  completedAt: string | null;
  failedAt: string | null;
}

const ACTIVE_JOB_STORAGE_PREFIX = "senna-portal-rfp-job:";

function getActiveJobStorageKey(email: string) {
  return `${ACTIVE_JOB_STORAGE_PREFIX}${email.trim().toLowerCase()}`;
}

async function readResponseMessage(response: Response, fallback: string) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await response.json().catch(() => null)) as
      | {
          error?: string;
          message?: string;
        }
      | null;
    const message = payload?.error || payload?.message;

    if (typeof message === "string" && message.trim()) {
      return message.trim();
    }
  }

  const text = (await response.text().catch(() => "")).trim();
  return text ? text.slice(0, 240) : fallback;
}

const pricingProfileOptions = Object.values(getRfpPricingProfiles()).map(
  (profile) => ({
    key: profile.key,
    label: profile.label,
  }),
);

const opportunityTypeOptions = [
  { value: "assessment-only", label: "Assessment Only" },
  { value: "workflow-automation-small", label: "Workflow Automation Small" },
  { value: "workflow-automation-mid", label: "Workflow Automation Mid" },
  { value: "crm-integration", label: "CRM Integration" },
];

function parseMultilineList(value: string) {
  return value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function PortalUploadForm({
  displayName,
  email,
  role,
}: PortalUploadFormProps) {
  const activeJobStorageKey = getActiveJobStorageKey(email);
  const [file, setFile] = useState<File | null>(null);
  const [opportunityTitle, setOpportunityTitle] = useState("");
  const [issuerName, setIssuerName] = useState("");
  const [notes, setNotes] = useState("");
  const [opportunityType, setOpportunityType] = useState(
    "workflow-automation-small",
  );
  const [pricingProfileKey, setPricingProfileKey] = useState(
    "workflow-automation-small",
  );
  const [phaseOneValue, setPhaseOneValue] = useState("");
  const [phaseTwoValue, setPhaseTwoValue] = useState("");
  const [optionalAddOnOneLabel, setOptionalAddOnOneLabel] = useState(
    "Additional seat invoicing workflow",
  );
  const [optionalAddOnOneValue, setOptionalAddOnOneValue] = useState("");
  const [optionalAddOnTwoLabel, setOptionalAddOnTwoLabel] = useState(
    "Operational reporting dashboard",
  );
  const [optionalAddOnTwoValue, setOptionalAddOnTwoValue] = useState("");
  const [basicSupportValue, setBasicSupportValue] = useState("");
  const [standardSupportValue, setStandardSupportValue] = useState("");
  const [advisorySupportValue, setAdvisorySupportValue] = useState("");
  const [hourlySupportValue, setHourlySupportValue] = useState("");
  const [staffingNotes, setStaffingNotes] = useState("");
  const [technologyOverrides, setTechnologyOverrides] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [activeJob, setActiveJob] = useState<PortalRfpJobState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPollingJob, setIsPollingJob] = useState(false);
  const downloadUrlRef = useRef<string>("");
  const completedJobDownloadRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (downloadUrlRef.current) {
        URL.revokeObjectURL(downloadUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedJobId = window.localStorage.getItem(activeJobStorageKey);
    if (!storedJobId) return;

    setActiveJob((current) =>
      current?.id === storedJobId
        ? current
        : {
            id: storedJobId,
            status: "queued",
            statusMessage: "Resuming the most recent portal proposal job.",
            errorMessage: null,
            opportunityTitle: null,
            issuerName: null,
            resultFileName: null,
            hasResultPdf: false,
            createdAt: null,
            updatedAt: null,
            completedAt: null,
            failedAt: null,
          },
    );
  }, [activeJobStorageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!activeJob?.id) {
      window.localStorage.removeItem(activeJobStorageKey);
      return;
    }

    window.localStorage.setItem(activeJobStorageKey, activeJob.id);
  }, [activeJob?.id, activeJobStorageKey]);

  useEffect(() => {
    if (!activeJob?.id) return;
    if (activeJob.status === "completed" || activeJob.status === "failed") {
      return;
    }

    let isDisposed = false;
    let nextPollHandle: number | null = null;

    const pollJob = async () => {
      try {
        setIsPollingJob(true);
        const response = await fetch(`/api/portal/rfp-jobs/${activeJob.id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            await readResponseMessage(
              response,
              "Unable to load the portal RFP job.",
            ),
          );
        }

        const payload = (await response.json().catch(() => null)) as
          | {
              job?: PortalRfpJobState;
            }
          | null;

        if (isDisposed || !payload?.job) return;

        setActiveJob(payload.job);
      } catch (error) {
        if (!isDisposed) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Unable to load the portal RFP job.",
          );
        }
      } finally {
        if (!isDisposed) {
          setIsPollingJob(false);
          nextPollHandle = window.setTimeout(pollJob, 4000);
        }
      }
    };

    void pollJob();

    return () => {
      isDisposed = true;
      if (nextPollHandle !== null) {
        window.clearTimeout(nextPollHandle);
      }
    };
  }, [activeJob?.id, activeJob?.status]);

  useEffect(() => {
    if (!activeJob?.id || activeJob.status !== "completed" || !activeJob.hasResultPdf) {
      return;
    }

    if (completedJobDownloadRef.current === activeJob.id) {
      return;
    }

    completedJobDownloadRef.current = activeJob.id;
    const nextDownloadUrl = `/api/portal/rfp-jobs/${activeJob.id}/download`;
    setDownloadUrl(nextDownloadUrl);
    setDownloadName(activeJob.resultFileName || "senna-rfp-response.pdf");
    setSuccessMessage(
      activeJob.statusMessage ||
        "Final proposal PDF generated. Your download should begin automatically.",
    );
    triggerUrlDownload(nextDownloadUrl, activeJob.resultFileName || undefined);
  }, [
    activeJob?.hasResultPdf,
    activeJob?.id,
    activeJob?.resultFileName,
    activeJob?.status,
    activeJob?.statusMessage,
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;

    setErrorMessage("");
    setSuccessMessage("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setFile(null);
      setErrorMessage("Portal uploads are PDF-only in v1.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const resetDownloadUrl = () => {
    if (downloadUrlRef.current) {
      URL.revokeObjectURL(downloadUrlRef.current);
      downloadUrlRef.current = "";
    }
    setDownloadUrl("");
    setDownloadName("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Choose a PDF before submitting.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");
    resetDownloadUrl();

    try {
      const tokenResponse = await fetch("/api/portal/rfp-upload-token", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      });

      const tokenBody = await tokenResponse.json().catch(() => null);

      if (!tokenResponse.ok || !tokenBody?.token || !tokenBody?.endpoint) {
        throw new Error(
          tokenBody?.error || "Unable to prepare the portal upload request.",
        );
      }

      const formData = new FormData();
      const pricingLineItems = [
        phaseOneValue.trim()
          ? {
              label: "Workflow Validation and Future-State Design",
              value: phaseOneValue.trim(),
              assumptions: [
                "User-supplied exact pricing.",
                "Assumptions should be confirmed against validated scope and access.",
              ],
            }
          : null,
        phaseTwoValue.trim()
          ? {
              label: "Initial Implementation Release",
              value: phaseTwoValue.trim(),
              assumptions: [
                "User-supplied exact pricing.",
                "Release scope should stay aligned to confirmed first-phase priorities.",
              ],
            }
          : null,
        optionalAddOnOneValue.trim()
          ? {
              label: optionalAddOnOneLabel.trim() || "Optional add-on",
              value: optionalAddOnOneValue.trim(),
              assumptions: ["Optional add-on supplied through the portal."],
              optional: true,
            }
          : null,
        optionalAddOnTwoValue.trim()
          ? {
              label: optionalAddOnTwoLabel.trim() || "Optional add-on",
              value: optionalAddOnTwoValue.trim(),
              assumptions: ["Optional add-on supplied through the portal."],
              optional: true,
            }
          : null,
      ].filter(Boolean);
      const supportTiers = [
        basicSupportValue.trim()
          ? {
              name: "Basic Support",
              value: basicSupportValue.trim(),
              includedServices: [
                "Email support",
                "Monitoring review",
                "Minor issue triage",
              ],
              availability: "Business-hours response",
            }
          : null,
        standardSupportValue.trim()
          ? {
              name: "Standard Support",
              value: standardSupportValue.trim(),
              includedServices: [
                "Priority support",
                "Minor workflow changes",
                "Reporting review",
              ],
              availability: "Priority business-hours response",
            }
          : null,
        advisorySupportValue.trim()
          ? {
              name: "Advisory Support",
              value: advisorySupportValue.trim(),
              includedServices: [
                "Optimization guidance",
                "Roadmap review",
                "Advisory check-ins",
              ],
              availability: "Priority support plus advisory sessions",
            }
          : null,
      ].filter(Boolean);
      const commercialInputs = {
        pricingLineItems,
        supportTiers,
        hourlySupport: hourlySupportValue.trim()
          ? {
              label: "Out-of-scope hourly support",
              value: hourlySupportValue.trim(),
              assumptions: ["User-supplied exact hourly support rate."],
            }
          : undefined,
      };

      formData.append("rfpFile", file);
      formData.append("schemaVersion", "rfp-proposal-v2");
      formData.append("renderMode", "final");
      formData.append("opportunityTitle", opportunityTitle.trim());
      formData.append("issuerName", issuerName.trim());
      formData.append("opportunityType", opportunityType.trim());
      formData.append("pricingProfileKey", pricingProfileKey.trim());
      formData.append("notes", notes.trim());
      formData.append("responseTone", "professional");
      formData.append("sourceChannel", "portal");
      formData.append("commercialInputs", JSON.stringify(commercialInputs));
      formData.append(
        "staffingNotes",
        JSON.stringify(parseMultilineList(staffingNotes)),
      );
      formData.append(
        "technologyContextOverrides",
        JSON.stringify(parseMultilineList(technologyOverrides)),
      );

      const proposalResponse = await fetch(tokenBody.endpoint, {
        method: "POST",
        headers: {
          "X-Senna-Portal-Token": tokenBody.token,
        },
        body: formData,
        credentials: "omit",
      });

      if (!proposalResponse.ok) {
        throw new Error(
          await readResponseMessage(
            proposalResponse,
            `Portal workflow failed with status ${proposalResponse.status}.`,
          ),
        );
      }

      const contentType = proposalResponse.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const payload = (await proposalResponse.json().catch(() => null)) as
          | {
              job?: Partial<PortalRfpJobState> | null;
              jobId?: string;
              status?: PortalRfpJobState["status"];
              statusMessage?: string;
              message?: string;
            }
          | null;

        const jobId =
          payload?.job?.id || (typeof payload?.jobId === "string" ? payload.jobId : "");

        if (!jobId) {
          throw new Error("Portal workflow did not return a job identifier.");
        }

        completedJobDownloadRef.current = "";
        setActiveJob({
          id: jobId,
          status: payload?.job?.status || payload?.status || "queued",
          statusMessage:
            payload?.job?.statusMessage ||
            payload?.statusMessage ||
            payload?.message ||
            "Submission accepted. Proposal generation is queued.",
          errorMessage: null,
          opportunityTitle: opportunityTitle.trim() || null,
          issuerName: issuerName.trim() || null,
          resultFileName:
            typeof payload?.job?.resultFileName === "string"
              ? payload.job.resultFileName
              : null,
          hasResultPdf: Boolean(payload?.job?.hasResultPdf),
          createdAt: null,
          updatedAt: null,
          completedAt: null,
          failedAt: null,
        });
        setSuccessMessage(
          "Proposal generation started. The portal will download the PDF once it is ready.",
        );
        return;
      }

      const disposition = proposalResponse.headers.get("content-disposition");
      const fileName =
        parseFilenameFromDisposition(disposition) || "senna-rfp-response.pdf";
      const blob = await proposalResponse.blob();
      const objectUrl = triggerDownload(blob, fileName);

      completedJobDownloadRef.current = "legacy-sync-download";
      downloadUrlRef.current = objectUrl;
      setDownloadUrl(objectUrl);
      setDownloadName(fileName);
      setActiveJob(null);
      setSuccessMessage(
        "Final proposal PDF generated. Your download should begin automatically.",
      );
    } catch (error) {
      console.error("[Portal] Upload failed", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to complete the portal upload.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: "28px",
        border: "1px solid var(--color-border-soft)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,247,249,0.98) 100%)",
        boxShadow: "0 24px 80px rgba(24, 25, 37, 0.08)",
      }}
    >
      <Stack spacing={3.5} component="form" onSubmit={handleSubmit}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" }
          }}>
          <Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
              <Chip
                label="Portal"
                sx={{
                  bgcolor: "rgba(143, 0, 107, 0.08)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                }}
              />
              <Chip
                label={role}
                variant="outlined"
                sx={{
                  borderColor: "var(--color-border-soft)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              />
            </Stack>
            <Typography variant="h3" sx={{ mb: 1 }}>
              Upload an RFP PDF
            </Typography>
            <Typography variant="body1" sx={{ color: "var(--color-text-secondary)" }}>
              Signed in as {displayName} ({email}). The file posts directly to
              the Senna n8n workflow after the website issues a short-lived
              upload token.
            </Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
            <Button
              href="/portal/rfp-preview"
              variant="outlined"
              startIcon={<VisibilityOutlinedIcon />}
              sx={{ borderRadius: "999px" }}
            >
              Open layout preview
            </Button>
            <PortalSignOutButton />
          </Stack>
        </Stack>

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
        {activeJob ? (
          <Alert
            severity={
              activeJob.status === "failed"
                ? "error"
                : activeJob.status === "completed"
                  ? "success"
                  : "info"
            }
          >
            {activeJob.status === "queued" || activeJob.status === "processing"
              ? activeJob.statusMessage ||
                "Proposal generation is still in progress."
              : activeJob.status === "failed"
                ? activeJob.errorMessage ||
                  activeJob.statusMessage ||
                  "Proposal generation failed."
                : activeJob.statusMessage ||
                  "Final proposal PDF is ready to download."}
          </Alert>
        ) : null}

        <Stack spacing={1.5}>
          <Typography variant="h6">RFP PDF</Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{
              alignItems: { xs: "stretch", sm: "center" }
            }}
          >
            <Button
              component="label"
              variant="contained"
              startIcon={<UploadFileIcon />}
              sx={{ borderRadius: "999px", alignSelf: { xs: "stretch", sm: "flex-start" } }}
            >
              Choose PDF
              <input
                hidden
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
              />
            </Button>
            <Stack direction="row" spacing={1} sx={{
              alignItems: "center"
            }}>
              <ArticleIcon sx={{ color: "var(--color-accent)" }} />
              <Typography variant="body2" sx={{ color: "var(--color-text-secondary)" }}>
                {file ? file.name : "No file selected"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Opportunity Title"
            value={opportunityTitle}
            onChange={(event) => setOpportunityTitle(event.target.value)}
            placeholder="Roundtable program workflow assessment"
            fullWidth
          />
          <TextField
            label="Issuer / Organization"
            value={issuerName}
            onChange={(event) => setIssuerName(event.target.value)}
            placeholder="Greater Grand Rapids Chamber"
            fullWidth
          />
          <TextField
            label="Internal Notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional positioning, exclusions, or context."
            fullWidth
            multiline
            minRows={4}
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6">Commercial Inputs</Typography>
          <Alert severity="info">
            Exact pricing is optional here, but final-ready output should use
            either exact values or the selected budgetary profile.
          </Alert>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              select
              label="Opportunity Type"
              value={opportunityType}
              onChange={(event) => setOpportunityType(event.target.value)}
              fullWidth
            >
              {opportunityTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Budgetary Pricing Profile"
              value={pricingProfileKey}
              onChange={(event) => setPricingProfileKey(event.target.value)}
              fullWidth
            >
              {pricingProfileOptions.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Phase 1 Pricing"
              value={phaseOneValue}
              onChange={(event) => setPhaseOneValue(event.target.value)}
              placeholder="$6,500 - $9,500"
              fullWidth
            />
            <TextField
              label="Phase 2 Pricing"
              value={phaseTwoValue}
              onChange={(event) => setPhaseTwoValue(event.target.value)}
              placeholder="$12,000 - $18,000"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Optional Add-On 1"
              value={optionalAddOnOneLabel}
              onChange={(event) => setOptionalAddOnOneLabel(event.target.value)}
              fullWidth
            />
            <TextField
              label="Add-On 1 Pricing"
              value={optionalAddOnOneValue}
              onChange={(event) => setOptionalAddOnOneValue(event.target.value)}
              placeholder="$2,500 - $4,500"
              fullWidth
            />
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Optional Add-On 2"
              value={optionalAddOnTwoLabel}
              onChange={(event) => setOptionalAddOnTwoLabel(event.target.value)}
              fullWidth
            />
            <TextField
              label="Add-On 2 Pricing"
              value={optionalAddOnTwoValue}
              onChange={(event) => setOptionalAddOnTwoValue(event.target.value)}
              placeholder="$3,000 - $5,000"
              fullWidth
            />
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6">Support And Delivery Inputs</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Basic Support"
              value={basicSupportValue}
              onChange={(event) => setBasicSupportValue(event.target.value)}
              placeholder="$500/month"
              fullWidth
            />
            <TextField
              label="Standard Support"
              value={standardSupportValue}
              onChange={(event) => setStandardSupportValue(event.target.value)}
              placeholder="$1,250/month"
              fullWidth
            />
            <TextField
              label="Advisory Support"
              value={advisorySupportValue}
              onChange={(event) => setAdvisorySupportValue(event.target.value)}
              placeholder="$2,400/month"
              fullWidth
            />
          </Stack>
          <TextField
            label="Hourly Support"
            value={hourlySupportValue}
            onChange={(event) => setHourlySupportValue(event.target.value)}
            placeholder="$225/hour"
            fullWidth
          />
          <TextField
            label="Staffing Notes"
            value={staffingNotes}
            onChange={(event) => setStaffingNotes(event.target.value)}
            placeholder="One accountable senior lead remains responsible for delivery."
            fullWidth
            multiline
            minRows={3}
            helperText="One note per line. These notes travel with the v2 payload."
          />
          <TextField
            label="Technology Context Overrides"
            value={technologyOverrides}
            onChange={(event) => setTechnologyOverrides(event.target.value)}
            placeholder="Confirm the current CRM and source-of-truth ownership."
            fullWidth
            multiline
            minRows={3}
            helperText="One note per line. Use this for platform constraints or context that the draft should preserve."
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" }
          }}>
          <Typography
            variant="body2"
            sx={{ color: "var(--color-text-muted)", maxWidth: 540 }}
          >
            The portal now submits an async final-PDF job. The v2 payload
            includes pricing profile, exact commercial overrides, staffing
            context, and technology notes for the downstream workflow.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            {downloadUrl ? (
              <Button
                href={downloadUrl}
                download={downloadName}
                variant="outlined"
                startIcon={<DownloadIcon />}
                sx={{ borderRadius: "999px" }}
              >
                Download Again
              </Button>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || isPollingJob}
              startIcon={
                isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : isPollingJob ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <UploadFileIcon />
                )
              }
              sx={{ borderRadius: "999px", minWidth: 220 }}
            >
              {isSubmitting
                ? "Submitting Job"
                : isPollingJob
                  ? "Generating PDF"
                  : "Generate Final PDF"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
