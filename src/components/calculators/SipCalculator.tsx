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

export default function SipCalculator() {
  const [investment, setInvestment] = React.useState(5000);
  const [rate, setRate] = React.useState(12);
  const [years, setYears] = React.useState(10);
  const [fv, setFv] = React.useState<number | null>(null);
  const [invested, setInvested] = React.useState<number | null>(null);

  const calculate = () => {
    const n = years * 12;
    const r = rate / 12 / 100;
    const future = investment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    setFv(future);
    setInvested(investment * n);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Monthly Investment"
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
          />
          <TextField
            label="Expected Annual Return (%)"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <TextField
            label="Duration (Years)"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {fv !== null && invested !== null && (
            <>
              <Typography variant="h6">Invested: ₹ {fmt(invested)}</Typography>
              <Typography variant="h6">Future Value: ₹ {fmt(fv)}</Typography>
              <Typography color="text.secondary">
                Estimated Gain: ₹ {fmt(fv - invested)}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
