import type { Metadata } from "next";
import { SITE_URL } from "@/utils/site";

export const metadata: Metadata = {
  title: "Solutions | Senna Automation",
  description:
    "See how Senna Automation helps businesses automate administrative work, lead generation, and sales workflows to save time, reduce manual work, and increase revenue.",
  alternates: {
    canonical: `${SITE_URL}/solutions`,
  },
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
