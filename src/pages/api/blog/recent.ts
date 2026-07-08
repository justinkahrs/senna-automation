import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/api/blog/recent/route";

export const prerender = false;
export const GET: APIRoute = () => getHandler();
