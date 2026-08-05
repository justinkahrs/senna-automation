import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { ACCENT } from "@/components/theme/colors";
import type { RoiModel, RoiScenario } from "@/types/blog";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const number = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

function money(value: number) {
  return value < 0 ? `–${currency.format(Math.abs(value))}` : currency.format(value);
}

function ScenarioCard({ scenario }: { scenario: RoiScenario }) {
  const isBase = scenario.name === "base";
  const assumptions = [
    ["Customer handoffs / month", number.format(scenario.transactions_per_month)],
    ["Minutes removed / handoff", number.format(scenario.minutes_saved_per_transaction)],
    ["Loaded labor rate", `${money(scenario.loaded_labor_rate)} / hr`],
    ["Current rework cost / month", money(scenario.baseline_monthly_error_rework_cost)],
    ["Assumed rework reduction", `${number.format(scenario.error_rework_reduction_rate * 100)}%`],
    ["One-time implementation", money(scenario.implementation_cost)],
    ["Ongoing upkeep / month", money(scenario.monthly_maintenance)],
  ];

  return (
    <Box
      sx={{
        height: "100%",
        p: { xs: 3, sm: 3.5 },
        border: "1px solid",
        borderColor: isBase ? ACCENT : "divider",
        borderRadius: 3,
        bgcolor: isBase ? alpha(ACCENT, 0.045) : "background.paper",
        boxShadow: isBase ? "var(--shadow-blog-article)" : "none",
      }}
    >
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography component="h3" variant="h5" sx={{ textTransform: "capitalize" }}>
            {scenario.name}
          </Typography>
          {isBase ? <Chip label="Planning case" size="small" color="primary" /> : null}
        </Stack>

        <Stack spacing={1.25}>
          {assumptions.map(([label, value]) => (
            <Stack
              key={label}
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="baseline"
              sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 1.1 }}
            >
              <Typography variant="body2" sx={{ color: "text.secondary", minWidth: 0 }}>
                {label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, textAlign: "right", fontVariantNumeric: "tabular-nums" }}
              >
                {value}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box
          sx={{
            p: 2.25,
            borderRadius: 2,
            bgcolor: isBase ? alpha(ACCENT, 0.08) : "var(--color-bg-accent-faint)",
          }}
        >
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            Estimated gross benefit / month
          </Typography>
          <Typography variant="h4" sx={{ mt: 0.5, fontVariantNumeric: "tabular-nums" }}>
            {money(scenario.monthly_benefit)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            {money(scenario.monthly_labor_savings)} labor + {money(scenario.monthly_error_savings)} rework
          </Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              First-year net
            </Typography>
            <Typography sx={{ mt: 0.4, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              {money(scenario.first_year_net)}
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
              Payback
            </Typography>
            <Typography sx={{ mt: 0.4, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              {number.format(scenario.payback_months)} months
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export function RoiSensitivity({ model }: { model: RoiModel }) {
  return (
    <Box component="section" aria-label="Illustrative return on investment scenarios" sx={{ my: 7 }}>
      <Grid container spacing={2.5}>
        {model.scenarios.map((scenario) => (
          <Grid key={scenario.name} size={{ xs: 12, md: 4 }}>
            <ScenarioCard scenario={scenario} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="caption" sx={{ display: "block", mt: 2.5, color: "text.secondary", lineHeight: 1.6 }}>
        Illustrative planning estimates, not client results or a performance guarantee. First-year net subtracts implementation and twelve months of upkeep. Payback uses monthly benefit after upkeep.
      </Typography>
    </Box>
  );
}
