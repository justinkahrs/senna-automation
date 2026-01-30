import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import PortfolioCard from "@/components/PortfolioCard";
import WebsiteReviewForm from "@/components/forms/WebsiteReviewForm";
import ommImage from "@/app/assets/omm.png";
import o11nImage from "@/app/assets/o11n.png";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: Array<{ text: string; tooltip?: string }>;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$169/mo",
    description:
      "For businesses looking to establish a simple, professional online presence.",
    features: [
      { text: "5 page website design" },
      { text: "Mobile-friendly design" },
      { text: "Hosting + security" },
      { text: "Daily website backups" },
      { text: "Unlimited updates" },
      { text: "Cancel anytime" },
      { text: "4-week delivery" },
    ],
  },
  {
    name: "Growth",
    price: "$299/mo",
    description:
      "Businesses that want inquires, basic SEO, and CRM integration.",
    features: [
      { text: "Starter Features +" },
      {
        text: "Custom CRM setup",
        tooltip: "Integrated customer relationship management system",
      },
      {
        text: "Calendar booking",
        tooltip: "Automated scheduling system for appointments",
      },
      {
        text: "Email marketing tool",
        tooltip: "Built-in email campaign management",
      },
      { text: "Website live chat", tooltip: "Real-time customer support chat" },
      {
        text: "Service area pages",
        tooltip: "Location-specific landing pages for SEO",
      },
      { text: "Website widgets", tooltip: "Custom interactive components" },
      {
        text: "Blog & portfolio",
        tooltip: "Content management for showcasing work",
      },
    ],
  },
  {
    name: "Pro",
    price: "$499/mo",
    description:
      "For businesses that are serious about scaling their online presence and lead generation using the latest AI, automations, and pro level SEO.",
    features: [
      { text: "Growth Features +" },
      {
        text: "AI chatbot",
        tooltip: "Advanced AI-powered conversational assistant",
      },
      {
        text: "AI voice assistant",
        tooltip: "Voice-enabled customer interaction",
      },
      {
        text: "Custom workflows",
        tooltip: "Automated business process workflows",
      },
      {
        text: "Courses & Community",
        tooltip: "Member area with courses and community features",
      },
      {
        text: "SEO keyword tracker",
        tooltip: "Advanced SEO monitoring and analytics",
      },
    ],
  },
];

export default function WebDevelopment() {
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
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Web Development
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: { xs: "justify", sm: "center" } }}
        >
          Modern, responsive, and high-performance websites built to grow your
          business.
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontWeight="bold"
          color="text.primary"
          sx={{ mb: 4 }}
        >
          Recent Clients
        </Typography>

        {/* Portfolio Showcase */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <PortfolioCard
              title="One More Moment"
              description="A beautiful platform for memorializing loved ones through shared digital moments and stories, designed with compassion and simplicity."
              imageSrc={ommImage.src}
              href="https://one-more-moment.vercel.app/"
              previewHeight={400}
              duration={5}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PortfolioCard
              title="o11n"
              description="An AI orchestration platform that simplifies software development, allowing both developers and non-coders to build projects using natural language."
              imageSrc={o11nImage.src}
              href="https://o11n.life"
              previewHeight={400}
              duration={5}
            />
          </Grid>
        </Grid>

        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontWeight="bold"
          color="text.primary"
          sx={{ mb: 4 }}
        >
          Pricing Plans
        </Typography>
        {/* Pricing Cards */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {pricingTiers.map((tier) => (
            <Grid item xs={12} md={4} key={tier.name}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    fontWeight="bold"
                    color="text.primary"
                  >
                    {tier.name}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    gutterBottom
                    fontWeight="bold"
                    sx={{
                      fontFamily: "'Brush Script MT', cursive",
                      fontStyle: "italic",
                      color: "text.primary",
                    }}
                  >
                    {tier.price}
                  </Typography>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, minHeight: 60 }}
                  >
                    {tier.description}
                  </Typography>
                  <Box
                    sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
                  />
                  <List sx={{ py: 0 }}>
                    {tier.features.map((feature, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          py: 0.5,
                          px: 0,
                          alignItems: "flex-start",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                          <CheckIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature.text}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                        {feature.tooltip && (
                          <Tooltip
                            title={feature.tooltip}
                            arrow
                            enterTouchDelay={0}
                            leaveTouchDelay={3000}
                            placement="top"
                          >
                            <IconButton
                              size="small"
                              sx={{
                                ml: 0.5,
                                p: 0,
                                color: "text.secondary",
                              }}
                            >
                              <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <div style={{ padding: "2rem" }}>
                  <ScheduleCallButton fullWidth text="Schedule Call" />
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        <WebsiteReviewForm
          pricingTiers={pricingTiers.map((t) => ({
            name: t.name,
            price: t.price,
          }))}
        />
      </Container>
    </Box>
  );
}
