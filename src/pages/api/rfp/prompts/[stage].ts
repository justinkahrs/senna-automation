import type { APIRoute } from "astro";
import { POST as postHandler } from "@/app/api/rfp/prompts/[stage]/route";

export const prerender = false;
export const POST: APIRoute = ({ request, params }) =>
  postHandler(request, {
    params: Promise.resolve({
      stage: params.stage || "",
    }),
  });
