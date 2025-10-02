"use client";

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";
// ✅ Grid v2 import (stable in MUI v6+)
import Grid from "@mui/material/Grid2";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { fmt } from "@/lib/number";

function calcEMI(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (r === 0) {
    const emi = principal / months;
    return { emi, totalInterest: 0, totalPayment: principal };
  }
  const emi =
    (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalInterest, totalPayment };
}

export default function LoanCalculator() {
  const [principal, setPrincipal] = React.useState<number>(500000);
  const [rate, setRate] = React.useState<number>(10);
  const [tenureType, setTenureType] = React.useState<"months" | "years">(
    "years"
  );
  const [tenure, setTenure] = React.useState<number>(5);

  const months = tenureType === "years" ? tenure * 12 : tenure;

  const [result, setResult] = React.useState(() => calcEMI(500000, 10, 60));
  const onCalculate = () => setResult(calcEMI(principal, rate, months));

  React.useEffect(() => {
    onCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [principal, rate, tenure, tenureType]);

  return (
    <Card elevation={2} sx={{ width: "100%" }}>
      <CardHeader
        title="EMI Calculator"
        subheader="Compute monthly EMI, total interest, and total payable"
        action={
          <Tooltip title="EMI = Equated Monthly Installment">
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {/* Inputs */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <TextField
                label="Loan Amount (Principal)"
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                inputProps={{ min: 0, step: 1000 }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Interest Rate (% p.a.)"
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                inputProps={{ min: 0, step: 0.1 }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />

              <Box>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Tenure Type
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={tenureType}
                  onChange={(_, v) => v && setTenureType(v)}
                  size="small"
                >
                  <ToggleButton value="months">Months</ToggleButton>
                  <ToggleButton value="years">Years</ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <TextField
                label={`Tenure (${tenureType})`}
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                inputProps={{ min: 1, step: 1 }}
                fullWidth
              />

              <Button
                onClick={onCalculate}
                size="large"
                variant="contained"
                fullWidth
              >
                Calculate
              </Button>
            </Stack>
          </Grid>

          {/* Results */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">Results</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard label="Monthly EMI" value={`₹ ${fmt(result.emi)}`} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard
                  label="Total Interest"
                  value={`₹ ${fmt(result.totalInterest)}`}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard
                  label="Total Payment"
                  value={`₹ ${fmt(result.totalPayment)}`}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard label="Tenure (months)" value={`${months}`} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", borderRadius: 2 }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0.5,
          minHeight: 92,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h6" sx={{ wordBreak: "break-word" }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
