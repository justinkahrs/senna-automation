"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { usePathname } from "next/navigation";

const footerLinkGroups = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const usesYellowFooterBleed = ["/", "/about", "/contact"].includes(pathname);
  const usesExtendedCtaBackdrop = [
    "/blog",
    "/pricing",
    "/services",
    "/solutions",
  ].some((p) => pathname.startsWith(p));
  const isLegalPage = ["/privacy", "/terms"].includes(pathname);

  return (
    <Box
      component="footer"
      sx={{
        pt: 0,
        pb: 0,
        px: 0,
        mt: { xs: 0, md: -6 },
        position: "relative",
        zIndex: usesExtendedCtaBackdrop ? 1 : 20,
        ...(usesYellowFooterBleed
          ? {
              backgroundColor: "var(--color-text-highlight)",
            }
          : usesExtendedCtaBackdrop
            ? {
                backgroundColor: "transparent",
                "@keyframes footerGradientBG": {
                  "0%": {
                    backgroundPosition: "0% 50%",
                  },
                  "50%": {
                    backgroundPosition: "100% 50%",
                  },
                  "100%": {
                    backgroundPosition: "0% 50%",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: { xs: "-25rem", md: "-40rem" },
                  left: "50%",
                  bottom: 0,
                  width: "100vw",
                  transform: "translateX(-50%)",
                  background:
                    "linear-gradient(-45deg, var(--color-accent), var(--ds-shadow-grey), var(--color-accent))",
                  backgroundSize: "400% 400%",
                  animation: "footerGradientBG 15s ease infinite",
                  pointerEvents: "none",
                  zIndex: -1,
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: { xs: "-25rem", md: "-40rem" },
                  left: "50%",
                  bottom: 0,
                  width: "100vw",
                  transform: "translateX(-50%)",
                  opacity: 0.03,
                  backgroundImage:
                    'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
                  pointerEvents: "none",
                  zIndex: -1,
                },
              }
            : isLegalPage
              ? {
                  backgroundColor: "var(--color-bg-base)",
                }
              : {
                  background:
                    "linear-gradient(-45deg, var(--color-accent), var(--ds-shadow-grey), var(--color-accent))",
                  backgroundSize: "400% 400%",
                  animation: "footerGradientBG 15s ease infinite",
                  "@keyframes footerGradientBG": {
                    "0%": {
                      backgroundPosition: "0% 50%",
                    },
                    "50%": {
                      backgroundPosition: "100% 50%",
                    },
                    "100%": {
                      backgroundPosition: "0% 50%",
                    },
                  },
                }),
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: { xs: "100%", md: 1240 },
          mx: "auto",
          bgcolor: "var(--ds-space-indigo)",
          color: "var(--color-bg-subtle)",
          borderRadius: { xs: 0, md: "24px 24px 0 0" },
          overflow: "hidden",
        }}
      >
        {/* Subtle texture overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.02,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth={false}
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: 3, sm: 5, md: 8, lg: 10 },
            py: 10,
          }}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} md={2}>
              <Box
                component="img"
                src="/master-logo.svg"
                alt="Senna Automation"
                sx={{
                  display: "block",
                  width: { xs: 180, md: 200 },
                  height: "auto",
                  mb: 2,
                  filter: "brightness(0) invert(1)",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: "var(--color-text-on-dark-body)", mb: 0.5 }}
              >
                Grand Rapids, MI
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--color-text-on-dark-body)", mb: 2 }}
              >
                (616) 287-3360
              </Typography>
            </Grid>
            {footerLinkGroups.map((group) => (
              <Grid item xs={12} sm={4} md={2} key={group.heading}>
                <Box sx={{ ml: { md: 5 } }}>
                  <Typography
                    variant="overline"
                    sx={{
                      color: "var(--color-text-on-dark-prominent)",
                      display: "block",
                      mb: 3,
                    }}
                  >
                    {group.heading}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        sx={{
                          color: "var(--color-accent-cyan)",
                          textDecoration: "none",
                          transition: "color var(--dur-base) ease",
                          "&:hover": { color: "var(--color-bg-subtle)" },
                        }}
                      >
                        <Typography variant="body2" color="inherit">
                          {link.label}
                        </Typography>
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12} sm={4} md={2}>
              <Box sx={{ ml: { md: 5 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "var(--color-text-on-dark-prominent)",
                    display: "block",
                    mb: 3,
                  }}
                >
                  Connect
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <IconButton
                    component="a"
                    href="https://linkedin.com/company/senna-automation"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "var(--color-text-on-dark-body)",
                      p: 0,
                      "&:hover": { color: "var(--color-accent-cyan)" },
                    }}
                  >
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://instagram.com/sennaautomation"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: "var(--color-text-on-dark-body)",
                      p: 0,
                      "&:hover": { color: "var(--color-accent-cyan)" },
                    }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <Box sx={{ ml: { md: 5 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "var(--color-text-on-dark-prominent)",
                    display: "block",
                    mb: 2,
                    letterSpacing: "0.1em",
                  }}
                >
                  Trust
                </Typography>
                <Link
                  href="https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    opacity: 0.8,
                    transition:
                      "opacity var(--dur-base) ease, transform var(--dur-base) ease",
                    marginLeft: "-42px", // Align with the heading above
                    "&:hover": {
                      opacity: 1,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/bbb.svg"
                    alt="BBB Profile"
                    sx={{
                      height: 100,
                      width: "auto",
                      borderRadius: "var(--radius-sm)",
                    }}
                  />
                </Link>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 10,
              pt: 4,
              borderTop: "1px solid var(--color-text-muted)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              color: "var(--color-text-muted)",
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "var(--color-text-muted)" }}
            >
              © {new Date().getFullYear()} Senna Automation LLC.
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link
                href="/privacy"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "var(--color-bg-subtle)" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-muted)" }}
                >
                  Privacy
                </Typography>
              </Link>
              <Link
                href="/terms"
                sx={{
                  color: "inherit",
                  textDecoration: "none",
                  "&:hover": { color: "var(--color-bg-subtle)" },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "var(--color-text-muted)" }}
                >
                  Terms
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
