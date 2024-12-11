"use client";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
export function AppBar() {
  const { user, session, signOut } = useAuth();

  console.log({ user, session });
  return (
    <MuiAppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              fontSize: "1.75rem",
            }}
          >
            Senna Automation
          </Typography>
        </Link>

        <Box sx={{ display: "flex", gap: 2 }}>
          {!user ? (
            <>
              <Link href="/auth/signin" passHref>
                <Button variant="outlined">Sign In</Button>
              </Link>
              <Link href="/pricing" passHref>
                <Button variant="contained">Get Started</Button>
              </Link>
            </>
          ) : (
            <>
              <Button variant="text" href="/dashboard">
                Dashboard
              </Button>
              <Button variant="outlined" onClick={signOut}>
                Sign Out
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
