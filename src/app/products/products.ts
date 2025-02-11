import RssFeedIcon from "@mui/icons-material/RssFeed";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";
import EditNoteIcon from "@mui/icons-material/EditNote";
import type { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    title: "Customer Support",
    icon: SupportAgentIcon,
    description: "Automate your customer service with AI-powered solutions.",
    features: [
      "Seamless knowledge base integration for instant responses",
      "AI-driven issue resolution with contextual understanding",
      "Smart escalation system",
      "Omnichannel support including chat, email, social media, sms, and voice",
    ],
    media: {
      src: "/customer-support.jpg",
      alt: "Customer support automation",
      type: "image",
    },
  },
  {
    title: "Executive Assistant",
    icon: AssistantIcon,
    description:
      "Take control of your productivity with a virtual personal assistant.",
    features: [
      "Automated email organization with priority tagging",
      "Smart meeting scheduling with calendar synchronization",
      "AI-powered chatbot for instant task delegation",
      "Daily briefing reports to keep you updated",
    ],
    media: {
      src: "/executive-assistant.jpg",
      alt: "Executive assistant",
      type: "image",
    },
  },
  {
    title: "Content Generation",
    icon: RssFeedIcon,
    description:
      "Automate and elevate your content creation process using RSS feeds, newsletters, social platforms, and more.",
    features: [
      "Generate high-quality blogs automatically from RSS feeds",
      "Create curated newsletters with a personalized touch",
      "Optimize content to reflect your unique brand voice",
      "Integrate trending topics and keywords for SEO-friendly content",
    ],
    media: {
      src: "/content-generation.jpg",
      alt: "Social media icons",
      type: "gif",
    },
  },
  {
    title: "Onboarding",
    icon: PersonIcon,
    description:
      "Streamline customer onboarding with automated workflows and personalized experiences.",
    features: [
      "Automatically generate and send welcome packages",
      "Schedule onboarding meetings and add calendar events automatically",
      "Send personalized welcome messages tailored to each customer",
      "Automated follow-up reminders to ensure smooth onboarding",
    ],
    media: {
      src: "/onboarding.jpg",
      alt: "Onboarding automation",
      type: "image",
    },
  },
  {
    title: "Proposal Automation",
    icon: EditNoteIcon,
    description:
      "Transform client interactions into actionable, customized project proposals effortlessly.",
    features: [
      "Automate the creation of detailed, itemized project proposals",
      "Tailor proposals to client needs from meeting transcripts",
      "Include verbally agreed-upon pricing from introductory calls",
      "Generate professional, branded documents ready for client approval",
    ],
    media: {
      src: "/proposal.jpg",
      alt: "Proposal automation",
      type: "image",
    },
  },
  {
    title: "Social Media",
    icon: CampaignIcon,
    description:
      "Boost your social media presence with intelligent automation.",
    features: [
      "Fully automated multi-platform social media campaign management",
      "AI-driven smart audience targeting",
      "AI-driven content beyond just text",
      "Automated engagement for creating new leads",
    ],
    media: {
      src: "/social-media.jpg",
      alt: "Social media campaigns",
      type: "image",
    },
  },
  {
    title: "Cold Email & Lead Generation",
    icon: EmailIcon,
    description:
      "Streamline your lead generation and outreach with our smart tools.",
    features: [
      "Automated lead discovery via Google Maps, LinkedIn, and more",
      "AI-powered hyper personalization for better engagement",
      "Advanced lead scoring and automated qualification processes",
      "CRM integration for seamless lead tracking",
    ],
    media: {
      src: "/email.jpg",
      alt: "Cold email and leads",
      type: "image",
    },
  },
  {
    title: "Invoice Processing",
    icon: DescriptionIcon,
    description: "Simplify invoice management with smart automation.",
    features: [
      "Generate accurate proposals directly from meeting transcripts",
      "Automated and fully customizable invoice generation",
      "Smart payment tracking with automated reminders",
      "Integration with accounting software for streamlined processes",
    ],
    media: {
      src: "/invoice.jpg",
      alt: "Invoice processing",
      type: "image",
    },
  },
];
