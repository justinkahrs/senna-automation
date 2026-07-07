import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { localSeoPages } from "./localSeoPages";

type LocalSeoClusterSectionProps = {
  title: string;
  description: string;
  excludeSlug?: string;
  sx?: SxProps<Theme>;
};

export default function LocalSeoClusterSection({
  title,
  description,
  excludeSlug,
  sx,
}: LocalSeoClusterSectionProps) {
  const pages = Object.values(localSeoPages).filter(
    (page) => page.slug !== excludeSlug,
  );

  return (
    <Box component="section" sx={sx}>
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Box sx={{ maxWidth: 760 }}>
            <Typography component="h2" variant="h2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              {description}
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {pages.map((page) => (
              <Grid key={page.slug} size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: { xs: 0, md: 1.5 },
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="overline"
                      sx={{ color: "text.secondary", display: "block", mb: 1 }}
                    >
                      {page.eyebrow}
                    </Typography>
                    <Typography component="h3" variant="h4" gutterBottom>
                      {page.serviceName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary", mb: 3 }}
                    >
                      {page.description}
                    </Typography>
                    <Link
                      href={`/${page.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          color: "text.primary",
                          fontWeight: 600,
                        }}
                      >
                        <Typography component="span" variant="body1">
                          Explore the page
                        </Typography>
                        <ArrowForwardIcon sx={{ fontSize: 18 }} />
                      </Box>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
