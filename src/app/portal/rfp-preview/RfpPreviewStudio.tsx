"use client";

import { useDeferredValue, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  getRfpPromptStageViews,
  type RfpPromptStageId,
} from "@/lib/rfp-prompt-builder";
import {
  createRfpPreviewInput,
  renderRfpProposal,
  type RfpPreviewVariant,
  type RfpRenderInput,
} from "@/lib/rfp-proposal-renderer";

interface RfpPreviewStudioProps {
  initialInput: RfpRenderInput;
}

const variants: Array<{
  id: RfpPreviewVariant;
  label: string;
  description: string;
}> = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Default sample with realistic paragraph lengths.",
  },
  {
    id: "dense",
    label: "Dense",
    description: "Stress test for long copy and tighter vertical fit.",
  },
  {
    id: "sparse",
    label: "Sparse",
    description: "Shows how the layout behaves with lighter content.",
  },
];

function toJson(value: RfpRenderInput) {
  return JSON.stringify(value, null, 2);
}

export function RfpPreviewStudio({ initialInput }: RfpPreviewStudioProps) {
  const [selectedVariant, setSelectedVariant] =
    useState<RfpPreviewVariant>("balanced");
  const [selectedPromptStage, setSelectedPromptStage] =
    useState<RfpPromptStageId>("proposal");
  const [editorValue, setEditorValue] = useState(toJson(initialInput));
  const [copyMessage, setCopyMessage] = useState("");
  const [promptCopyMessage, setPromptCopyMessage] = useState("");
  const [pdfMessage, setPdfMessage] = useState("");
  const [pdfError, setPdfError] = useState("");
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const deferredEditorValue = useDeferredValue(editorValue);

  const parsedState = useMemo(() => {
    try {
      const parsed = JSON.parse(deferredEditorValue) as RfpRenderInput;
      return { parsed, error: "" };
    } catch (error) {
      return {
        parsed: null,
        error: error instanceof Error ? error.message : "Invalid JSON payload.",
      };
    }
  }, [deferredEditorValue]);

  const rendered = useMemo(() => {
    if (!parsedState.parsed) return null;
    return renderRfpProposal(parsedState.parsed);
  }, [parsedState.parsed]);

  const promptStages = useMemo(() => {
    if (!parsedState.parsed) return [];
    return getRfpPromptStageViews(parsedState.parsed);
  }, [parsedState.parsed]);

  const activePromptStage =
    promptStages.find((stage) => stage.id === selectedPromptStage) ||
    promptStages[0] ||
    null;

  const handleVariant = (variant: RfpPreviewVariant) => {
    const nextPayload = createRfpPreviewInput(variant);
    setSelectedVariant(variant);
    setEditorValue(toJson(nextPayload));
    setCopyMessage("");
    setPromptCopyMessage("");
    setPdfMessage("");
    setPdfError("");
  };

  const handleFormat = () => {
    if (!parsedState.parsed) return;
    setEditorValue(toJson(parsedState.parsed));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopyMessage("JSON copied.");
      setPromptCopyMessage("");
      setPdfMessage("");
    } catch (error) {
      console.error("[RFP Preview] Copy failed", error);
      setCopyMessage("Unable to copy JSON.");
    }
  };

  const handleCopyPrompt = async () => {
    if (!activePromptStage) return;

    const parts = [
      `Stage: ${activePromptStage.label}`,
      activePromptStage.instructions
        ? `Model instructions:\n${activePromptStage.instructions}`
        : "",
      `${
        activePromptStage.id === "secondPass" ? "Generated notes" : "User prompt"
      }:\n${activePromptStage.prompt}`,
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(parts.join("\n\n"));
      setPromptCopyMessage(`${activePromptStage.label} copied.`);
      setCopyMessage("");
    } catch (error) {
      console.error("[RFP Preview] Prompt copy failed", error);
      setPromptCopyMessage("Unable to copy prompt.");
    }
  };

  const handleDownloadHtml = () => {
    if (!rendered) return;

    const blob = new Blob([rendered.proposalHtml], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = rendered.downloadFileName.replace(/\.pdf$/i, ".html");
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    if (!parsedState.parsed || isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    setPdfMessage("");
    setPdfError("");

    try {
      const response = await fetch("/api/rfp/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedState.parsed),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        let message = "Unable to generate the preview PDF.";

        if (contentType.includes("application/json")) {
          const payload = (await response.json().catch(() => null)) as
            | {
                error?: string;
                message?: string;
              }
            | null;
          message = payload?.error || payload?.message || message;
        } else {
          const text = (await response.text().catch(() => "")).trim();
          if (text) message = text.slice(0, 240);
        }

        throw new Error(message);
      }

      const blob = await response.blob();
      const header = response.headers.get("content-disposition") || "";
      const fileNameMatch = header.match(/filename="?([^"]+)"?/i);
      const fileName =
        fileNameMatch?.[1] || rendered?.downloadFileName || "senna-rfp-response.pdf";
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      URL.revokeObjectURL(url);
      setPdfMessage(`Downloaded ${fileName}.`);
    } catch (error) {
      console.error("[RFP Preview] PDF download failed", error);
      setPdfError(
        error instanceof Error
          ? error.message
          : "Unable to generate the preview PDF.",
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <Stack spacing={3.5}>
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
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
          >
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                <Chip
                  label="Preview Studio"
                  sx={{
                    bgcolor: "rgba(143, 0, 107, 0.08)",
                    color: "var(--color-accent)",
                    fontWeight: 700,
                  }}
                />
                <Chip
                  label="Shared with workflow"
                  variant="outlined"
                  sx={{
                    borderColor: "var(--color-border-soft)",
                    color: "var(--color-text-secondary)",
                  }}
                />
              </Stack>
              <Typography variant="h3" sx={{ mb: 1 }}>
                RFP proposal layout preview
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "var(--color-text-secondary)", maxWidth: 760 }}
              >
                This preview uses the same renderer the n8n proposal workflow
                now calls through <code>/api/rfp/render</code>. Style or layout
                changes here apply to workflow-generated PDFs as well.
              </Typography>
            </Box>
            <Button
              href="/portal"
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              sx={{ borderRadius: "999px", alignSelf: "flex-start" }}
            >
              Back to portal
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {variants.map((variant) => (
              <Button
                key={variant.id}
                variant={selectedVariant === variant.id ? "contained" : "outlined"}
                onClick={() => handleVariant(variant.id)}
                sx={{ borderRadius: "999px" }}
              >
                {variant.label}
              </Button>
            ))}
          </Stack>

          <Typography variant="body2" sx={{ color: "var(--color-text-muted)" }}>
            {variants.find((variant) => variant.id === selectedVariant)
              ?.description || ""}
          </Typography>
        </Stack>
      </Paper>

      <Stack
        direction={{ xs: "column", xl: "row" }}
        spacing={2.5}
        alignItems="stretch"
      >
        <Paper
          elevation={0}
          sx={{
            flex: { xl: "0 0 420px" },
            width: { xl: 420 },
            p: 3,
            borderRadius: "24px",
            border: "1px solid var(--color-border-soft)",
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 18px 54px rgba(24, 25, 37, 0.06)",
          }}
        >
          <Stack spacing={2}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Render input
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-secondary)" }}
                >
                  Edit the payload directly to pressure-test spacing, overflow,
                  content density, and the prompt chain.
                </Typography>
              </Box>
            </Stack>

            {parsedState.error ? (
              <Alert severity="error">{parsedState.error}</Alert>
            ) : (
              <Alert severity="info">
                Parsed successfully. Preview updates from the shared renderer
                plus the centralized prompt definitions that drive the draft
                flow.
              </Alert>
            )}

            {rendered?.previewWarnings.length ? (
              <Alert severity="warning">
                {rendered.previewWarnings.join(" ")}
              </Alert>
            ) : null}

            {rendered && rendered.renderMode === "final" && !rendered.readiness.readyForFinal ? (
              <Alert severity="error">
                {rendered.readiness.blockingIssues
                  .map((issue) => issue.message)
                  .filter(Boolean)
                  .join(" ")}
              </Alert>
            ) : null}

            {copyMessage ? <Alert severity="success">{copyMessage}</Alert> : null}
            {promptCopyMessage ? (
              <Alert severity="success">{promptCopyMessage}</Alert>
            ) : null}
            {pdfMessage ? <Alert severity="success">{pdfMessage}</Alert> : null}
            {pdfError ? <Alert severity="error">{pdfError}</Alert> : null}

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={handleFormat}
                disabled={!parsedState.parsed}
                sx={{ borderRadius: "999px" }}
              >
                Format JSON
              </Button>
              <Button
                variant="outlined"
                startIcon={<ContentCopyIcon />}
                onClick={() => void handleCopy()}
                sx={{ borderRadius: "999px" }}
              >
                Copy JSON
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => void handleDownloadPdf()}
                disabled={!parsedState.parsed || isDownloadingPdf}
                sx={{ borderRadius: "999px" }}
              >
                {isDownloadingPdf ? "Generating PDF..." : "Download PDF"}
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadHtml}
                disabled={!rendered}
                sx={{ borderRadius: "999px" }}
              >
                Download HTML
              </Button>
            </Stack>

            <TextField
              value={editorValue}
              onChange={(event) => {
                setEditorValue(event.target.value);
                setCopyMessage("");
                setPromptCopyMessage("");
              }}
              multiline
              minRows={30}
              maxRows={30}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: 12.5,
                  lineHeight: 1.5,
                },
              }}
            />
          </Stack>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 0,
            p: 2,
            borderRadius: "24px",
            border: "1px solid var(--color-border-soft)",
            background: "rgba(255,255,255,0.96)",
            boxShadow: "0 18px 54px rgba(24, 25, 37, 0.06)",
          }}
        >
          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Box>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  Live preview
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-secondary)" }}
                >
                  Letter-sized pages rendered in-browser from the current JSON
                  payload.
                </Typography>
              </Box>
              {rendered ? (
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-muted)" }}
                >
                  Output file: {rendered.downloadFileName} · Mode:{" "}
                  {rendered.renderMode} · Source:{" "}
                  {rendered.normalized.commercialSourceLabel}
                </Typography>
              ) : null}
            </Stack>

            {rendered ? (
              <Box
                sx={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border-soft)",
                  bgcolor: "#f4f1f5",
                }}
              >
                <iframe
                  title="RFP proposal preview"
                  srcDoc={rendered.proposalHtml}
                  style={{
                    width: "100%",
                    height: "82vh",
                    border: "0",
                    background: "#f4f1f5",
                  }}
                />
              </Box>
            ) : (
              <Alert severity="warning">
                Fix the JSON input to render the preview.
              </Alert>
            )}
          </Stack>
        </Paper>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 3.5 },
          borderRadius: "24px",
          border: "1px solid var(--color-border-soft)",
          background: "rgba(255,255,255,0.96)",
        }}
      >
        <Stack spacing={2.5}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={1.5}
          >
            <Box>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                Prompt inspector
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--color-text-secondary)", maxWidth: 860 }}
              >
                These are the resolved prompts generated from the current JSON
                payload. The shared source lives in{" "}
                <code>src/lib/rfp-prompt-builder.ts</code> and the live n8n
                draft and redraft stages pull from{" "}
                <code>/api/rfp/prompts/*</code>. Intake and review prompts are
                mirrored here from the same file so they are easy to inspect
                and tune.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<ContentCopyIcon />}
              onClick={() => void handleCopyPrompt()}
              disabled={!activePromptStage}
              sx={{ borderRadius: "999px", alignSelf: "flex-start" }}
            >
              Copy stage
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {promptStages.map((stage) => (
              <Button
                key={stage.id}
                variant={
                  selectedPromptStage === stage.id ? "contained" : "outlined"
                }
                onClick={() => setSelectedPromptStage(stage.id)}
                sx={{ borderRadius: "999px" }}
              >
                {stage.label}
              </Button>
            ))}
          </Stack>

          {activePromptStage ? (
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {activePromptStage.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-secondary)" }}
                >
                  {activePromptStage.description}
                </Typography>
              </Box>

              {activePromptStage.instructions ? (
                <TextField
                  label="Model instructions"
                  value={activePromptStage.instructions}
                  multiline
                  minRows={3}
                  fullWidth
                  InputProps={{ readOnly: true }}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontFamily:
                        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: 12.5,
                      lineHeight: 1.55,
                    },
                  }}
                />
              ) : null}

              <TextField
                label={
                  activePromptStage.id === "secondPass"
                    ? "Generated notes"
                    : "User prompt"
                }
                value={activePromptStage.prompt}
                multiline
                minRows={activePromptStage.id === "proposal" ? 18 : 12}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    fontSize: 12.5,
                    lineHeight: 1.55,
                  },
                }}
              />
            </Stack>
          ) : (
            <Alert severity="warning">
              Fix the JSON input to inspect the prompt chain.
            </Alert>
          )}
        </Stack>
      </Paper>
    </Stack>
  );
}
