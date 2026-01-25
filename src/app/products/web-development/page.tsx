"use client";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState } from "react";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import PortfolioCard from "@/components/PortfolioCard";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    website: "",
    budget: "",
    challenges: "",
    assistance: "",
    contactMethod: "email",
    contactValue: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);

  const isValidContact = validateContact(
    formData.contactMethod,
    formData.contactValue,
  );
  const showError = touched && formData.contactValue !== "" && !isValidContact;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidContact) return;
    setSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("business", formData.business);
      submitData.append("website", formData.website);
      submitData.append("budget", formData.budget);
      submitData.append("challenges", formData.challenges);
      submitData.append("assistance", formData.assistance);
      submitData.append("contactMethod", formData.contactMethod);
      submitData.append("contactValue", formData.contactValue);

      const res = await fetch("/api/form-hook", {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessMessage />;

  if (submitting) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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
          sx={{ mb: 8, textAlign: isMobile ? "justify" : "center" }}
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
                    boxShadow: theme.shadows[8],
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

        {/* Review Form */}
        <Card
          sx={{
            maxWidth: 900,
            mx: "auto",
            mt: 8,
            p: { xs: 3, md: 5 },
            bgcolor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight="bold"
            color="text.primary"
          >
            Free Website Review
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Get clarity on why your website isn&apos;t bringing in leads and
            what to do about it. During this call, we will:
          </Typography>
          <List sx={{ mb: 4 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="body1">•</Typography>
              </ListItemIcon>
              <ListItemText
                primary="Run a speed test to see how fast your website loads under various conditions."
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="body1">•</Typography>
              </ListItemIcon>
              <ListItemText
                primary="Look at your current website to pinpoint where you're losing opportunities."
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="body1">•</Typography>
              </ListItemIcon>
              <ListItemText
                primary="Answer your specific questions so you can stop guessing."
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItem>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="body1">•</Typography>
              </ListItemIcon>
              <ListItemText
                primary="Give you total clarity on the best website solution for your business goals."
                primaryTypographyProps={{
                  variant: "body2",
                  color: "text.secondary",
                }}
              />
            </ListItem>
          </List>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Company Name"
                  value={formData.business}
                  onChange={(e) => handleChange("business", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Company Website Address"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Budget"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  variant="outlined"
                >
                  {pricingTiers.map((tier) => (
                    <MenuItem key={tier.name} value={tier.name}>
                      {tier.price} - {tier.name}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="What challenges are you facing with your current website?"
                  value={formData.challenges}
                  onChange={(e) => handleChange("challenges", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="How can we assist you?"
                  value={formData.assistance}
                  onChange={(e) => handleChange("assistance", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                  Preferred Contact Method *
                </Typography>
                <RadioGroup
                  row
                  value={formData.contactMethod}
                  onChange={(e) =>
                    handleChange("contactMethod", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Email"
                  />
                  <FormControlLabel
                    value="sms"
                    control={<Radio />}
                    label="SMS"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label={formData.contactMethod === "email" ? "Email" : "Phone"}
                  value={formData.contactValue}
                  onChange={(e) => handleChange("contactValue", e.target.value)}
                  onBlur={() => setTouched(true)}
                  variant="outlined"
                  error={showError}
                  helperText={
                    showError
                      ? formData.contactMethod === "email"
                        ? "Invalid email format"
                        : "Invalid phone format"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={
                    !isValidContact ||
                    !formData.name ||
                    !formData.business ||
                    !formData.challenges ||
                    !formData.assistance
                  }
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                  }}
                >
                  Submit Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
