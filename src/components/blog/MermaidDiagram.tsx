"use client";

import { useEffect, useId, useState } from "react";
import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";
import { BG_BASE, WARM_BLACK, BORDER_MED, ACCENT, BG_PAPER, BG_SUBTLE } from "@/components/theme/colors";

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: Record<string, unknown>) => void;
      render: (
        id: string,
        chart: string
      ) => Promise<{ svg: string }>;
    };
  }
}

interface MermaidDiagramProps {
  chart: string;
  sx?: SxProps<Theme>;
}

export function MermaidDiagram({ chart, sx }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      const mermaid = window.mermaid;

      if (!mermaid) {
        window.setTimeout(renderDiagram, 100);
        return;
      }

      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: BG_BASE,
            primaryTextColor: WARM_BLACK,
            primaryBorderColor: BORDER_MED,
            lineColor: ACCENT,
            secondaryColor: BG_PAPER,
            tertiaryColor: BG_SUBTLE,
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
          },
          flowchart: {
            curve: "basis",
            htmlLabels: true,
            useMaxWidth: true,
            nodeSpacing: 36,
            rankSpacing: 54,
            padding: 24,
          },
        });

        const { svg: renderedSvg } = await mermaid.render(
          `mermaid-${id}`,
          chart
        );

        if (!cancelled) {
          setSvg(renderedSvg);
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
          bgcolor: "rgba(45,107,94,0.06)",
          ...sx,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Diagram unavailable.
        </Typography>
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
        bgcolor: "rgba(45,107,94,0.04)",
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
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
          fontFamily: "Inter, sans-serif !important",
          color: "#1C1917 !important",
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
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          "& svg": {
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            display: "block",
          },
        }}
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
      <Box
        component="img"
        src="/senna.svg"
        alt="Senna Automation watermark"
        sx={{
          position: "absolute",
          right: { xs: 16, md: 20 },
          bottom: { xs: 14, md: 18 },
          width: { xs: 100, md: 148 },
          height: "auto",
          opacity: 0.12,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
          filter: `grayscale(1) contrast(0.9) brightness(0.6)`,
          backgroundColor: alpha("#FFFFFF", 0),
        }}
      />
    </Box>
  );
}
