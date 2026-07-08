import type { APIRoute } from "astro";
import { GET as getHandler } from "@/site/feeds/atom";

export const GET: APIRoute = () => getHandler();
