import { Box, Container, Grid, Typography, Link } from "@mui/material";

const footerLinkGroups = [
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Senna Blog", href: "/blog" },
      { label: "Prompt Library", href: "/prompt-library" },
    ],
  },
  {
    heading: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: "auto",
        backgroundColor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Senna Automation LLC
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Grand Rapids, MI
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              (616) 287-3360
            </Typography>
          </Grid>
          {footerLinkGroups.map((group) => (
            <Grid item xs={12} sm={4} md={2} key={group.heading}>
              <Typography
                variant="overline"
                color="text.primary"
                sx={{ fontWeight: 700, letterSpacing: 1, display: "block", mb: 1 }}
              >
                {group.heading}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    color="text.secondary"
                    underline="hover"
                    sx={{ width: "fit-content" }}
                  >
                    <Typography variant="body2" color="inherit">
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            color: "text.secondary",
          }}
          suppressHydrationWarning
        >
          <Typography variant="body2" color="inherit">
            © {new Date().getFullYear()} Senna Automation LLC. All rights reserved.
          </Typography>
          <Typography variant="body2" color="inherit">
            |
          </Typography>
          <Link href="/privacy" color="inherit" underline="hover">
            <Typography variant="body2" color="inherit">
              Privacy Policy
            </Typography>
          </Link>
          <Typography variant="body2" color="inherit">
            |
          </Typography>
          <Link href="/terms" color="inherit" underline="hover">
            <Typography variant="body2" color="inherit">
              Terms of Service
            </Typography>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
