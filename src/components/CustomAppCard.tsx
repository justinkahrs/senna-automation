"use client";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import type { SvgIconComponent } from "@mui/icons-material";

interface CustomApplication {
  title: string;
  description: string;
  icon: SvgIconComponent;
  features: string[];
  media: {
    src: string;
    alt: string;
  };
}

interface CustomAppCardProps {
  app: CustomApplication;
  index: number;
}

export default function CustomAppCard({ app, index }: CustomAppCardProps) {
  const Icon = app.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ width: "100%" }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
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
            src={app.media.src}
            alt={app.media.alt}
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
              {app.title}
            </Typography>
          </Box>
          <Typography variant="subtitle1" color="text.secondary" paragraph>
            {app.description}
          </Typography>
          <List>
            {app.features.map((feature) => (
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
          <Button
            variant="contained"
            fullWidth
            href="https://www.o11n.life/"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            Visit Project
          </Button>
        </CardActions>
      </Card>
    </motion.div>
  );
}
