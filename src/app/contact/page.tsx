"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
} from "@mui/material";
import { validateContact } from "@/utils/validation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [assistance, setAssistance] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactValue, setContactValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  const isValidContact = validateContact(contactMethod, contactValue);
  const showError = touched && contactValue !== "" && !isValidContact;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidContact) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/form-hook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, assistance, contactMethod, contactValue }),
      });
      if (res.ok) {
        router.push("/confirmation");
      } else {
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

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
          backgroundColor: "rgba(255,255,255,0.8)",
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Contact Us
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 600 }}
      >
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="How can we assist you?"
          value={assistance}
          onChange={(e) => setAssistance(e.target.value)}
          margin="normal"
        />
        <RadioGroup
          row
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
        >
          <FormControlLabel value="email" control={<Radio />} label="Email" />
          <FormControlLabel value="sms" control={<Radio />} label="SMS" />
        </RadioGroup>
        <TextField
          fullWidth
          label={contactMethod === "email" ? "Email" : "Phone"}
          value={contactValue}
          onChange={(e) => setContactValue(e.target.value)}
          onBlur={() => setTouched(true)}
          margin="normal"
          error={showError}
          helperText={
            showError
              ? contactMethod === "email"
                ? "Invalid email format"
                : "Invalid phone format"
              : ""
          }
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
          disabled={!isValidContact}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
