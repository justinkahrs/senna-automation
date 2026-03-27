import { Box, Grid, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface NumberedStep {
  number?: string;
  title: string;
  description: string;
}

interface NumberedStepsProps {
  steps: NumberedStep[];
  sx?: SxProps<Theme>;
  layout?: "grid" | "stack";
}

function formatStepNumber(step: NumberedStep, index: number) {
  if (step.number) return step.number;
  return String(index + 1).padStart(2, "0");
}

export function parseNumberedSteps(input: string): NumberedStep[] {
  if (input.includes("\n---\n")) {
    return input
      .split(/\n---\n/g)
      .map((chunk) => chunk.trim())
      .filter(Boolean)
      .map((chunk, index) => {
        const [header = "", ...descriptionLines] = chunk.split("\n");
        const [numberPart, ...titleParts] = header.split("|").map((part) => part.trim());

        return {
          number: numberPart || String(index + 1).padStart(2, "0"),
          title: titleParts.join(" | ") || `Step ${index + 1}`,
          description: descriptionLines.join("\n").trim(),
        };
      });
  }

  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const parts = line.split("|").map((part) => part.trim());

      if (parts.length >= 3) {
        const [number, title, ...descriptionParts] = parts;
        return {
          number,
          title,
          description: descriptionParts.join(" | "),
        };
      }

      if (parts.length === 2) {
        const [title, description] = parts;
        return {
          number: String(index + 1).padStart(2, "0"),
          title,
          description,
        };
      }

      return {
        number: String(index + 1).padStart(2, "0"),
        title: `Step ${index + 1}`,
        description: line,
      };
    });
}

function StepDescription({ description }: { description: string }) {
  return (
    <Box
      sx={{
        color: "text.secondary",
        fontFamily: "Inter, sans-serif",
        "& p": { mb: 2, lineHeight: 1.8 },
        "& p:last-of-type": { mb: 0 },
        "& ul": {
          pl: 3,
          my: 2,
          listStyleType: "disc",
          listStylePosition: "outside",
        },
        "& ol": {
          pl: 3,
          my: 2,
          listStyleType: "decimal",
          listStylePosition: "outside",
        },
        "& li": { mb: 1, display: "list-item" },
        "& li::marker": { color: "text.disabled" },
        "& strong": { color: "text.primary", fontWeight: 700 },
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
    </Box>
  );
}

export function NumberedSteps({
  steps,
  sx,
  layout = "grid",
}: NumberedStepsProps) {
  if (!steps.length) return null;

  if (layout === "stack") {
    return (
      <Box sx={sx}>
        <Stack spacing={5}>
          {steps.map((step, index) => (
            <Box
              key={`${formatStepNumber(step, index)}-${step.title}`}
              sx={{ display: "flex", gap: { xs: 2, md: 3 }, alignItems: "flex-start" }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  color: "text.disabled",
                  fontSize: "3rem",
                  fontFamily: "monospace",
                  lineHeight: 1,
                  minWidth: { xs: 54, md: 68 },
                  flexShrink: 0,
                }}
              >
                {formatStepNumber(step, index)}
              </Typography>
              <Box sx={{ pt: 0.5 }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <StepDescription description={step.description} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={3} key={`${formatStepNumber(step, index)}-${step.title}`}>
            <Box sx={{ textAlign: "center", px: 1 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 600,
                  color: "text.disabled",
                  fontSize: "3rem",
                  fontFamily: "monospace",
                  mb: 1,
                }}
              >
                {formatStepNumber(step, index)}
              </Typography>
              <Typography variant="h5" component="h3" gutterBottom>
                {step.title}
              </Typography>
              <StepDescription description={step.description} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
