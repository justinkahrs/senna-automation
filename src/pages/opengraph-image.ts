import type { APIRoute } from "astro";
import image from "@/site/og/site";

export const GET: APIRoute = () => image();
