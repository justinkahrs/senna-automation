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
