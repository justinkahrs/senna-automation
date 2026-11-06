"use client";

import { useRef, useState } from "react";
import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@/components/icons/material/ArrowForward.mjs";
import Link from "@/compat/next/link";

type Testimonial = {
  quote: string;
  name: string;
  source?: string;
  reviewUrl?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "He then created a customized solution that made the website easier to manage, simplified the process of making updates, and saved us a tremendous amount of time.",
    name: "One More Moment",
    source: "Customer review on BBB",
    reviewUrl:
      "https://www.bbb.org/us/mi/grand-rapids/profile/artificial-intelligence/senna-automation-0372-90070205/customer-reviews",
  },
  {
    quote:
      "Justin has done so much work for us. And he's doing an amazing job.",
    name: "Nonprofit Leader",
  },
  {
    quote:
      "I think it looks great. I think it is really well structured.",
    name: "IT Manager",
    source: "Feedback on Justin's work",
  },
  {
    quote: "You're a joy to work with professionally.",
    name: "Software Developer",
    source: "Industrial Automation Company",
  },
  {
    quote:
      "I think the work that you guys did, this is like night and day visually amazing.",
    name: "Project Coordinator",
    source: "Industrial Automation Company",
  },
  {
    quote:
      "And I respect the fact that you guys are trying to do it as efficiently as possible.",
    name: "CEO",
    source: "Industrial Automation Company",
  },
  {
    quote:
      "And I think this is exactly what we were tracking for.",
    name: "COO",
    source: "Industrial Automation Company",
  },
];

export default function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(index, testimonials.length - 1));
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <Box
      component="section"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
      sx={{ bgcolor: "background.paper", py: { xs: 8, md: 10 } }}
    >
      <Box sx={{ width: "100%", maxWidth: 960, boxSizing: "border-box", mx: "auto", px: { xs: 3, sm: 4 } }}>
        <Typography id="testimonials-heading" variant="h2" component="h2" align="center" sx={{ mb: { xs: 4, md: 5 } }}>
          Don&apos;t take our word for it...
        </Typography>
        <Box
          ref={trackRef}
          id="testimonial-slides"
          tabIndex={0}
          aria-label="Testimonial slides"
          onScroll={() => {
            const track = trackRef.current;
            if (track && track.clientWidth) {
              setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
            }
          }}
          onKeyDown={(event) => {
            if (event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              goTo(activeIndex + (event.key === "ArrowRight" ? 1 : -1));
            }
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              goTo(event.key === "Home" ? 0 : testimonials.length - 1);
            }
          }}
          sx={{
            display: "grid",
            gridAutoFlow: "column",
            gridAutoColumns: "100%",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            overscrollBehaviorX: "contain",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            "&:focus-visible": { outline: "2px solid var(--color-text-accent)", outlineOffset: 4 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${testimonials.length}`}
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex}
              sx={{
                scrollSnapAlign: "start",
                scrollSnapStop: "always",
                minWidth: 0,
                bgcolor: "background.default",
                backgroundImage: "none",
                boxShadow: "none",
                border: "1px solid var(--color-border-neutral-light)",
                borderRadius: { xs: 0, md: 1.5 },
                "&:hover": { transform: "none", boxShadow: "none", borderColor: "var(--color-border-neutral-light)" },
              }}
            >
              <CardContent sx={{
                p: { xs: 3, sm: 4, md: 5 },
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 4,
                "&:last-child": { pb: { xs: 3, sm: 4, md: 5 } },
              }}>
                <Box>
                  <Typography aria-hidden="true" component="div" sx={{ color: "var(--color-text-accent)", fontFamily: '\"Cormorant Garamond\", serif', fontSize: "3rem", lineHeight: 0.8, mb: 2 }}>
                    &ldquo;
                  </Typography>
                  <Typography variant="h4" component="blockquote" cite={testimonial.reviewUrl} sx={{ m: 0, color: "text.primary", fontWeight: 400, fontStyle: "italic", lineHeight: 1.4 }}>
                    {testimonial.reviewUrl ? (
                      <Link href={testimonial.reviewUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textUnderlineOffset: "0.2em" }}>
                        {testimonial.quote}
                      </Link>
                    ) : testimonial.quote}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {testimonial.name}
                  </Typography>
                  {testimonial.source && <Typography variant="caption" sx={{ color: "text.secondary" }}>{testimonial.source}</Typography>}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: "center", justifyContent: "center" }}>
          <IconButton aria-label="Previous testimonial" aria-controls="testimonial-slides" disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)} sx={{ minWidth: 44, minHeight: 44 }}>
            <ArrowForwardIcon sx={{ transform: "rotate(180deg)" }} />
          </IconButton>
          <Typography role="status" aria-live="polite" aria-atomic="true" variant="body2" sx={{ minWidth: 56, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
            <Box component="span" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>Testimonial </Box>
            {activeIndex + 1} / {testimonials.length}
          </Typography>
          <IconButton aria-label="Next testimonial" aria-controls="testimonial-slides" disabled={activeIndex === testimonials.length - 1} onClick={() => goTo(activeIndex + 1)} sx={{ minWidth: 44, minHeight: 44 }}>
            <ArrowForwardIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
}
