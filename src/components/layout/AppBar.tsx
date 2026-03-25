"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import ScheduleCallButton from "../ScheduleCallButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Services",  href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing",   href: "/pricing" },
  { label: "Blog",      href: "/blog" },
];

export function AppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const pathname = usePathname();

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const isOpen = Boolean(mobileMenuAnchorEl);

  // Skeleton for SSR — avoids hydration mismatch
  if (!mounted) {
    return (
      <MUIAppBar
        position="relative"
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Toolbar sx={{ width: "100%", minHeight: "64px !important" }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
            <Link href="/" passHref>
              <Box
                component="img"
                src="/senna-automation-new.png"
                alt="Senna Automation"
                sx={{ height: 36, cursor: "pointer" }}
              />
            </Link>
          </Box>
        </Toolbar>
      </MUIAppBar>
    );
  }

  return (
    <MUIAppBar
      position="relative"
      elevation={0}
      sx={{
        backgroundColor: "background.paper",
        borderBottom: "1px solid",
        borderColor: scrolled ? "divider" : "divider",
        boxShadow: scrolled
          ? "0 2px 16px rgba(28, 25, 23, 0.07)"
          : "none",
        transition:
          "box-shadow 300ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 300ms ease",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 4 },
          minHeight: "64px !important",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Box
              component="img"
              src="/senna-automation-new.png"
              alt="Senna Automation"
              sx={{
                height: 36,
                cursor: "pointer",
                transition: "opacity 180ms ease",
                "&:hover": { opacity: 0.8 },
              }}
            />
          </Link>
        </Box>

        {/* Desktop nav links */}
        {!isMobile && (
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 2 }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Button
                  key={href}
                  component={Link}
                  href={href}
                  disableRipple
                  sx={{
                    color: isActive ? "primary.main" : "text.secondary",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.9375rem",
                    letterSpacing: "-0.01em",
                    px: 1.5,
                    py: 0.75,
                    borderRadius: 2,
                    minWidth: 0,
                    backgroundColor: isActive
                      ? "rgba(45,107,94,0.07)"
                      : "transparent",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "rgba(28,25,23,0.04)",
                      color: "text.primary",
                    },
                    transition:
                      "color 180ms ease, background-color 180ms ease",
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Desktop CTAs */}
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="secondary"
              sx={{
                borderColor: "divider",
                color: "text.secondary",
                borderRadius: "9999px",
                px: 2.5,
                py: 0.875,
                fontSize: "0.9375rem",
                fontWeight: 500,
                "&:hover": {
                  borderColor: "text.secondary",
                  backgroundColor: "rgba(28,25,23,0.03)",
                  color: "text.primary",
                },
              }}
            >
              Contact Sales
            </Button>
            <ScheduleCallButton
              text="Book a Demo"
              showIcon={false}
              sx={{
                backgroundColor: "secondary.main",
                color: "#FFFFFF",
                borderRadius: "9999px",
                px: 2.5,
                py: 0.875,
                fontSize: "0.9375rem",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#292524",
                  boxShadow: "0 4px 16px rgba(28,25,23,0.20)",
                },
              }}
            />
          </Box>
        )}

        {/* Mobile: hamburger */}
        {isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="end"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={isOpen ? handleMobileMenuClose : handleMobileMenuOpen}
              sx={{
                color: "text.primary",
                width: 40,
                height: 40,
                borderRadius: 2,
                transition: "background-color 180ms ease",
              }}
            >
              {isOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </IconButton>

            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={isOpen}
              onClose={handleMobileMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  boxShadow: "0 8px 32px rgba(28,25,23,0.10)",
                  borderRadius: 3,
                  mt: 1,
                  minWidth: 220,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <MenuItem
                    key={href}
                    component={Link}
                    href={href}
                    onClick={handleMobileMenuClose}
                    selected={isActive}
                    sx={{
                      backgroundColor: "transparent",
                      color: isActive ? "primary.main" : "text.primary",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: "0.9375rem",
                      py: 1.25,
                      px: 2,
                      borderRadius: 1,
                      mx: 0.5,
                      "&:not(:last-child)": { borderBottom: "none" },
                      "&:hover": {
                        backgroundColor: "rgba(28,25,23,0.04)",
                        color: "text.primary",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(45,107,94,0.07)",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "inherit", color: "inherit" }}
                    >
                      {label}
                    </Typography>
                  </MenuItem>
                );
              })}

              <MenuItem
                component={Link}
                href="/contact"
                onClick={handleMobileMenuClose}
                sx={{
                  backgroundColor: "transparent",
                  color: "text.secondary",
                  fontSize: "0.9375rem",
                  py: 1.25,
                  px: 2,
                  borderRadius: 1,
                  mx: 0.5,
                  "&:not(:last-child)": { borderBottom: "none" },
                  "&:hover": {
                    backgroundColor: "rgba(28,25,23,0.04)",
                    color: "text.primary",
                  },
                }}
              >
                <Typography variant="body1" sx={{ color: "inherit" }}>
                  Contact Sales
                </Typography>
              </MenuItem>

              <Box sx={{ px: 1.5, pb: 1.5, pt: 0.5 }}>
                <ScheduleCallButton
                  text="Book a Demo"
                  fullWidth
                  showIcon={false}
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "#FFFFFF",
                    borderRadius: "9999px",
                    py: 1.25,
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "#292524",
                    },
                  }}
                />
              </Box>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
