import MuiProviders from "@/components/app/MuiProviders";
import ChatWidget from "@/components/ChatWidget";

export default function ChatWidgetShell() {
  return (
    <MuiProviders includeCssBaseline={false}>
      <ChatWidget />
    </MuiProviders>
  );
}
