import MuiProviders from "@/components/app/MuiProviders";
import { AppBar } from "@/components/layout/AppBar";
import { PathnameProvider } from "@/compat/next/navigation";

export default function HeaderFrame({ pathname }: { pathname: string }) {
  return (
    <MuiProviders>
      <PathnameProvider pathname={pathname}>
        <AppBar />
      </PathnameProvider>
    </MuiProviders>
  );
}
