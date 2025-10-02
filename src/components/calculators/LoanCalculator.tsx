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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";
// ✅ Grid v2 import (MUI v6+)
import Grid from "@mui/material/Grid2";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { fmt } from "@/lib/number";
import { calcEMI, compareWithBaseline, round2 } from "@/lib/emi";

export default function LoanCalculator() {
  // Core inputs
  const [principal, setPrincipal] = React.useState<number>(500000);
  const [rate, setRate] = React.useState<number>(10);
  const [tenureType, setTenureType] = React.useState<"months" | "years">(
    "years"
  );
  const [tenure, setTenure] = React.useState<number>(5);

  // Prepayments
  const [extraMonthly, setExtraMonthly] = React.useState<number>(0);
  const [lumpSum, setLumpSum] = React.useState<number>(0);
  const [lumpSumMonth, setLumpSumMonth] = React.useState<number>(0); // 0 = disabled

  const months = tenureType === "years" ? tenure * 12 : tenure;

  // Compute everything reactively
  const run = React.useMemo(() => {
    return compareWithBaseline(principal, rate, months, {
      extraMonthly,
      lumpSum,
      lumpSumMonth,
    });
  }, [principal, rate, months, extraMonthly, lumpSum, lumpSumMonth]);

  const result = run.withPrepay;

  // adornments
  const rupeeStart = {
    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
  };
  const percentEnd = {
    endAdornment: <InputAdornment position="end">%</InputAdornment>,
  };

  // Display helpers
  const effectiveMonths = result.monthsPaid;
  const years = Math.floor(effectiveMonths / 12);
  const remMonths = effectiveMonths % 12;

  return (
    <Card elevation={2} sx={{ width: "100%" }}>
      <CardHeader
        title="EMI Calculator"
        subheader="Compute EMI, prepayments, and full repayment schedule"
        action={
          <Tooltip title="EMI = Equated Monthly Installment. Prepayments reduce principal and shorten the tenure.">
            <IconButton>
              <InfoOutlined />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider />
      <CardContent>
        <Grid container spacing={3}>
          {/* LEFT: Inputs */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <TextField
                label="Loan Amount (Principal)"
                type="number"
                value={principal}
                onChange={(e) =>
                  setPrincipal(Math.max(0, Number(e.target.value)))
                }
                inputProps={{ min: 0, step: 1000 }}
                fullWidth
                InputProps={rupeeStart}
              />

              <TextField
                label="Interest Rate (% p.a.)"
                type="number"
                value={rate}
                onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                inputProps={{ min: 0, step: 0.05 }}
                fullWidth
                InputProps={percentEnd}
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
                onChange={(e) => setTenure(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1, step: 1 }}
                fullWidth
              />

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2">Prepayments</Typography>

              <TextField
                label="Extra Monthly Payment (Optional)"
                type="number"
                value={extraMonthly}
                onChange={(e) =>
                  setExtraMonthly(Math.max(0, Number(e.target.value)))
                }
                inputProps={{ min: 0, step: 500 }}
                fullWidth
                InputProps={rupeeStart}
                helperText="Added every month on top of EMI; goes directly to principal."
              />

              <Grid container spacing={1}>
                <Grid size={{ xs: 12, sm: 7 }}>
                  <TextField
                    label="One-time Prepayment (Optional)"
                    type="number"
                    value={lumpSum}
                    onChange={(e) =>
                      setLumpSum(Math.max(0, Number(e.target.value)))
                    }
                    inputProps={{ min: 0, step: 1000 }}
                    fullWidth
                    InputProps={rupeeStart}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <TextField
                    label="Prepayment Month"
                    type="number"
                    value={lumpSumMonth}
                    onChange={(e) =>
                      setLumpSumMonth(Math.max(0, Number(e.target.value)))
                    }
                    inputProps={{ min: 0, step: 1 }}
                    fullWidth
                    helperText="0 to disable"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>

          {/* RIGHT: Results */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">Results</Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard label="Standard EMI" value={`₹ ${fmt(result.emi)}`} />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard
                  label="Actual Tenure"
                  value={
                    effectiveMonths > 0
                      ? `${effectiveMonths} months ${
                          years ? `(${years}y ${remMonths}m)` : ""
                        }`
                      : "—"
                  }
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard
                  label="Total Interest (with prepay)"
                  value={`₹ ${fmt(result.totalInterest)}`}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <StatCard
                  label="Total Payment (with prepay)"
                  value={`₹ ${fmt(result.totalPayment)}`}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <CompareCard
                  baselineEmi={run.baselineEmi}
                  baselineTotalInterest={run.baselineTotalInterest}
                  baselineTotalPayment={run.baselineTotalPayment}
                  interestSaved={run.interestSaved}
                  paymentSaved={run.paymentSaved}
                  monthsSaved={run.monthsSaved}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* ✅ FULL-WIDTH CALCULATE BUTTON */}
          <Grid size={{ xs: 12 }}>
            <Button
              onClick={() => {
                /* values compute reactively; keep for UX parity */
              }}
              size="large"
              variant="contained"
              fullWidth
              sx={{ mt: { xs: 1, md: 0 } }}
            >
              CALCULATE
            </Button>
          </Grid>

          {/* ✅ FULL-WIDTH SCHEDULE BELOW */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Repayment Schedule
              </Typography>

              <TableContainer component={Paper} sx={{ maxHeight: 420 }}>
                <Table
                  stickyHeader
                  size="small"
                  aria-label="repayment schedule"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Month</TableCell>
                      <TableCell align="right">EMI</TableCell>
                      <TableCell align="right">Extra</TableCell>
                      <TableCell align="right">Lump Sum</TableCell>
                      <TableCell align="right">Interest</TableCell>
                      <TableCell align="right">Principal</TableCell>
                      <TableCell align="right">Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {result.schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell>{row.month}</TableCell>
                        <TableCell align="right">₹ {fmt(row.emi)}</TableCell>
                        <TableCell align="right">
                          ₹ {fmt(row.extraMonthly)}
                        </TableCell>
                        <TableCell align="right">
                          ₹ {fmt(row.lumpSum)}
                        </TableCell>
                        <TableCell align="right">
                          ₹ {fmt(row.interestPaid)}
                        </TableCell>
                        <TableCell align="right">
                          ₹ {fmt(row.principalPaid)}
                        </TableCell>
                        <TableCell align="right">
                          ₹ {fmt(row.balance)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {result.schedule.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          align="center"
                          sx={{ py: 4, color: "text.secondary" }}
                        >
                          No schedule to show. Check your inputs.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
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

function CompareCard(props: {
  baselineEmi: number;
  baselineTotalInterest: number;
  baselineTotalPayment: number;
  interestSaved: number;
  paymentSaved: number;
  monthsSaved: number;
}) {
  const {
    baselineEmi,
    baselineTotalInterest,
    baselineTotalPayment,
    interestSaved,
    paymentSaved,
    monthsSaved,
  } = props;

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Savings vs Baseline (no prepayments)
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard label="Baseline EMI" value={`₹ ${fmt(baselineEmi)}`} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Baseline Interest"
              value={`₹ ${fmt(baselineTotalInterest)}`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Interest Saved"
              value={`₹ ${fmt(Math.max(0, round2(interestSaved)))}`}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatCard
              label="Months Saved"
              value={`${Math.max(0, monthsSaved)}`}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Payment Saved:{" "}
            <b>₹ {fmt(Math.max(0, round2(paymentSaved)))}</b> (compared to
            baseline).&nbsp; Baseline Total Payment:{" "}
            <b>₹ {fmt(baselineTotalPayment)}</b>.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
