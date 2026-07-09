import MuiProviders from "@/components/app/MuiProviders";
import PrivacyNoticeBanner from "@/components/PrivacyNoticeBanner";

export default function PrivacyNoticeShell() {
  return (
    <MuiProviders includeCssBaseline={false}>
      <PrivacyNoticeBanner />
    </MuiProviders>
  );
}
