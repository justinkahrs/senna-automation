"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import CampaignIcon from "@mui/icons-material/Campaign";
import EmailIcon from "@mui/icons-material/Email";
import DescriptionIcon from "@mui/icons-material/Description";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AssistantIcon from "@mui/icons-material/Assistant";
import PersonIcon from "@mui/icons-material/Person";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RequestFormButton from "@/components/RequestFormButton";
import ProductCard, { type Product } from "@/components/ProductCard";

const products: Product[] = [
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
    title: "Onboarding Automation",
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
    title: "Social Media Management",
    icon: CampaignIcon,
    description:
      "Boost your social media presence with intelligent automation.",
    features: [
      "Fully automated multi-platform social media campaign management",
      "AI-driven smart audience targeting and retargeting",
      "Real-time performance tracking and continuous optimization",
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
      "Automated lead discovery via Google Maps and LinkedIn",
      "AI-powered email personalization for better engagement",
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
    title: "Invoice Processing System",
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
export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        bgcolor: "background.default",
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
          AI Automation Templates
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: isMobile ? "justify" : "center" }}
        >
          Powerful automation tools needing minimal customization to get up and
          running in your business.
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {products.map((product, index) => (
            <Grid
              item
              xs={12}
              md={8}
              key={product.title}
              sx={{ display: "flex" }}
            >
              <ProductCard
                product={product}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            </Grid>
          ))}
          <Grid container item xs={12} md={8} justifyContent="center">
            <Grid item xs={9} sx={{ display: "flex" }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h4" component="h2" gutterBottom>
                    Custom Request
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Can&apos;t find the template you need? Request a custom
                    solution tailored to your business.
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, justifyContent: "center" }}>
                  <RequestFormButton
                    fullWidth
                    text="Request Custom Solution"
                    variant="contained"
                  />
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
