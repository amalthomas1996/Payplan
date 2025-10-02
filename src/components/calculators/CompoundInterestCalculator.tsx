"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";
import { fmt } from "@/lib/number";

const FREQS = [1, 2, 4, 12];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState(100000);
  const [rate, setRate] = React.useState(10);
  const [years, setYears] = React.useState(10);
  const [freq, setFreq] = React.useState(12);
  const [fv, setFv] = React.useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    setFv(principal * Math.pow(1 + r / freq, freq * years));
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Principal (₹)"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
          <TextField
            label="Rate (% p.a.)"
            type="number"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <TextField
            label="Years"
            type="number"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <TextField
            select
            label="Compounding (times/year)"
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
          >
            {FREQS.map((f) => (
              <MenuItem key={f} value={f}>
                {f}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {fv !== null && (
            <>
              <Typography variant="h6">Future Value: ₹ {fmt(fv)}</Typography>
              <Typography color="text.secondary">
                Interest: ₹ {fmt(fv - principal)}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
