"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { products } from "./products";
import ProductCard from "@/components/ProductCard";
import { CustomRequest } from "@/components/CustomRequest";

export default function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          AI Automation Templates
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, textAlign: isMobile ? "justify" : "center" }}
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
          <Grid container item xs={12} md={8} justifyContent="center">
            <Grid item xs={9} sx={{ display: "flex", mt: 12 }}>
              <CustomRequest />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}