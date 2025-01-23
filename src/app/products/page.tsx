import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  type SvgIcon,
} from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssistantIcon from "@mui/icons-material/Assistant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleCallButton from "@/components/ScheduleCallButton";

import Image from "next/image";

interface Product {
  title: string;
  icon: typeof SvgIcon;
  description: string;
  features: string[];
  media: {
    src: string;
    alt: string;
    type: "image" | "gif";
  };
}

const products: Product[] = [
  {
    title: "Content Generation",
    icon: RssFeedIcon,
    description:
      "Automate and elevate your content creation process using RSS feeds, newsletters, social platforms, and more.",
    features: [
      "Generate high-quality blogs automatically from RSS feeds",
      "Create curated newsletters with a personalized touch",
      "Customize and optimize content to reflect your unique brand voice",
      "Integrate trending topics and keywords for SEO-friendly content",
    ],
    media: {
      src: "/content-generation.jpg",
      alt: "Social media icons",
      type: "gif",
    },
  },
  {
    title: "Onboarding Automation",
    icon: RssFeedIcon,
    description:
      "Streamline customer onboarding with automated workflows and personalized experiences.",
    features: [
      "Automatically generate and send welcome packages",
      "Schedule onboarding meetings and add calendar events automatically",
      "Send personalized welcome messages tailored to each customer",
      "Automated follow-up reminders to ensure smooth onboarding",
      "Track onboarding progress with detailed reports",
    ],
    media: {
      src: "/onboarding.jpg",
      alt: "Onboarding automation",
      type: "image",
    },
  },
  {
    title: "Proposal Automation",
    icon: RssFeedIcon,
    description:
      "Transform client interactions into actionable, customized project proposals effortlessly.",
    features: [
      "Automate the creation of detailed, itemized project proposals",
      "Tailor proposals to individual client needs based on meeting transcripts",
      "Include verbally agreed-upon pricing from introductory calls",
      "Streamline proposal adjustments with client feedback integration",
      "Generate professional, branded documents ready for client approval",
    ],
    media: {
      src: "/proposal.jpg",
      alt: "Proposal automation",
      type: "image",
    },
  },
  {
    title: "Social Media Management",
    icon: CampaignIcon,
    description:
      "Boost your social media presence with intelligent automation.",
    features: [
      "Fully automated multi-platform campaign management",
      "AI-driven smart audience targeting and retargeting",
      "Real-time performance tracking and optimization",
      "Automated A/B testing for enhanced ROI",
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
      "Automated lead discovery via platforms like Google Maps and LinkedIn",
      "AI-powered email personalization for better engagement",
      "Lead scoring and qualification automation",
      "CRM integration for seamless lead tracking",
    ],
    media: {
      src: "/email.jpg",
      alt: "Cold email and leads",
      type: "image",
    },
  },
  {
    title: "Invoice Processing System",
    icon: DescriptionIcon,
    description: "Simplify invoice management with smart automation.",
    features: [
      "Generate accurate proposals directly from meeting transcripts",
      "Automated and customizable invoice generation",
      "Smart payment tracking with automated reminders",
      "Integration with accounting software for streamlined processes",
    ],
    media: {
      src: "/invoice.jpg",
      alt: "Invoice processing",
      type: "image",
    },
  },
  {
    title: "Customer Support System",
    icon: SupportAgentIcon,
    description: "Revolutionize customer service with AI-powered solutions.",
    features: [
      "Seamless knowledge base integration for instant responses",
      "AI-driven issue resolution with contextual understanding",
      "Smart escalation system with predictive analytics",
      "Omnichannel support including chat, email, and social media",
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
    description: "Empower your productivity with a virtual personal assistant.",
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
];
export default function Products() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Automation Products
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 8 }}
        >
          Powerful automation tools to transform your business
        </Typography>

        <Grid container spacing={4}>
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Grid item xs={12} md={6} key={product.title}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      transition: "all 0.3s ease-in-out",
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: { xs: "200px", md: "300px" },
                      overflow: "hidden",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Image
                      src={product.media.src}
                      alt={product.media.alt}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Icon
                        sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
                      />
                      <Typography variant="h4" component="h2">
                        {product.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>
                    <List>
                      {product.features.map((feature) => (
                        <ListItem key={feature} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <ScheduleCallButton fullWidth text="Schedule Call" />
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
