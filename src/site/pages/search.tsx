import Link from "@/compat/next/link";
import type { RouteMetadata } from "@/utils/metadata";
import type { SearchResult } from "@/utils/search";
import { SITE_URL } from "@/utils/site";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const metadata: RouteMetadata = {
  title: "Search | Senna Automation",
  description:
    "Search Senna Automation pages, local service content, and blog posts for workflow systems, AI consulting, and operations improvements.",
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
};

const suggestedSearches = [
  "lead follow-up",
  "inventory",
  "quoting",
  "Grand Rapids AI consulting",
  "workflow systems",
];

const searchActionAttributes = {
  toolname: "site_search",
  tooldescription:
    "Search Senna Automation pages, local service content, and blog posts by keyword.",
} as const;

export default function SearchPage({
  query,
  results,
}: {
  query: string;
  results: SearchResult[];
}) {
  const hasQuery = query.trim().length > 0;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Box
        component="section"
        sx={{
          bgcolor: "secondary.main",
          color: "background.paper",
          pt: { xs: 16, md: 28 },
          pb: { xs: 8, md: 10 },
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
          <Stack spacing={3} sx={{ maxWidth: 760 }}>
            <Typography
              variant="overline"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",
                px: 1.75,
                py: 0.5,
                border: "1px solid",
                borderColor: "var(--color-border-medium)",
                borderRadius: "var(--radius-pill)",
                bgcolor:
                  "color-mix(in srgb, var(--color-accent-cyan), transparent 84%)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.12em",
              }}
            >
              Search
            </Typography>
            <Typography component="h1" variant="h1" sx={{ color: "inherit" }}>
              Search pages, guides, and local service content
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "var(--color-text-on-dark)",
                maxWidth: 680,
              }}
            >
              Find service pages, location pages, and blog posts about workflow
              systems, operations handoffs, and AI consulting.
            </Typography>
            <Box
              component="form"
              action="/search"
              method="get"
              role="search"
              aria-label="Search the Senna Automation website"
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                flexDirection: { xs: "column", sm: "row" },
                maxWidth: 760,
              }}
            >
              <TextField
                fullWidth
                id="site-search-query"
                name="q"
                label="Search the site"
                placeholder="Try: lead follow-up, quoting, inventory, Grand Rapids AI consulting"
                defaultValue={query}
                autoComplete="off"
                helperText="Use keywords from your process, industry, or bottleneck."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "background.paper",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "var(--color-text-on-dark-body)",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                {...searchActionAttributes}
                sx={{
                  minWidth: { sm: 160 },
                  mt: { sm: 0.5 },
                }}
              >
                Search
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box>
              <Typography variant="h2" component="h2" sx={{ mb: 1.5 }}>
                {hasQuery
                  ? `${results.length} result${results.length === 1 ? "" : "s"} for “${query}”`
                  : "Start with a common search"}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {hasQuery
                  ? "Results include service pages, location pages, and published blog posts."
                  : "Search by process, business problem, industry, or service area."}
              </Typography>
            </Box>

            {!hasQuery ? (
              <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                {suggestedSearches.map((term) => (
                  <Chip
                    key={term}
                    component="a"
                    clickable
                    href={`/search?q=${encodeURIComponent(term)}`}
                    label={term}
                    sx={{
                      color: "text.primary",
                      borderColor: "divider",
                    }}
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : null}

            <Stack spacing={2.5}>
              {results.map((result) => (
                <Card
                  key={result.url}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={1.5}>
                      <Chip
                        label={result.type}
                        size="small"
                        sx={{ width: "fit-content" }}
                        variant="outlined"
                      />
                      <Typography variant="h4" component="h3">
                        <Box
                          component={Link}
                          href={result.url.replace(SITE_URL, "") || "/"}
                          sx={{
                            color: "inherit",
                            textDecoration: "none",
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          {result.title}
                        </Box>
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary" }}>
                        {result.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "text.secondary",
                          wordBreak: "break-all",
                        }}
                      >
                        {result.url}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}

              {hasQuery && results.length === 0 ? (
                <Card
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "none",
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack spacing={2}>
                      <Typography variant="h4" component="h3">
                        No direct matches yet
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary" }}>
                        Try a broader process term like “lead follow-up,”
                        “quoting,” “inventory,” or “Grand Rapids AI consulting.”
                      </Typography>
                      <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                        {suggestedSearches.map((term) => (
                          <Chip
                            key={term}
                            component="a"
                            clickable
                            href={`/search?q=${encodeURIComponent(term)}`}
                            label={term}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
