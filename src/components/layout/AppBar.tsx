"use client";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState } from "react";

export function AppBar() {
  const { user, session, signOut } = useAuth();
  const [resourcesAnchorEl, setResourcesAnchorEl] = useState<null | HTMLElement>(null);

  const handleResourcesClick = (event: React.MouseEvent<HTMLElement>) => {
    setResourcesAnchorEl(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setResourcesAnchorEl(null);
  };

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

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Link href="/pricing" passHref>
            <Button color="inherit">Pricing</Button>
          </Link>
          <Box>
            <Button
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleResourcesClick}
            >
              Resources
            </Button>
            <Menu
              anchorEl={resourcesAnchorEl}
              open={Boolean(resourcesAnchorEl)}
              onClose={handleResourcesClose}
            >
              <MenuItem onClick={handleResourcesClose} component={Link} href="/docs">
                Documentation
              </MenuItem>
              <MenuItem onClick={handleResourcesClose} component={Link} href="/blog">
                Blog
              </MenuItem>
              <MenuItem onClick={handleResourcesClose} component={Link} href="/support">
                Support
              </MenuItem>
            </Menu>
          </Box>
        </Box>

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