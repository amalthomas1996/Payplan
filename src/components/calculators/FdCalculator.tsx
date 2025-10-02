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

const FREQS = [
  { label: "Annual (1)", value: 1 },
  { label: "Semi-Annual (2)", value: 2 },
  { label: "Quarterly (4)", value: 4 },
  { label: "Monthly (12)", value: 12 },
];

export default function FdCalculator() {
  const [principal, setPrincipal] = React.useState(200000);
  const [rate, setRate] = React.useState(7);
  const [years, setYears] = React.useState(5);
  const [freq, setFreq] = React.useState(4);
  const [maturity, setMaturity] = React.useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    const fv = principal * Math.pow(1 + r / freq, freq * years);
    setMaturity(fv);
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
            label="Interest Rate (% p.a.)"
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
            label="Compounding"
            value={freq}
            onChange={(e) => setFreq(Number(e.target.value))}
          >
            {FREQS.map((f) => (
              <MenuItem key={f.value} value={f.value}>
                {f.label}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {maturity !== null && (
            <>
              <Typography variant="h6">
                Maturity Amount: ₹ {fmt(maturity)}
              </Typography>
              <Typography color="text.secondary">
                Interest Earned: ₹ {fmt(maturity - principal)}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
