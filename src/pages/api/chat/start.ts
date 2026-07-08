import type { APIRoute } from "astro";
import { POST as postHandler } from "@/app/api/chat/start/route";

export const prerender = false;
export const POST: APIRoute = ({ request }) => postHandler(request);
