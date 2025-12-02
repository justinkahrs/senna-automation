"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { products } from "../products";
import ProductCard from "@/components/ProductCard";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";

export default function AIAutomationProducts() {
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
          AI Automation Templates
        </Typography>
        <Typography
          variant="h6"
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
        </Grid>

        {/* AI Solution Review Form */}
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
            Free AI Solution Review
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Discover how AI and automation can transform your business operations. During this consultation, we will:
          </Typography>
          <List sx={{ mb: 4 }}>
            <ListItem sx={{ py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <Typography variant="body1">•</Typography>
              </ListItemIcon>
              <ListItemText
                primary="Analyze your current workflows to identify automation opportunities."
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
                primary="Review which AI tools and templates best fit your business needs."
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
                primary="Answer your specific questions about implementation and ROI."
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
                primary="Provide a clear roadmap for integrating AI automation into your operations."
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
                  label="Your Company Website (Optional)"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Investment Range"
                  value={formData.budget}
                  onChange={(e) => handleChange("budget", e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="$0-$5000">$0-$5,000</MenuItem>
                  <MenuItem value="$5000-$15000">$5,000-$15,000</MenuItem>
                  <MenuItem value="$15000+">$15,000+</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={3}
                  label="What manual processes are slowing down your business?"
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
                  label="What specific outcomes are you looking to achieve with AI automation?"
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
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
