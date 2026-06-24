import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import FinalCTA from "@/components/sections/FinalCTA";
import { LOGO_URL, SITE_NAME, SITE_URL } from "@/utils/site";
import type { LocalSeoPageConfig } from "./localSeoPages";

const homeEyebrowSx = {
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  px: 1.75,
  py: 0.5,
  border: "1px solid",
  borderColor: "var(--color-border-medium)",
  borderRadius: "var(--radius-pill)",
  bgcolor: "color-mix(in srgb, var(--color-accent-cyan), transparent 84%)",
  color: "var(--color-text-secondary)",
  letterSpacing: "0.12em",
};

function buildJsonLd(page: LocalSeoPageConfig) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  const areaServed = [
    { "@type": "City", name: "Grand Rapids" },
    { "@type": "AdministrativeArea", name: "West Michigan" },
    ...page.nearbyCities.map((city) => ({ "@type": "City", name: city })),
  ];

  return {
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: page.serviceName,
      serviceType: page.serviceType,
      description: page.description,
      url: pageUrl,
      provider: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "500",
        description: "Focused automation engagements start at $500.",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/pricing`,
      },
      keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    },
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${pageUrl}#local-service`,
      name: `${page.serviceName} | ${SITE_NAME}`,
      url: pageUrl,
      image: LOGO_URL,
      telephone: "+1-616-287-3360",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Grand Rapids",
        addressRegion: "MI",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "42.9634",
        longitude: "-85.6681",
      },
      parentOrganization: {
        "@id": `${SITE_URL}/#organization`,
      },
      areaServed,
      makesOffer: {
        "@id": `${pageUrl}#service`,
      },
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.serviceName,
          item: pageUrl,
        },
      ],
    },
  };
}

export default function LocalSeoPage({ page }: { page: LocalSeoPageConfig }) {
  const jsonLd = buildJsonLd(page);

  return (
    <Box sx={{ bgcolor: "transparent", minHeight: "100vh" }}>
      <script
        id={`${page.slug}-service-structured-data`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.service) }}
      />
      <script
        id={`${page.slug}-local-business-structured-data`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.localBusiness),
        }}
      />
      <script
        id={`${page.slug}-faq-structured-data`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd.faq) }}
      />
      <script
        id={`${page.slug}-breadcrumb-structured-data`}
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd.breadcrumb),
        }}
      />
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 16, md: 28 },
          pb: { xs: 10, md: 16 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/dark-matter.png")',
            pointerEvents: "none",
          }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={{ xs: 6, md: 8 }} sx={{
            alignItems: "center"
          }}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                <Typography variant="overline" sx={homeEyebrowSx}>
                  {page.eyebrow}
                </Typography>
                <Typography
                  component="h1"
                  variant="h1"
                  sx={{
                    color: "inherit",
                    maxWidth: 900
                  }}>
                  {page.h1}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "var(--color-text-on-dark)",
                    maxWidth: 780,
                  }}
                >
                  {page.lead}
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ pt: 1 }}
                >
                  <Button
                    href="/contact"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Start Your Free Assessment
                  </Button>
                  <Button
                    href="/pricing"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "var(--color-accent-cyan)",
                      color: "var(--color-accent-cyan)",
                      "&:hover": {
                        borderColor: "var(--color-bg-subtle)",
                        color: "var(--color-bg-subtle)",
                      },
                    }}
                  >
                    Pricing Starts at $500
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack
                spacing={2}
                sx={{
                  borderLeft: { md: "8px solid var(--color-accent-cyan)" },
                  pl: { md: 4 },
                }}
              >
                {[
                  "Grand Rapids based",
                  "West Michigan coverage",
                  "Workflow-first implementation",
                ].map((item) => (
                  <Stack
                    key={item}
                    direction="row"
                    spacing={1.5}
                    sx={{
                      alignItems: "center"
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{ color: "var(--color-accent-cyan)" }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: "var(--color-text-on-dark)" }}
                    >
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="section" sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={3}>
                <Typography component="h2" variant="h2">
                  {page.introTitle}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 720
                  }}>
                  {page.introBody}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  p: { xs: 4, md: 5 },
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{
                  alignItems: "center"
                }}>
                  <AutoFixHighIcon color="primary" />
                  <Typography component="h2" variant="h4">
                    {page.assessmentTitle}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 3, borderBottomWidth: 8 }} />
                <Typography variant="body1" sx={{
                  color: "text.secondary"
                }}>
                  {page.assessmentBody}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 15 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box sx={{ maxWidth: 760 }}>
              <Typography component="h2" variant="h2" gutterBottom>
                What Senna Automation can build first
              </Typography>
              <Typography variant="body1" sx={{
                color: "text.secondary"
              }}>
                The fastest first project is usually a workflow your team
                already repeats every week.
              </Typography>
            </Box>
            <Grid container spacing={3} sx={{
              alignItems: "stretch"
            }}>
              {page.useCases.map((useCase) => (
                <Grid
                  key={useCase.title}
                  size={{ xs: 12, md: 4 }}>
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
                      <Typography component="h3" variant="h4" gutterBottom>
                        {useCase.title}
                      </Typography>
                      <Typography variant="body1" sx={{
                        color: "text.secondary"
                      }}>
                        {useCase.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
      <Box component="section" sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography component="h2" variant="h2" gutterBottom>
                Built for West Michigan operators
              </Typography>
              <Typography variant="body1" sx={{
                color: "text.secondary"
              }}>
                Senna focuses on practical automation for teams where work
                moves through people, tools, documents, and customer requests.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                {page.industries.map((industry) => (
                  <Grid
                    key={industry.name}
                    size={{ xs: 12, sm: 6 }}>
                    <Stack
                      spacing={1.5}
                      sx={{
                        height: "100%",
                        p: 3,
                        borderTop: "8px solid var(--color-accent-cyan)",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography component="h3" variant="h4">
                        {industry.name}
                      </Typography>
                      <Typography variant="body2" sx={{
                        color: "text.secondary"
                      }}>
                        {industry.description}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 15 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography component="h2" variant="h2" gutterBottom>
                A simple path from audit to launch
              </Typography>
              <Typography variant="body1" sx={{
                color: "text.secondary"
              }}>
                The work stays scoped around a real operational outcome, not an
                abstract AI roadmap.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Stack spacing={4}>
                {page.process.map((step, index) => (
                  <Stack
                    key={step.title}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={3}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: "primary.main",
                        minWidth: 72
                      }}>
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Box>
                      <Typography component="h3" variant="h4" gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography variant="body1" sx={{
                        color: "text.secondary"
                      }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="section" sx={{ py: { xs: 10, md: 15 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Typography component="h2" variant="h2" gutterBottom>
                Serving Grand Rapids and nearby cities
              </Typography>
              <Typography variant="body1" sx={{
                color: "text.secondary"
              }}>
                We work with businesses across the Grand Rapids metro and West
                Michigan.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Grid container spacing={2}>
                {page.nearbyCities.map((city) => (
                  <Grid
                    key={city}
                    size={{ xs: 6, sm: 4 }}>
                    <Stack direction="row" spacing={1} sx={{
                      alignItems: "center"
                    }}>
                      <LocationOnIcon fontSize="small" color="primary" />
                      <Typography variant="body1">{city}</Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{
          py: { xs: 10, md: 15 },
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Typography component="h2" variant="h2" gutterBottom>
            Frequently asked questions
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {page.faqs.map((faq) => (
              <Grid
                key={faq.question}
                size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 4 },
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography component="h3" variant="h4" gutterBottom>
                    {faq.question}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: "text.secondary"
                  }}>
                    {faq.answer}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <FinalCTA
        title="Ready to find the first workflow worth automating?"
        subtitle="Book a free assessment. We will map one process, identify the fastest practical win, and show you what it would take to launch."
        buttonText="Start Your Free Assessment"
      />
    </Box>
  );
}
