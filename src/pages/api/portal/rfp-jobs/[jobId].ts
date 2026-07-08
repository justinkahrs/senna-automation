import type { APIRoute } from "astro";
import { GET as getHandler } from "@/server/routes/portal/rfp-jobs/job";

export const prerender = false;
export const GET: APIRoute = ({ request, params }) =>
  getHandler(request, {
    params: Promise.resolve({
      jobId: params.jobId || "",
    }),
  });
