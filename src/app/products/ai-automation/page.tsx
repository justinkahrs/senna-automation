import { Box, Container, Typography, Grid } from "@mui/material";
import { products } from "../products";
import ProductCard from "@/components/ProductCard";
import AIAutomationReviewForm from "@/components/forms/AIAutomationReviewForm";

export default function AIAutomationProducts() {
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
          AI Automation Templates
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: { xs: "justify", sm: "center" } }}
        >
          Powerful automation tools needing minimal customization to get up and
          running in your business.
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          {products.map((product, index) => (
            <Grid
              item
              xs={12}
              md={8}
              key={product.title}
              sx={{ display: "flex" }}
            >
              <ProductCard
                product={product}
                direction={index % 2 === 0 ? "left" : "right"}
              />
            </Grid>
          ))}
        </Grid>

        <AIAutomationReviewForm />
      </Container>
    </Box>
  );
}
