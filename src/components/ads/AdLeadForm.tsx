"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { submitLead } from "@/utils/lead-submit";
import {
  trackFormSubmission,
  trackGoogleLeadConversion,
} from "@/utils/analytics";
import { validateContact } from "@/utils/validation";

export default function AdLeadForm({
  landingPageSlug,
  landingPageVariant,
  prompt,
}: {
  landingPageSlug: string;
  landingPageVariant: string;
  prompt: string;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [assistance, setAssistance] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "sms">("email");
  const [contactValue, setContactValue] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  const validContact = validateContact(contactMethod, contactValue);
  const canSubmit =
    status === "idle" &&
    name.trim().length >= 2 &&
    assistance.trim().length >= 5 &&
    validContact;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setError("");

    try {
      const result = await submitLead({
        name,
        company,
        assistance,
        contactMethod,
        contactValue,
        formContext: "google-ads-landing-page",
        landingPageSlug,
        landingPageVariant,
      });
      setStatus("success");
      trackFormSubmission("google_ads_landing", {
        contact_method: contactMethod,
        landing_page: landingPageSlug,
        variant: landingPageVariant,
      });
      trackGoogleLeadConversion(result?.submissionId);
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not store your request. Please call (616) 287-3360.",
      );
    }
  };

  if (status === "success") {
    return (
      <Stack
        spacing={2}
        role="status"
        sx={{
          minHeight: 420,
          justifyContent: "center",
          alignItems: "flex-start",
          p: { xs: 3, sm: 4 },
          border: "1px solid var(--color-border-soft)",
          bgcolor: "background.paper",
        }}
      >
        <CheckCircleOutlineIcon sx={{ color: "primary.main", fontSize: 40 }} />
        <Typography component="h2" variant="h4">
          Your assessment request is in.
        </Typography>
        <Typography sx={{ color: "text.secondary", maxWidth: 420 }}>
          We will review the workflow context you shared and respond using your
          preferred contact method.
        </Typography>
        <Button href="tel:+16162873360" variant="outlined">
          Call (616) 287-3360
        </Button>
      </Stack>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      aria-label="Request a free workflow assessment"
      sx={{
        p: { xs: 3, sm: 4 },
        border: "1px solid var(--color-border-soft)",
        bgcolor: "background.paper",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <Stack spacing={2.25}>
        <Box>
          <Typography component="h2" variant="h4" sx={{ mb: 0.75 }}>
            Request your free assessment
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {prompt}
          </Typography>
        </Box>
        <TextField
          required
          label="Your name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          helperText="Who should we ask for?"
          fullWidth
        />
        <TextField
          label="Company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          helperText="Optional."
          fullWidth
        />
        <TextField
          required
          label="Which workflow needs attention?"
          name="assistance"
          value={assistance}
          onChange={(event) => setAssistance(event.target.value)}
          helperText="A few concrete details help us respond usefully."
          minRows={3}
          multiline
          fullWidth
        />
        <FormControl>
          <FormLabel>Preferred reply</FormLabel>
          <RadioGroup
            row
            value={contactMethod}
            onChange={(event) =>
              setContactMethod(event.target.value === "sms" ? "sms" : "email")
            }
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="sms" control={<Radio />} label="Phone / SMS" />
          </RadioGroup>
        </FormControl>
        <TextField
          required
          label={contactMethod === "email" ? "Email address" : "Phone number"}
          name="contactValue"
          type={contactMethod === "email" ? "email" : "tel"}
          autoComplete={contactMethod === "email" ? "email" : "tel"}
          value={contactValue}
          onChange={(event) => setContactValue(event.target.value)}
          error={Boolean(contactValue) && !validContact}
          helperText={
            Boolean(contactValue) && !validContact
              ? `Enter a valid ${contactMethod === "email" ? "email address" : "phone number"}.`
              : "Used only to reply to this request."
          }
          fullWidth
        />
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!canSubmit}
          sx={{
            py: 1.5,
            "&:active": { transform: "translateY(1px)" },
          }}
        >
          {status === "submitting" ? "Storing your request…" : "Get My Free Assessment"}
        </Button>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          By submitting, you ask Senna Automation to contact you about this
          workflow. Advertising measurement is controlled separately through
          your privacy choices.
        </Typography>
      </Stack>
    </Box>
  );
}

