import { Resvg } from "@resvg/resvg-js";
import satori, { type SatoriOptions } from "satori";
import type { ReactNode } from "react";

export async function renderOgResponse(
  element: ReactNode,
  options: SatoriOptions,
) {
  const svg = await satori(element, options);
  const png = new Resvg(svg, {
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
}
