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

export default function RdCalculator() {
  const [monthly, setMonthly] = React.useState(5000);
  const [rate, setRate] = React.useState(7);
  const [months, setMonths] = React.useState(60);
  const [maturity, setMaturity] = React.useState<number | null>(null);

  const calculate = () => {
    const i = rate / 12 / 100;
    const fv = monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
    setMaturity(fv);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Monthly Deposit (₹)"
            type="number"
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value))}
          />
          <TextField
            label="Interest Rate (% p.a.)"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <TextField
            label="Months"
            type="number"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {maturity !== null && (
            <>
              <Typography variant="h6">
                Maturity Amount: ₹ {fmt(maturity)}
              </Typography>
              <Typography color="text.secondary">
                Total Deposit: ₹ {fmt(monthly * months)}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
