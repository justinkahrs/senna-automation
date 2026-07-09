import MuiProviders from "@/components/app/MuiProviders";
import { Footer } from "@/components/layout/Footer";

export default function FooterFrame({
  pathname,
  currentYear,
}: {
  pathname: string;
  currentYear: number;
}) {
  return (
    <MuiProviders includeCssBaseline={false}>
      <Footer pathname={pathname} currentYear={currentYear} />
    </MuiProviders>
  );
}
