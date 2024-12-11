"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

interface FormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { signInWithEmail, signInWithGithub, signInWithGoogle, signUp } =
    useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsSignUp(false);
    try {
      await signInWithEmail(formData.email, formData.password);
    } catch (error) {
      setIsSignUp(true);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await signUp(formData.email, formData.password);
      setError("Please check your email to verify your account.");
      setIsSignUp(false);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {isSignUp ? "Create Account" : "Sign In to Senna"}
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
            {isSignUp && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  gutterBottom
                >
                  Need an account?
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleSignUp}
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up Instead"
                  )}
                </Button>
              </Box>
            )}
          </form>

          <Divider sx={{ my: 2 }}>
            <Typography color="text.secondary">or continue with</Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => signInWithGoogle()}
            sx={{ py: 1.5 }}
          >
            Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GitHubIcon />}
            onClick={() => signInWithGithub()}
            sx={{ py: 1.5 }}
          >
            GitHub
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
