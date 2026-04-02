import { getLatestPostByCategory } from "@/utils/blog";
import SolutionsClient from "./SolutionsClient";

const solutions = [
  {
    title: "Automate admin work",
    category: "Automation Workflow",
    video: "/admin.webm",
    problem:
      "Your team is spending too much time on repetitive tasks that keep the business running but do not move it forward.",
    solution:
      "Automate data entry, task routing, status updates, internal handoffs, and the small steps that eat up time every day.",
    outcomes: [
      "Save hours each week",
      "Reduce manual errors",
      "Free up time for higher-value work",
    ],
  },
  {
    title: "Capture and qualify leads",
    category: "Lead Management",
    video: "/leads.webm",
    problem:
      "Leads come in, but response times are inconsistent and some opportunities slip through the cracks.",
    solution:
      "Set up automated lead capture, routing, qualification, and follow-up so the right people get the right information quickly.",
    outcomes: [
      "Respond faster",
      "Create more qualified opportunities",
      "Keep leads from going cold",
    ],
  },
  {
    title: "Create structured data from anything",
    category: "Data Processing",
    video: "dashboard.webm",
    problem:
      "Information lives in emails, PDFs, and across the tools and sites you rely on, but it never makes it into your systems cleanly.",
    solution:
      "Structure incoming information, and send it into the right systems automatically.",
    outcomes: [
      "No manual data entry across systems",
      "Important details do not get lost or missed",
      "Work starts with complete, structured information",
    ],
  },
  {
    title: "Your custom algorithm",
    category: "Decision Intelligence",
    video: "/businessFormula.webm",
    problem:
      "Your business runs on experience, instincts, and scattered data, but turning that into consistent, repeatable decisions takes time and breaks down as you grow.",
    solution:
      "Turn your inputs into automated decisions using your own logic, with a custom system that calculates plans and triggers actions in real time.",
    outcomes: [
      "Standardize decisions using your own proven logic",
      "Automatically generate plans, tasks, or next steps from inputs",
      "Operate with a system that scales instead of relying on memory",
    ],
  },
];

export default function SolutionsPage() {
  const enrichedSolutions = solutions.map((solution) => ({
    ...solution,
    latestPost: getLatestPostByCategory(solution.category),
  }));

  return <SolutionsClient solutions={enrichedSolutions} />;
}
