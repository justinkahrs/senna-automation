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
  Container,
} from "@mui/material";
import { validateContact } from "@/utils/validation";
import SuccessMessage from "@/components/SuccessMessage";
import SubmittingOverlay from "@/components/SubmittingOverlay";

export default function ContactForm() {
  const [name, setName] = useState("");
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 4, md: 8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          color="text.primary"
        >
          Contact Our AI Automation Experts
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          Ready to transform your business with{" "}
          <strong>AI workflow automation</strong> and{" "}
          <strong>custom software development</strong>? Reach out to our team of
          experts serving Grand Rapids, Michigan.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", maxWidth: 600 }}
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
            required
            id="contact-assistance"
            label="How can we assist you?"
            placeholder="I need help with AI automation..."
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
              contactMethod === "email" ? "john@company.com" : "(616) 555-1234"
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
            Send Message
          </Button>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          Prefer to talk directly? Call us at{" "}
          <a
            href="tel:+16162873360"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            (616) 287-3360
          </a>{" "}
          for immediate assistance.
        </Typography>
      </Container>
    </Box>
  );
}
