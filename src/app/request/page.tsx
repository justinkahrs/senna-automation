"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SuccessMessage from "../../components/SuccessMessage";
import SlidingQuestionCard from "@/components/SlidingQuestionCard";
import { validateContact } from "@/utils/validation";

const questions = [
  {
    key: "name",
    label: "Your Name:",
    placeholder: "Please enter your full name.",
  },
  {
    key: "business",
    label: "Your Business Name:",
    placeholder: "What is the name of your business or organization?",
  },
  {
    key: "website",
    label: "Business Website/URL:",
    placeholder: "Enter your business website or URL (optional).",
  },
  {
    key: "challenges",
    label: "What day-to-day challenges are you facing?",
    placeholder: "Briefly describe the main problem you need help solving.",
  },
  {
    key: "assistance",
    label: "How can we address those challenges?",
    placeholder: "It's ok if you aren't sure right now.",
  },
  {
    key: "budget",
    label: "Budget:",
    placeholder: "(one number, optional)",
  },
  {
    key: "contact",
    label: "How would you prefer to be contacted?",
    placeholder: "",
  },
];

export default function RequestForm() {
  const [current, setCurrent] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "left"
  );
  const [answers, setAnswers] = useState({
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
  const [contactTouched, setContactTouched] = useState(false);
  const theme = useTheme();

  const handleChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    setSlideDirection("left");
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setSubmitting(true);
      try {
        const res = await fetch("/api/form-hook", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        if (res.ok) setSubmitted(true);
      } catch (error) {
        console.error(error);
      }
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setSlideDirection("right");
      setCurrent(current - 1);
    }
  };

  if (submitted) return <SuccessMessage />;

  const currentQuestion = questions[current];
  let isValid: boolean;
  if (currentQuestion.key === "contact") {
    isValid = validateContact(answers.contactMethod, answers.contactValue);
  } else {
    isValid =
      currentQuestion.key === "website" ||
      answers[currentQuestion.key as keyof typeof answers].trim() !== "";
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <SlidingQuestionCard
          key={current}
          initial={{ x: slideDirection === "left" ? 100 : -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentQuestion.key === "contact" ? (
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 1, fontSize: "1.25rem" }}>
                {currentQuestion.label}
              </FormLabel>
              <RadioGroup
                row
                value={answers.contactMethod}
                onChange={(e) => handleChange("contactMethod", e.target.value)}
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel value="sms" control={<Radio />} label="SMS" />
              </RadioGroup>
              <TextField
                fullWidth
                required
                autoFocus
                label={
                  answers.contactMethod === "email"
                    ? "Email Address"
                    : "Phone Number"
                }
                placeholder={
                  answers.contactMethod === "email"
                    ? "Enter your email address"
                    : "Enter your phone number"
                }
                value={answers.contactValue}
                onChange={(e) => handleChange("contactValue", e.target.value)}
                onBlur={() => setContactTouched(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isValid) {
                    e.preventDefault();
                    handleNext();
                  }
                }}
                variant="outlined"
                margin="normal"
                error={
                  contactTouched &&
                  answers.contactValue !== "" &&
                  !validateContact(answers.contactMethod, answers.contactValue)
                }
                helperText={
                  contactTouched &&
                  answers.contactValue !== "" &&
                  !validateContact(answers.contactMethod, answers.contactValue)
                    ? answers.contactMethod === "email"
                      ? "Invalid email format"
                      : "Invalid phone format"
                    : ""
                }
              />
            </FormControl>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {currentQuestion.label}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {current + 1}/{questions.length}
                </Typography>
              </Box>
              <TextField
                fullWidth
                required={
                  currentQuestion.key !== "budget" &&
                  currentQuestion.key !== "website"
                }
                autoFocus
                type={currentQuestion.key === "budget" ? "number" : "text"}
                placeholder={currentQuestion.placeholder}
                value={answers[currentQuestion.key as keyof typeof answers]}
                onChange={(e) =>
                  handleChange(currentQuestion.key, e.target.value)
                }
                onKeyDown={(e) => {
                  // If the current question is for the budget, enforce numeric input rules
                  if (currentQuestion.key === "budget") {
                    const input = e.target as HTMLInputElement;
                    if (e.key === "." && input.value.includes(".")) {
                      e.preventDefault();
                    } else if (e.key.length === 1 && !/[0-9.]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }
                  // Handle Enter key if valid
                  if (e.key === "Enter" && isValid) {
                    e.preventDefault();
                    handleNext();
                    return;
                  }
                }}
                variant="outlined"
                margin="normal"
              />
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            {current > 0 && <Button onClick={handleBack}>Back</Button>}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={submitting || !isValid}
            >
              {current === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </SlidingQuestionCard>
      </Container>
    </Box>
  );
}
