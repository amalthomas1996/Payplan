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

export default function LumpsumCalculator() {
  const [principal, setPrincipal] = React.useState(100000);
  const [rate, setRate] = React.useState(12);
  const [years, setYears] = React.useState(10);
  const [fv, setFv] = React.useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    setFv(principal * Math.pow(1 + r, years));
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
          />
          <TextField
            label="Expected Return (% p.a.)"
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
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {fv !== null && (
            <Typography variant="h6">Future Value: ₹ {fmt(fv)}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
