import type { Metadata } from "next";
import { SITE_URL } from "@/utils/site";

export const metadata: Metadata = {
  title: "Automation Pricing | Senna Automation",
  description:
    "Explore Senna Automation pricing for custom AI workflow automation, implementation timelines, and fixed-price automation project planning.",
  alternates: {
    canonical: `${SITE_URL}/pricing`,
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
