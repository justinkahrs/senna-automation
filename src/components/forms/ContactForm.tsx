"use client";
import { useState } from "react";
import ScheduleCallButton from "@/components/ScheduleCallButton";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";
import SubmittingOverlay from "@/components/SubmittingOverlay";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [assistance, setAssistance] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactValue, setContactValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isValidContact = validateContact(contactMethod, contactValue);
  const showError = touched && contactValue !== "" && !isValidContact;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidContact) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("company", company);
      formData.append("assistance", assistance);
      formData.append("contactMethod", contactMethod);
      formData.append("contactValue", contactValue);

      const res = await fetch("/api/form-hook", {
        method: "POST",
        body: formData,
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
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        p: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 12, md: 20 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="start">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                maxWidth: 520,
                pt: { md: 6 },
                position: { md: "sticky" },
                top: { md: 120 },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                color="text.primary"
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                Get Your Free Automation Audit
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  maxWidth: 560,
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                No prep needed. We&apos;ll walk through your current process and
                find where automation can help.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: { xs: "center", md: "left" } }}
              >
                Prefer to talk directly? Call{" "}
                <a
                  href="tel:+16162873360"
                  style={{ color: "inherit", textDecoration: "underline" }}
                >
                  (616) 287-3360
                </a>
                .
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box sx={{ width: "100%", maxWidth: 640, ml: { md: "auto" } }}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  width: "100%",
                }}
              >
                <TextField
                  fullWidth
                  required
                  id="contact-name"
                  label="Your Name"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  aria-label="Enter your full name"
                />
                <TextField
                  fullWidth
                  id="contact-company"
                  label="Company (Optional)"
                  placeholder="Acme Corp"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  margin="normal"
                  aria-label="Enter your company name"
                />
                <TextField
                  fullWidth
                  required
                  id="contact-assistance"
                  label="How can we assist you?"
                  placeholder="What’s taking too much time right now?"
                  value={assistance}
                  onChange={(e) => setAssistance(e.target.value)}
                  margin="normal"
                  aria-label="Describe how we can help your business"
                  multiline
                  rows={3}
                />
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ mt: 2, mb: 1 }}
                >
                  Preferred Contact Method *
                </Typography>
                <RadioGroup
                  row
                  aria-label="Select your preferred contact method"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="email"
                    control={<Radio />}
                    label="Email"
                    id="contact-email"
                  />
                  <FormControlLabel
                    value="sms"
                    control={<Radio />}
                    label="SMS / Phone"
                    id="contact-sms"
                  />
                </RadioGroup>
                <TextField
                  fullWidth
                  required
                  id="contact-value"
                  label={
                    contactMethod === "email"
                      ? "Your Email Address"
                      : "Your Phone Number"
                  }
                  type={contactMethod === "email" ? "email" : "tel"}
                  placeholder={
                    contactMethod === "email"
                      ? "john@company.com"
                      : "(616) 555-1234"
                  }
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  onBlur={() => setTouched(true)}
                  margin="normal"
                  aria-label={
                    contactMethod === "email"
                      ? "Enter your email address for us to contact you"
                      : "Enter your phone number for us to contact you"
                  }
                  error={showError}
                  helperText={
                    showError
                      ? contactMethod === "email"
                        ? "Please enter a valid email address (e.g., name@domain.com)"
                        : "Please enter a valid phone number (e.g., (616) 555-1234)"
                      : ""
                  }
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontSize: "1.1rem" }}
                  disabled={!isValidContact}
                  aria-label="Submit your contact request"
                >
                  Request My Free Audit
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  width: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  textAlign: "center",
                  bgcolor: "background.paper",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5 }}
                >
                  Prefer to just talk? Skip the form.
                </Typography>
                <ScheduleCallButton
                  text="Schedule a Free 30-Min Call"
                  size="medium"
                  showIcon={false}
                />
                <Box
                  sx={{
                    mt: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "inherit" }}>
                    via
                  </Typography>
                  <Box
                    component="img"
                    src="/Calendly.svg"
                    alt="Calendly"
                    sx={{
                      height: "0.95rem",
                      width: "auto",
                      opacity: 0.8,
                      mt: "2px",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
