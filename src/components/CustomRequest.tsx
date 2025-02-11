import { Typography, Card, CardContent, CardActions } from "@mui/material";
import RequestFormButton from "@/components/RequestFormButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CustomRequest = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["0.8 1", "1 1"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const opacity = useTransform(scrollYProgress, [0.4, 1], [0.4, 1]);

  return (
    <motion.div ref={ref} style={{ width: "100%", y, opacity }}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            Custom Request
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Can&apos;t find the template you need? Request a custom solution
            tailored to your business.
          </Typography>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0, justifyContent: "center" }}>
          <RequestFormButton
            fullWidth
            text="Request Custom Solution"
            variant="contained"
          />
        </CardActions>
      </Card>
    </motion.div>
  );
};
