import ContactForm from "@/components/forms/ContactForm";
import type { RouteMetadata } from "@/utils/metadata";

export const metadata: RouteMetadata = {
  title: "Get Your Free Automation Audit | Senna Automation",
  description:
    "Tell us what's taking too long. We'll walk through your workflows and show you exactly where automation can save time. Free call, no commitment required.",
  alternates: {
    canonical: "https://www.senna-automation.com/contact",
  },
};

export default function Contact() {
  return <ContactForm />;
}
