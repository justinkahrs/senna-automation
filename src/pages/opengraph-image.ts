import type { APIRoute } from "astro";
import image from "@/app/opengraph-image";

export const GET: APIRoute = () => image();
