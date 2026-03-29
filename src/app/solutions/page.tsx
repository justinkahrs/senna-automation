import { getLatestPostByCategory } from "@/utils/blog";
import SolutionsClient from "./SolutionsClient";

const solutions = [
  {
    title: "Automate admin work",
    category: "Admin Automation",
    video: "/overview.webm",
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
    title: "Improve follow-up and sales",
    category: "Automation Workflow",
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
    title: "Streamline onboarding",
    category: "Client Onboarding",
    problem:
      "Manual onboarding creates delays, missed steps, and a frustrating experience for both your team and new clients or hires.",
    solution:
      "Use automated onboarding flows, checklists, document requests, notifications, and internal tasks to keep everything moving.",
    outcomes: [
      "Faster ramp-up",
      "Fewer gaps in the process",
      "A smoother experience from day one",
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
    latestPost: getLatestPostByCategory(solution.category),
  }));

  return <SolutionsClient solutions={enrichedSolutions} />;
}
