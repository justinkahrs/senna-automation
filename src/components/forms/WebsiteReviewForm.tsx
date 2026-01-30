"use client";
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Grid,
  MenuItem,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";
import SubmittingOverlay from "@/components/SubmittingOverlay";

interface PricingTier {
  name: string;
  price: string;
}

interface WebsiteReviewFormProps {
  pricingTiers: PricingTier[];
}

export default function WebsiteReviewForm({
  pricingTiers,
}: WebsiteReviewFormProps) {
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
  if (submitting) return <SubmittingOverlay />;

  return (
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
        Get clarity on why your website isn&apos;t bringing in leads and what to
        do about it. During this call, we will:
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
              onChange={(e) => handleChange("contactMethod", e.target.value)}
            >
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
              <FormControlLabel value="sms" control={<Radio />} label="SMS" />
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
              sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
            >
              Submit Message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}
