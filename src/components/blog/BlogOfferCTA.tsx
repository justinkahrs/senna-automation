"use client";

import { Box, Stack, Typography } from "@mui/material";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import type { BlogPost } from "@/types/blog";

interface BlogOfferCTAProps {
  post: BlogPost;
  placement: "article-inline" | "article-final";
}

export default function BlogOfferCTA({
  post,
  placement,
}: BlogOfferCTAProps) {
  const workflowName = post.workflow?.trim() || "workflow";
  const assetId = `blog:${post.contentId || post.slug}`;

  return (
    <Box
      component="aside"
      aria-label="Workflow Bottleneck Review"
      sx={{
        my: { xs: 7, md: 10 },
        p: { xs: 3, sm: 4, md: 5 },
        borderTop: "1px solid var(--color-border-accent)",
        borderBottom: "1px solid var(--color-border-neutral-light)",
        bgcolor: "var(--color-bg-accent-subtle)",
        position: "relative",
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "var(--space-12)", md: "var(--space-20)" },
          height: "100%",
          bgcolor: "var(--color-bg-highlight-faint)",
          clipPath: "polygon(72% 0, 100% 0, 100% 100%, 0 100%)",
          pointerEvents: "none",
        },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 6 }}
        sx={{ alignItems: { xs: "flex-start", md: "center" }, position: "relative" }}
      >
        <Box sx={{ flex: 1, maxWidth: "38rem" }}>
          <Typography
            variant="overline"
            sx={{ color: "var(--color-text-accent)", letterSpacing: "0.12em" }}
          >
            A useful next step
          </Typography>
          <Typography variant="h4" component="h2" sx={{ mt: 1, mb: 1.5 }}>
            Put this {workflowName} under a microscope
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 0 }}>
            Bring one costly handoff to a 30-minute Workflow Bottleneck Review.
            We&apos;ll map what happens today, estimate the operational impact,
            and identify a practical next step together.
          </Typography>
        </Box>
        <Stack spacing={1.25} sx={{ alignItems: { xs: "flex-start", md: "flex-end" } }}>
          <ScheduleCallButton
            text="Book the 30-Minute Review"
            size="large"
            showIcon={false}
            contentId={post.contentId}
            assetId={assetId}
            offerId={post.offer || "workflow-bottleneck-review"}
            placement={placement}
          />
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            One workflow. No sales presentation.
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
