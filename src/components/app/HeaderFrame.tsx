import MuiProviders from "@/components/app/MuiProviders";
import { AppBar, type HeaderMode, type HeaderSurface } from "@/components/layout/AppBar";
import { PathnameProvider } from "@/compat/next/navigation";

export default function HeaderFrame({ pathname, heroSurface, headerMode }: {
  pathname: string;
  heroSurface: HeaderSurface;
  headerMode?: HeaderMode;
}) {
  return (
    <MuiProviders>
      <PathnameProvider pathname={pathname}>
        <AppBar heroSurface={heroSurface} headerMode={headerMode} />
      </PathnameProvider>
    </MuiProviders>
  );
}
