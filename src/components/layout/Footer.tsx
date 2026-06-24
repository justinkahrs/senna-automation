import { Box, Container, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

const localLinks = [
  { label: "AI Consulting", href: "/ai-consulting-grand-rapids" },
  { label: "AI Automation", href: "/ai-automation-grand-rapids" },
  {
    label: "Workflow Consultant",
    href: "/workflow-automation-consultant-grand-rapids",
  },
];

const exploreLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/senna-automation",
    icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/sennaautomation",
    icon: InstagramIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/senna.automation",
    icon: FacebookIcon,
  },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Portal", href: "/login", isPortal: true },
];

const linkSx = {
  color: "var(--color-accent-cyan)",
  textDecoration: "none",
  fontSize: "0.9375rem",
  lineHeight: 1.7,
  transition: "color var(--dur-base) ease",
  "&:hover": {
    color: "var(--color-bg-subtle)",
  },
};

const footerHeadingSx = {
  color: "var(--color-text-on-dark-prominent)",
  display: "block",
  mb: 2.5,
  letterSpacing: "0.1em",
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        zIndex: 10,
        mt: { xs: 0, md: -6 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          maxWidth: { xs: "100%", md: 1240 },
          mx: "auto",
          bgcolor: "var(--ds-space-indigo)",
          color: "var(--color-bg-subtle)",
          borderRadius: { xs: 0, md: "24px 24px 0 0" },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
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
            py: { xs: 8, md: 10 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "minmax(0, 1.2fr) repeat(3, minmax(0, 0.8fr)) minmax(0, 1fr)",
              },
              gap: { xs: 5, sm: 4, md: 4 },
              alignItems: "start",
            }}
          >
            <Box>
              <Box
                component="img"
                src="/images/master-logo.svg"
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
                component="p"
                variant="body2"
                sx={{ color: "var(--color-text-on-dark-body)", mb: 0.5 }}
              >
                Grand Rapids, MI
              </Typography>
              <Typography
                component="p"
                variant="body2"
                sx={{ color: "var(--color-text-on-dark-body)" }}
              >
                (616) 287-3360
              </Typography>
            </Box>

            <Box>
              <Typography component="p" variant="overline" sx={footerHeadingSx}>
                Company
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {companyLinks.map((link) => (
                  <Box
                    key={link.href}
                    component="a"
                    href={link.href}
                    sx={linkSx}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography component="p" variant="overline" sx={footerHeadingSx}>
                Local
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {localLinks.map((link) => (
                  <Box
                    key={link.href}
                    component="a"
                    href={link.href}
                    sx={linkSx}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>

              <Typography
                component="p"
                variant="overline"
                sx={{ ...footerHeadingSx, mt: 4 }}
              >
                Explore
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                {exploreLinks.map((link) => (
                  <Box
                    key={link.href}
                    component="a"
                    href={link.href}
                    sx={linkSx}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography component="p" variant="overline" sx={footerHeadingSx}>
                Connect
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Box
                    key={label}
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-text-on-dark-body)",
                      transition: "color var(--dur-base) ease",
                      "&:hover": {
                        color: "var(--color-accent-cyan)",
                      },
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography component="p" variant="overline" sx={footerHeadingSx}>
                Trust
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box
                  component="a"
                  href="https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    width: "fit-content",
                    opacity: 0.84,
                    transition:
                      "opacity var(--dur-base) ease, transform var(--dur-base) ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/images/bbb.svg"
                    alt="Better Business Bureau profile"
                    sx={{
                      display: "block",
                      width: { xs: 168, md: 190 },
                      height: "auto",
                    }}
                  />
                </Box>

                <Box
                  component="a"
                  href="https://web.grandrapids.org/AI-(Artificial-Intelligence)/Senna-Automation-11264"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "inline-flex",
                    width: "fit-content",
                    opacity: 0.84,
                    transition:
                      "opacity var(--dur-base) ease, transform var(--dur-base) ease",
                    "&:hover": {
                      opacity: 1,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src="/grchamber.png"
                    alt="Grand Rapids Chamber membership"
                    sx={{
                      display: "block",
                      width: { xs: 132, md: 150 },
                      height: "auto",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              pt: 3,
              borderTop: "8px solid var(--color-text-muted)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              color: "var(--color-text-muted)",
            }}
          >
            <Typography
              component="p"
              variant="body2"
              sx={{ color: "var(--color-text-muted)" }}
            >
              © {currentYear} Senna Automation LLC.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                alignItems: "center",
              }}
            >
              {legalLinks.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  sx={{
                    color: "var(--color-text-muted)",
                    textDecoration: "none",
                    fontSize: link.isPortal ? "0.75rem" : "0.875rem",
                    letterSpacing: link.isPortal ? "0.06em" : 0,
                    textTransform: link.isPortal ? "uppercase" : "none",
                    opacity: link.isPortal ? 0.72 : 1,
                    transition:
                      "color var(--dur-base) ease, opacity var(--dur-base) ease",
                    "&:hover": {
                      color: "var(--color-bg-subtle)",
                      opacity: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
