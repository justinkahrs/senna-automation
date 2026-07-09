import { Container } from "@mui/material";
import { createRfpPreviewInput } from "@/lib/rfp-proposal-renderer";
import { RfpPreviewStudio } from "@/components/portal/RfpPreviewStudio";

export default function RfpPreviewPageContent() {
  return (
    <Container maxWidth={false} sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 } }}>
      <RfpPreviewStudio initialInput={createRfpPreviewInput("balanced")} />
    </Container>
  );
}
