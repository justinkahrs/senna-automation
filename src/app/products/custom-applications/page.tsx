import { Box, Container, Typography, Grid } from "@mui/material";
import { customApplications } from "./applications";
import CustomAppDiscoveryForm from "@/components/forms/CustomAppDiscoveryForm";
import CustomAppCard from "@/components/CustomAppCard";

export default function CustomApplications() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Custom Applications
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: { xs: "justify", sm: "center" } }}
        >
          Tailor-made software solutions designed to meet your specific business
          needs.
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          align="center"
          fontWeight="bold"
          color="text.primary"
          sx={{ mb: 4 }}
        >
          Past Projects
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {customApplications.map((app, index) => (
            <Grid item xs={12} md={8} key={app.title} sx={{ display: "flex" }}>
              <CustomAppCard app={app} index={index} />
            </Grid>
          ))}
        </Grid>

        <CustomAppDiscoveryForm />
      </Container>
    </Box>
  );
}
