"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function AppBar() {
  const mode = "light";
  const theme = useTheme();
  const navTextColor = theme.palette.primary.contrastText;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  if (!mounted) {
    return (
      <MUIAppBar position="fixed" sx={{ color: navTextColor }}>
        <Toolbar sx={{ width: "100%" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Link href="/" passHref>
              <Box
                component="img"
                src="/senna-automation-new.png"
                alt="Senna Automation"
                sx={{
                  height: 40,
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
        </Toolbar>
      </MUIAppBar>
    );
  }

  return (
    <MUIAppBar position="fixed" sx={{ color: navTextColor }}>
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link href="/" passHref>
            <Box
              component="img"
              src="/senna-automation-new.png"
              alt="Senna Automation"
              sx={{
                height: 40,
                cursor: "pointer",
              }}
            />
          </Link>
        </Box>
        {isMobile ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >

            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={{ color: navTextColor }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem
                component={Link}
                href="/services"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Services
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/solutions"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Solutions
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/pricing"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Pricing
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/about"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  About
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/contact"
                onClick={handleMobileMenuClose}
                sx={{
                  backgroundColor: mode === "light" ? "#000000" : "#FFFFFF",
                  color: mode === "light" ? "#FFFFFF" : "#000000",
                  "&:hover": {
                    backgroundColor: mode === "light" ? "#333333" : "#EEEEEE",
                  },
                  m: 1,
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
                  Book a Demo
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button color="inherit" component={Link} href="/services">
                <Typography variant="h5" sx={{ color: navTextColor }}>
                  Services
                </Typography>
              </Button>
              <Button color="inherit" component={Link} href="/solutions">
                <Typography variant="h5" sx={{ color: navTextColor }}>
                  Solutions
                </Typography>
              </Button>
              <Button color="inherit" component={Link} href="/pricing">
                <Typography variant="h5" sx={{ color: navTextColor }}>
                  Pricing
                </Typography>
              </Button>
              <Button color="inherit" component={Link} href="/about">
                <Typography variant="h5" sx={{ color: navTextColor }}>
                  About
                </Typography>
              </Button>
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#EEEEEE",
                  },
                  borderRadius: "50px",
                  px: 3,
                }}
              >
                <Typography variant="button" sx={{ fontWeight: "bold" }}>
                  Book a Demo
                </Typography>
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
