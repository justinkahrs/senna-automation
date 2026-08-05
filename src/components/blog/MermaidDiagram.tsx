"use client";

import { useEffect, useId, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { BG_BASE, WARM_BLACK, BORDER_MED, ACCENT, BG_PAPER, BG_SUBTLE } from "@/components/theme/colors";

interface MermaidDiagramProps {
  chart: string;
  sx?: SxProps<Theme>;
}

function extractWorkflowLabels(chart: string) {
  return [...chart.matchAll(
    /\b[A-Za-z][\w-]*\s*(?:\["([^"]+)"\]|\[([^\]]+)\]|\{"([^"]+)"\}|\{([^}]+)\})/g,
  )]
    .map((match) => match.slice(1).find(Boolean)?.trim())
    .filter((label): label is string => Boolean(label));
}

function WorkflowFallback({ chart, loading }: { chart: string; loading?: boolean }) {
  const labels = extractWorkflowLabels(chart);
  return (
    <Stack spacing={2.25} sx={{ width: "100%", py: 1 }}>
      {loading ? (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <CircularProgress size={18} />
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Building workflow diagram…
          </Typography>
        </Stack>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          The visual diagram could not load. The workflow stages are preserved below.
        </Typography>
      )}
      {labels.length ? (
        <Box component="ol" sx={{ m: 0, pl: 3, "& li": { mb: 1 } }}>
          {labels.map((label) => (
            <Typography component="li" variant="body2" key={label}>
              {label}
            </Typography>
          ))}
        </Box>
      ) : null}
    </Stack>
  );
}

export function MermaidDiagram({ chart, sx }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const safeChart = chart.replace(/<br\s*\/?>/gi, " ");
        if (
          safeChart.length > 12_000 ||
          !/^\s*(?:flowchart|graph)\s+(?:TB|TD|BT|RL|LR)\b/i.test(safeChart) ||
          /%%\{|\bclick\b|<\/?[a-z][^>]*>|javascript\s*:|\bon[a-z]+\s*=/i.test(safeChart)
        ) {
          throw new Error("Unsafe or unsupported Mermaid workflow syntax.");
        }

        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "strict",
          suppressErrorRendering: true,
          themeVariables: {
            primaryColor: BG_BASE,
            primaryTextColor: WARM_BLACK,
            primaryBorderColor: BORDER_MED,
            lineColor: ACCENT,
            secondaryColor: BG_PAPER,
            tertiaryColor: BG_SUBTLE,
            fontFamily:
              '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif',
            fontSize: "16px",
          },
          flowchart: {
            curve: "basis",
            htmlLabels: false,
            useMaxWidth: true,
            nodeSpacing: 36,
            rankSpacing: 54,
            padding: 24,
          },
        });

        await mermaid.parse(safeChart, { suppressErrors: false });
        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          safeChart
        );

        const parsed = new DOMParser().parseFromString(
          renderedSvg,
          "image/svg+xml",
        );
        for (const element of parsed.querySelectorAll("script")) {
          element.remove();
        }
        for (const element of parsed.querySelectorAll("*")) {
          for (const attribute of [...element.attributes]) {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim().toLowerCase();
            if (
              name.startsWith("on") ||
              ((name === "href" || name.endsWith(":href")) &&
                value &&
                !value.startsWith("#"))
            ) {
              element.removeAttribute(attribute.name);
            }
          }
        }
        const safeSvg = new XMLSerializer().serializeToString(
          parsed.documentElement,
        );
        const renderedLabels = parsed.querySelectorAll(".nodeLabel");
        if (!renderedLabels.length || [...renderedLabels].every((node) => !node.textContent?.trim())) {
          throw new Error("Mermaid rendered without visible workflow labels.");
        }

        if (!cancelled) {
          setSvg(safeSvg);
          setError(false);
        }
      } catch (renderError) {
        console.error("Failed to render Mermaid diagram", renderError);
        if (!cancelled) {
          setError(true);
        }
      }
    };

    renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <Box
        sx={{
          my: 8,
          px: 3,
          py: 2.5,
          borderRadius: 3,
          bgcolor: "rgba(143,0,107,0.06)",
          ...sx,
        }}
      >
        <WorkflowFallback chart={chart} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        my: 8,
        px: { xs: 2.5, md: 4 },
        pt: { xs: 3, md: 5 },
        pb: { xs: 7, md: 5 },
        borderRadius: 3,
        bgcolor: "rgba(143,0,107,0.04)",
        border: "1px solid",
        borderColor: "divider",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        maxWidth: "1120px",
        mx: "auto",
        width: "100%",
        "& p": {
          mb: "0 !important",
          lineHeight: "1.35 !important",
        },
        "& svg": {
          overflow: "visible",
          maxWidth: "100%",
        },
        "& svg .nodeLabel, & svg .edgeLabel": {
          fontFamily:
            '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif !important',
          color: "#181925 !important",
        },
        "& svg .nodeLabel p, & svg .edgeLabel p": {
          margin: "0 !important",
          padding: "0 !important",
          lineHeight: "1.35 !important",
        },
        "& svg .nodeLabel div, & svg .edgeLabel div": {
          margin: "0 !important",
          padding: "0 !important",
          lineHeight: "1.35 !important",
        },
        "& svg foreignObject": {
          overflow: "visible",
        },
        ...sx,
      }}
    >
      {svg ? <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          minWidth: 0,
          display: "flex",
          justifyContent: "center",
          "& svg": {
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "block",
          },
        }}
        aria-label="Workflow diagram"
        dangerouslySetInnerHTML={{ __html: svg }}
      /> : <WorkflowFallback chart={chart} loading />}
    </Box>
  );
}
