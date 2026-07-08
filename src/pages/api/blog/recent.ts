import type { APIRoute } from "astro";
import { GET as getHandler } from "@/server/routes/blog/recent";

export const prerender = false;
export const GET: APIRoute = () => getHandler();
