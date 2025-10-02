"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { fmt } from "@/lib/number";

export default function PpfCalculator() {
  const [annualDeposit, setAnnualDeposit] = React.useState(150000);
  const [rate, setRate] = React.useState(7.1); // current approx
  const [years, setYears] = React.useState(15);
  const [fv, setFv] = React.useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    // assume deposit at start of each year (annuity due)
    const val = annualDeposit * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
    setFv(val);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Annual Deposit (₹)"
            type="number"
            value={annualDeposit}
            onChange={(e) => setAnnualDeposit(Number(e.target.value))}
          />
          <TextField
            label="Interest Rate (% p.a.)"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <TextField
            label="Years (max 15)"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {fv !== null && (
            <Typography variant="h6">Maturity Value: ₹ {fmt(fv)}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
