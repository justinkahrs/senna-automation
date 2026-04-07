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
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ScheduleCallButton from "../ScheduleCallButton";
import { Logo } from "./Logo";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { usePathname } from "next/navigation";
import { ACCENT, STONE_400 } from "../theme/theme";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
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
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          borderBottom: "none",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <Toolbar sx={{ width: "100%", minHeight: "112px !important" }}>
          <Stack direction="row" spacing={5} sx={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
            <Link href="/" passHref style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Logo
                sx={{ height: 80, cursor: "pointer" }}
              />
            </Link>
          </Stack>
        </Toolbar>
      </MUIAppBar>
    );
  }

  return (
    <MUIAppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "none",
        boxShadow: scrolled ? "var(--shadow-appbar)" : "var(--shadow-none)",
        transition:
          "background-color var(--dur-moderate) ease, backdrop-filter var(--dur-moderate) ease, border-color var(--dur-moderate) ease, box-shadow var(--dur-moderate) ease",
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          px: { xs: 2, md: 4 },
          minHeight: scrolled ? "64px !important" : "112px !important",
          py: scrolled ? 0.5 : 3.5,
          transition: "min-height 0.4s ease, padding 0.4s ease",
          gap: 2,
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <Logo
              // logoFontColor={"#BADA55"}
              sx={{
                height: scrolled ? 56 : 80,
                cursor: "pointer",
                transition: "height 0.4s ease, opacity var(--dur-base) ease",
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
            sx={{ display: "flex", alignItems: "center", gap: 5, ml: 6 }}
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
                    fontSize: "var(--type-button)",
                    letterSpacing: "-0.01em",
                    px: 3,
                    py: 0.75,
                    borderRadius: 2,
                    minWidth: 0,
                    backgroundColor: isActive
                      ? "var(--color-bg-accent-hover)"
                      : "transparent",
                    position: "relative",
                    "&:hover": {
                      backgroundColor: "var(--color-bg-neutral-hover)",
                      color: "text.primary",
                    },
                    transition: "color var(--dur-base) ease, background-color var(--dur-base) ease",
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
              variant="text"
              sx={{
                color: "var(--ds-space-indigo)",
                borderRadius: "var(--radius-pill)",
                px: 2.5,
                py: 0.875,
                fontSize: "var(--type-button)",
                fontWeight: "var(--weight-semibold)",
                "&:hover": {
                  backgroundColor: "var(--color-bg-neutral-hover)",
                  color: "var(--ds-space-indigo)",
                },
              }}
            >
              Contact Sales
            </Button>
            <ScheduleCallButton
              text="Book a Demo"
              showIcon={false}
              sx={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text-inverse)",
                borderRadius: "var(--radius-pill)",
                px: 1.5,
                py: 0.875,
                fontSize: "var(--type-button)",
                fontWeight: "var(--weight-medium)",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "var(--color-accent-light)",
                  boxShadow: "none",
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
                transition: "background-color var(--dur-base) ease",
              }}
            >
              {isOpen ? (
                <CloseIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
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
                  boxShadow: "var(--shadow-md)",
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
                      fontSize: "var(--type-button)",
                      py: 1.25,
                      px: 2,
                      borderRadius: 1,
                      mx: 0.5,
                      "&:not(:last-child)": { borderBottom: "none" },
                      "&:hover": {
                        backgroundColor: "var(--color-bg-neutral-hover)",
                        color: "text.primary",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "var(--color-bg-accent-hover)",
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
                  color: "var(--ds-space-indigo)",
                  fontWeight: 600,
                  fontSize: "var(--type-button)",
                  py: 1.25,
                  px: 2,
                  borderRadius: 1,
                  mx: 0.5,
                  "&:not(:last-child)": { borderBottom: "none" },
                  "&:hover": {
                    backgroundColor: "var(--color-bg-neutral-hover)",
                    color: "var(--ds-space-indigo)",
                  },
                }}
              >
                <Typography variant="body1" sx={{ color: "inherit", fontWeight: "inherit" }}>
                  Contact Sales
                </Typography>
              </MenuItem>

              <Box sx={{ px: 1.5, pb: 1.5, pt: 0.5 }}>
                <ScheduleCallButton
                  text="Book a Demo"
                  fullWidth
                  showIcon={false}
                  sx={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-text-inverse)",
                    borderRadius: "var(--radius-pill)",
                    py: 1.25,
                    fontWeight: 500,
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "var(--color-accent-light)",
                      boxShadow: "none",
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
