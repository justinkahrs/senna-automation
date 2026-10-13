export type HeaderSurface = "light" | "dark";
export type HeaderMode = "solid" | "hero-overlay";

// Transparency is a page opt-in, independent of hero contrast.
export function getHeaderAppearance({
  heroSurface,
  headerMode = "solid",
  scrolled,
  menuOpen,
}: {
  heroSurface: HeaderSurface;
  headerMode?: HeaderMode;
  scrolled: boolean;
  menuOpen: boolean;
}) {
  const isOverlay = headerMode === "hero-overlay" && !scrolled && !menuOpen;
  return { isOverlay, isDarkHeader: isOverlay && heroSurface === "dark" };
}
