"use client";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { SvgIcon } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleCallButton from "@/components/ScheduleCallButton";

export interface Product {
  title: string;
  icon: typeof SvgIcon;
  description: string;
  features: string[];
  media: {
    src: string;
    alt: string;
    type: "image" | "gif";
  };
}

interface ProductCardProps {
  product: Product;
  direction?: "left" | "right";
}

export default function ProductCard({
  product,
  direction = "left",
}: ProductCardProps) {
  const Icon = product.icon;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0.8 1", "1 1"],
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const offset = isMobile ? 25 : 0;
  const initialX = direction === "right" ? offset : -offset;
  const x = useTransform(scrollYProgress, [0, 1], [initialX, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0.4, 1], [0.4, 1]);
  return (
    <motion.div ref={ref} style={{ width: "100%", x, y, opacity }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          "&:hover": {
            transform: "translateY(-4px)",
            transition: "all 0.3s ease-in-out",
            // boxShadow: 3,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "200px", md: "300px" },
            overflow: "hidden",
            bgcolor: "background.paper",
          }}
        >
          <Image
            src={product.media.src}
            alt={product.media.alt}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Icon sx={{ fontSize: 40, color: "primary.main", mr: 2 }} />
            <Typography variant="h4" component="h2">
              {product.title}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <List>
            {product.features.map((feature) => (
              <ListItem key={feature} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon color="primary" fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
          <ScheduleCallButton fullWidth text="Schedule Call" />
        </CardActions>
      </Card>
    </motion.div>
  );
}
