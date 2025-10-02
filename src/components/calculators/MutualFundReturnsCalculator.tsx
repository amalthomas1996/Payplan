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

export default function MutualFundReturnsCalculator() {
  const [invested, setInvested] = React.useState(500000);
  const [current, setCurrent] = React.useState(800000);
  const [years, setYears] = React.useState(5);
  const [cagr, setCagr] = React.useState<number | null>(null);

  const calculate = () => {
    if (invested <= 0 || years <= 0) return setCagr(null);
    const val = Math.pow(current / invested, 1 / years) - 1;
    setCagr(val * 100);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Total Invested (₹)"
            type="number"
            value={invested}
            onChange={(e) => setInvested(Number(e.target.value))}
          />
          <TextField
            label="Current Value (₹)"
            type="number"
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
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
          {cagr !== null && (
            <Typography variant="h6">CAGR: {cagr.toFixed(2)}%</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
