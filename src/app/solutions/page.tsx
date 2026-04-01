import { getLatestPostByCategory } from "@/utils/blog";
import SolutionsClient from "./SolutionsClient";

const solutions = [
  {
    title: "Automate admin work",
    category: "Admin Automation",
    caseStudyCategory: "Automation Workflow",
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
    title: "Turn scattered information into usable data",
    category: "Data Processing",
    problem:
      "Important information lives in emails, PDFs, notes, messages, and across the tools and sites you rely on, but it never makes it into your systems cleanly. Your team re-enters data, misses details, or works from incomplete information.",
    solution:
      "We capture incoming information from wherever it appears, structure it, and send it into the right systems automatically so it is usable the moment it comes in.",
    outcomes: [
      "No manual data entry across systems",
      "Important details do not get lost or missed",
      "Work starts with complete, structured information",
    ],
  },
  {
    title: "Improve follow-up and sales",
    category: "Sales Automation",
    problem:
      "Sales follow-up depends too much on memory, manual reminders, or inconsistent processes.",
    solution:
      "Build automated follow-up sequences, pipeline triggers, reminders, and simple sales workflows that keep communication moving.",
    outcomes: [
      "More consistent follow-up",
      "Better conversion from active leads",
      "Less time spent chasing next steps",
    ],
  },
  {
    title: "Reduce back-and-forth",
    category: "Communication",
    problem:
      "Too much time is lost to scheduling, reminders, updates, and repeated communication just to keep work on track.",
    solution:
      "Automate scheduling, reminders, confirmations, and routine updates so people stay informed without extra coordination.",
    outcomes: [
      "Less friction across the process",
      "Faster execution",
      "Fewer delays caused by missed communication",
    ],
  },
  {
    title: "Reporting and visibility",
    category: "Operations",
    problem:
      "It is hard to see what is happening, where work is stuck, or how performance is trending without manual reporting.",
    solution:
      "Automate reports, summaries, and dashboards that make activity, pipeline movement, and key numbers easier to track.",
    outcomes: [
      "Clearer visibility into operations",
      "Less manual reporting work",
      "Better decisions with less effort",
    ],
  },
];

export default function SolutionsPage() {
  const enrichedSolutions = solutions.map((solution) => ({
    ...solution,
    latestPost: getLatestPostByCategory(
      solution.caseStudyCategory ?? solution.category
    ),
  }));

  return <SolutionsClient solutions={enrichedSolutions} />;
}
