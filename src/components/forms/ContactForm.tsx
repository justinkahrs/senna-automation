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
  Card,
  CardContent,
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
        bgcolor: "var(--color-text-highlight)",
        color: "var(--color-text-primary)",
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
          pb: { xs: 10, md: 16 },
        }}
      >
        <Grid container spacing={{ xs: 6, md: 10 }} alignItems="start">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                maxWidth: 520,
                pt: { md: 6 },
                pr: { md: 4, lg: 6 },
                position: { md: "sticky" },
                top: { md: 120 },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                color="text.primary"
                sx={{
                  fontFamily:
                    '"itc-avant-garde-gothic-pro", system-ui, -apple-system, sans-serif',
                  textAlign: { xs: "center", md: "left" },
                  textTransform: "uppercase",
                  fontSize: "clamp(3.75rem, 9vw, 7rem)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.04em",
                }}
              >
                <Box
                  component="span"
                  sx={{ display: "block", fontSize: "0.9em", fontWeight: 700 }}
                >
                  You&apos;ve got questions.
                </Box>
                <Box
                  component="span"
                  sx={{
                    display: "block",
                    mt: 1,
                    textTransform: "none",
                    fontFamily: '"posh", sans-serif',
                    fontWeight: 900,
                    fontStyle: "italic",
                    fontSize: { xs: "1.06em", sm: "1.12em", md: "1.16em" },
                    lineHeight: 0.88,
                    color: "var(--ds-space-indigo, #181925)",
                    textShadow: {
                      xs: "3px 3px 0 var(--ds-magenta-light, #991778)",
                      sm: "4px 4px 0 var(--ds-magenta-light, #991778)",
                      md: "6px 6px 0 var(--ds-magenta-light, #991778)",
                    },
                  }}
                >
                  Good.
                </Box>
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.primary"
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
                  color="text.primary"
                  sx={{
                    textAlign: { xs: "center", md: "left" },
                    "& a:hover": { color: "var(--color-accent)" },
                  }}
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
            <Box
              sx={{
                width: "100%",
                maxWidth: 640,
                ml: { md: "auto" },
                pl: { md: 3, lg: 5 },
              }}
            >
              <Box
                component="form"
                id="contact-form"
                onSubmit={handleSubmit}
                sx={{
                  width: "100%",
                  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                    backgroundColor: "var(--color-text-highlight) !important",
                  },
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "var(--color-bg-paper)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-text-primary)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-text-primary)",
                      transition: "color 0.2s ease",
                    },
                    "&:hover .MuiInputLabel-root": {
                      color: "var(--color-accent)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-accent)",
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "var(--color-bg-paper)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-text-primary)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-text-primary)",
                      transition: "color 0.2s ease",
                    },
                    "&:hover .MuiInputLabel-root": {
                      color: "var(--color-accent)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-accent)",
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "var(--color-bg-paper)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-text-primary)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-text-primary)",
                      transition: "color 0.2s ease",
                    },
                    "&:hover .MuiInputLabel-root": {
                      color: "var(--color-accent)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-accent)",
                    },
                  }}
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
                  sx={{
                    "& .MuiFormControlLabel-root": {
                      color: "var(--color-text-primary)",
                      "& .MuiTypography-root": {
                        color: "var(--color-text-primary)",
                        transition: "color 0.2s ease",
                      },
                      "&:hover": {
                        "& .MuiRadio-root": {
                          color: "var(--color-accent)",
                        },
                        "& .MuiTypography-root": {
                          color: "var(--color-accent)",
                        },
                      },
                    },
                    "& .MuiRadio-root": {
                      color: "var(--color-text-primary)",
                      transition: "color 0.2s ease",
                      "&.Mui-checked": {
                        color: "var(--color-accent)",
                      },
                    },
                  }}
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
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      bgcolor: "var(--color-bg-paper)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-accent) !important",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--color-text-primary)",
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--color-text-primary)",
                      transition: "color 0.2s ease",
                    },
                    "&:hover .MuiInputLabel-root": {
                      color: "var(--color-accent)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--color-accent)",
                    },
                  }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    fontSize: "1.1rem",
                    bgcolor: "var(--color-text-primary)",
                    color: "background.paper",
                    "&:hover": {
                      bgcolor: "var(--color-text-primary)",
                      filter: "brightness(1.05)",
                    },
                  }}
                  disabled={!isValidContact}
                  aria-label="Submit your contact request"
                >
                  Request My Free Audit
                </Button>
              </Box>

              <Card
                sx={{
                  mt: 4,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  bgcolor: "background.default",
                  backgroundImage: "none",
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: "var(--color-border-neutral-light)",
                  borderRadius: { xs: 0, md: 1.5 },
                  textAlign: "center",
                  "&:hover": {
                    transform: "none",
                    boxShadow: "none",
                    borderColor: "var(--color-border-neutral-light)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: 4, md: 5.5 },
                    "&:last-child": { pb: { xs: 4, md: 5.5 } },
                  }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
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
                      mt: 2,
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
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
