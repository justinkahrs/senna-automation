import type { APIRoute } from "astro";
import { GET as getHandler } from "@/app/feed.json/route";

export const GET: APIRoute = () => getHandler();
