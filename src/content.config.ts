import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    date: z.string(),
    category: z.string(),
    excerpt: z.string(),
    image: z.string(),
    contentId: z.string().min(1).optional(),
    contentType: z.string().min(1).optional(),
    icp: z.string().min(1).optional(),
    cohorts: z.array(z.string().min(1)).optional(),
    buyerStage: z.string().min(1).optional(),
    problem: z.string().min(1).optional(),
    workflow: z.string().min(1).optional(),
    offer: z.string().min(1).optional(),
    researchPacketId: z.string().min(1).optional(),
    researchCheckedAt: z.string().min(1).optional(),
    qaScore: z.number().min(0).max(100).optional(),
    qaReportHash: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    promptVersion: z.string().min(1).optional(),
    researchHash: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    opportunityFingerprint: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    topicFingerprint: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    metadata: z.object({
      client: z.string(),
      company: z.string(),
      companyUrl: z.string(),
      year: z.string(),
      role: z.string(),
      tools: z.string(),
    }),
  }),
});

export const collections = { blog };
