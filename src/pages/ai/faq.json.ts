import type { APIRoute } from "astro";
import { formatAiFaqAnswer, homeFaqEntries } from "@/utils/ai-discovery";

export const prerender = true;

export const GET: APIRoute = () => {
  const body = {
    faqs: homeFaqEntries.map((entry) => ({
      question: entry.question,
      answer: formatAiFaqAnswer(entry),
    })),
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};
