import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/api/portal/rfp-jobs/[jobId]/download/route";

export const prerender = false;
export const GET: APIRoute = ({ request, params }) =>
  getHandler(request, {
    params: Promise.resolve({
      jobId: params.jobId || "",
    }),
  });
