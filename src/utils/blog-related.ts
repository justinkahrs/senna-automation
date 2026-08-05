import type { BlogPostBase, BlogPostPreview } from "@/types/blog";

const BUYER_STAGE_ORDER = [
  "problem-aware",
  "solution-aware",
  "vendor-selection",
];

function normalized(value?: string) {
  return value?.trim().toLowerCase() || "";
}

function relatedSignals(
  current: BlogPostBase,
  candidate: BlogPostPreview,
) {
  const currentStage = BUYER_STAGE_ORDER.indexOf(normalized(current.buyerStage));
  const candidateStage = BUYER_STAGE_ORDER.indexOf(normalized(candidate.buyerStage));
  return {
    icp:
      normalized(current.icp) !== "" &&
      normalized(current.icp) === normalized(candidate.icp)
        ? 1
        : 0,
    problem:
      normalized(current.problem) !== "" &&
      normalized(current.problem) === normalized(candidate.problem)
        ? 1
        : 0,
    workflow:
      normalized(current.workflow) !== "" &&
      normalized(current.workflow) === normalized(candidate.workflow)
        ? 1
        : 0,
    stage:
      currentStage >= 0 && candidateStage === currentStage + 1
        ? 2
        : currentStage >= 0 && candidateStage === currentStage
          ? 1
          : 0,
  };
}

export function scoreRelatedBlogPost(
  current: BlogPostBase,
  candidate: BlogPostPreview,
) {
  const signals = relatedSignals(current, candidate);
  return (
    signals.icp * 1_000_000 +
    signals.problem * 10_000 +
    signals.workflow * 100 +
    signals.stage
  );
}

export function rankRelatedBlogPosts(
  current: BlogPostBase,
  candidates: BlogPostPreview[],
) {
  return candidates
    .filter((candidate) => candidate.slug !== current.slug)
    .map((candidate) => ({
      candidate,
      signals: relatedSignals(current, candidate),
      publishedAt: new Date(candidate.date).getTime() || 0,
    }))
    .sort(
      (left, right) =>
        right.signals.icp - left.signals.icp ||
        right.signals.problem - left.signals.problem ||
        right.signals.workflow - left.signals.workflow ||
        right.signals.stage - left.signals.stage ||
        right.publishedAt - left.publishedAt,
    )
    .map(({ candidate }) => candidate);
}
