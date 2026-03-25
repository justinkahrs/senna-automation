import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | Senna Automation",
  description:
    "See how Senna Automation helps businesses automate administrative work, lead generation, and sales workflows to save time, reduce manual work, and increase revenue.",
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
