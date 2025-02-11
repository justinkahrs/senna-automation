import { Box, Container, Grid, Typography, Link } from "@mui/material";

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
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Senna Automation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Let&apos;s integrate AI and automate your business.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: "none" }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/docs" color="text.secondary">
                Documentation
              </Link>
              <Link href="/blog" color="text.secondary">
                Blog
              </Link>
              <Link href="/support" color="text.secondary">
                Support
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                gap: 1,
              }}
            >
              <Link href="/privacy" color="text.secondary">
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Privacy Policy
                </Typography>
              </Link>
              <Link href="/terms" color="text.secondary">
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Terms of Service
                </Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 4 }}
        >
          © {new Date().getFullYear()} Senna Automation. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
