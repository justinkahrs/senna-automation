import interBold from "./fonts/inter-bold.ttf?inline";
import interSemibold from "./fonts/inter-semibold.ttf?inline";

function fontBytes(asset: string) {
  return Uint8Array.from(atob(asset.slice(asset.indexOf(",") + 1)), (character) => character.charCodeAt(0)).buffer;
}

export const interFonts = [
  { name: "Inter", data: fontBytes(interSemibold), weight: 600 as const, style: "normal" as const },
  { name: "Inter", data: fontBytes(interBold), weight: 800 as const, style: "normal" as const },
];
