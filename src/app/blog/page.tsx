"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
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
    <Container maxWidth="lg" sx={{ py: 14 }}>
      <Stack spacing={3} sx={{ mb: 5 }}>
        <Typography variant="h2" component="h1">
          Senna Automation Blog
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 900 }}>
          Engineering notes, automation playbooks, and implementation lessons from
          real AI and software delivery work.
        </Typography>
        <Box>
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
        </Box>
      </Stack>

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
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </Link>
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
  );
}
