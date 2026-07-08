"use client";

import AnalyticsProvider from "@/components/AnalyticsProvider";
import ChatWidget from "@/components/ChatWidget";
import PrivacyNoticeBanner from "@/components/PrivacyNoticeBanner";
import MuiProviders from "@/components/app/MuiProviders";

export default function PersistentWidgets() {
  return (
    <MuiProviders>
      <PrivacyNoticeBanner />
      <ChatWidget />
      <AnalyticsProvider />
    </MuiProviders>
  );
}
