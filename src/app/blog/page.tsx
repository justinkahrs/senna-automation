"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

type BlogItem = {
  title: string;
  link: string;
  description: string;
  pubDate: Date | null;
};

export default function BlogPage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        const res = await fetch("/api/rss", { cache: "no-store" });
        const xml = await res.text();
        const doc = new DOMParser().parseFromString(xml, "application/xml");

        const parsed: BlogItem[] = Array.from(doc.querySelectorAll("item")).map(
          (item) => {
            const title = item.querySelector("title")?.textContent?.trim() || "";
            const link = item.querySelector("link")?.textContent?.trim() || "";
            const description =
              item.querySelector("description")?.textContent?.trim() || "";
            const pubDateRaw =
              item.querySelector("pubDate")?.textContent?.trim() || "";

            return {
              title,
              link,
              description,
              pubDate: pubDateRaw ? new Date(pubDateRaw) : null,
            };
          }
        );

        parsed.sort((a, b) => {
          const at = a.pubDate ? a.pubDate.getTime() : 0;
          const bt = b.pubDate ? b.pubDate.getTime() : 0;
          return bt - at;
        });

        setItems(parsed);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  const previewItems = useMemo(() => items.slice(0, 6), [items]);

  return (
    <>
      <Box
        component="section"
        aria-labelledby="blog-hero-heading"
        sx={{
          bgcolor: "background.default",
          minHeight: { xs: "50vh", md: "60vh" },
          display: "flex",
          alignItems: "center",
          py: { xs: 10, md: 14 },
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems={{ xs: "flex-start", md: "center" }}>
            <Chip label="SENNA AUTOMATION BLOG" color="primary" />
            <Typography
              id="blog-hero-heading"
              variant="h2"
              component="h1"
              sx={{ maxWidth: 980, textAlign: { xs: "left", md: "center" } }}
            >
              Insights on AI Automation, Product Engineering, and Systems That Ship
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 900,
                textAlign: { xs: "left", md: "center" },
              }}
            >
              Practical write-ups from real implementation work: architecture notes,
              automation playbooks, and lessons learned building custom AI-enabled
              software for growing businesses.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                color="primary"
                component="a"
                href="https://blog.senna-automation.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Full Blog
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component="a"
                href="https://blog.senna-automation.com/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                RSS Feed
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box component="section" sx={{ bgcolor: "#ffffff", py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
            Latest Posts
          </Typography>

          {loading ? (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : previewItems.length === 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Blog feed unavailable right now
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  The feed at blog.senna-automation.com may not be live yet.
                </Typography>
                <Button
                  variant="outlined"
                  component="a"
                  href="https://blog.senna-automation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Blog
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Stack spacing={2}>
              {previewItems.map((item) => (
                <Card key={item.link} variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                      </a>
                    </Typography>
                    {item.pubDate && (
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.pubDate.toLocaleDateString()}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography color="text.secondary">{item.description}</Typography>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </Box>
    </>
  );
}
