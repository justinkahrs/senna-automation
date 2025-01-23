import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleCallButton from "@/components/ScheduleCallButton";

const pricingTiers = [
  {
    title: "Starter",
    price: "$29",
    description: "Perfect for small businesses",
    features: [
      "5 automation workflows",
      "Basic analytics",
      "Email support",
      "API access",
    ],
    buttonText: "Schedule Call",
    buttonVariant: "outlined" as const,
  },
  {
    title: "Professional",
    price: "$99",
    description: "Ideal for growing companies",
    features: [
      "Unlimited workflows",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    buttonText: "Schedule Call",
    buttonVariant: "contained" as const,
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited everything",
      "Dedicated support",
      "Custom development",
      "SLA guarantee",
      "Advanced security",
    ],
    buttonText: "Schedule Call",
    buttonVariant: "outlined" as const,
  },
];

export default function Pricing() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: { xs: "calc(100vh - 64px)", md: "calc(100vh - 64px)" },
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing Plans
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
          sx={{ mb: 6 }}
        >
          Choose the perfect plan for your business needs
        </Typography>

        <Grid container spacing={4} alignItems="flex-start">
          {pricingTiers.map((tier) => (
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: 1,
                  borderColor: "divider",
                  "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-4px)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    component="h2"
                    align="center"
                  >
                    {tier.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    align="center"
                    sx={{ mb: 2 }}
                  >
                    {tier.price}
                    {tier.price !== "Custom" && (
                      <Typography component="span" variant="subtitle1">
                        /month
                      </Typography>
                    )}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {tier.description}
                  </Typography>
                  <List>
                    {tier.features.map((feature) => (
                      <ListItem key={feature} sx={{ py: 1 }}>
                        <CheckCircleIcon
                          sx={{ mr: 1, color: "primary.main" }}
                        />
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <ScheduleCallButton
                    fullWidth
                    variant={tier.buttonVariant}
                    size="large"
                    text={tier.buttonText}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
