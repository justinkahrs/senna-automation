import MuiProviders from "@/components/app/MuiProviders";
import ChatWidget from "@/components/ChatWidget";

export default function ChatWidgetMount() {
  return (
    <MuiProviders>
      <ChatWidget />
    </MuiProviders>
  );
}
