import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";

const MotionBox = motion(Box);

const SlidingQuestionCard = styled(MotionBox)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.background.default,
}));

export default SlidingQuestionCard;