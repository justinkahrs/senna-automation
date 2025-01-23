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
      "Automate your content creation process using RSS feeds, newsletters, reddit posts, and many others",
    features: [
      "Generate blogs automatically from RSS feeds",
      "Create curated newsletters",
      "Customize content to match your brand voice",
    ],
    media: {
      src: "/content-generation.jpg",
      alt: "Social media icons",
      type: "gif",
    },
  },
  {
    title: "Social Media Ad Campaigns",
    icon: CampaignIcon,
    description: "Let automation handle your social media advertising",
    features: [
      "Automated campaign management",
      "Smart audience targeting",
      "Performance optimization",
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
    description: "Automated lead generation and outreach system",
    features: [
      "Automated lead discovery via Google Maps",
      "Intelligent email outreach",
      "Lead qualification automation",
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
    description: "Generate and process invoices automatically",
    features: [
      "Create proposals from meeting transcripts",
      "Automated invoice generation",
      "Smart payment tracking",
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
    description: "AI-powered customer support automation",
    features: [
      "Knowledge base integration",
      "Automated issue resolution",
      "Smart escalation system",
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
    description: "Your automated personal assistant",
    features: [
      "Automated email management",
      "Smart meeting scheduling",
      "Intelligent chatbot interface",
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
