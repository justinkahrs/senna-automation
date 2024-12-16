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
              Streamline your workflow with powerful automation tools
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
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/privacy" color="text.secondary">
                Privacy Policy
              </Link>
              <Link href="/terms" color="text.secondary">
                Terms of Service
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
