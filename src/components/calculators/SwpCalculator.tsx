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

export default function SwpCalculator() {
  const [initial, setInitial] = React.useState(1000000);
  const [withdraw, setWithdraw] = React.useState(10000);
  const [rate, setRate] = React.useState(10);
  const [years, setYears] = React.useState(10);
  const [ending, setEnding] = React.useState<number | null>(null);

  const calculate = () => {
    const n = years * 12;
    const i = rate / 12 / 100;
    const fv =
      initial * Math.pow(1 + i, n) - withdraw * ((Math.pow(1 + i, n) - 1) / i);
    setEnding(fv);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Initial Corpus"
            type="number"
            value={initial}
            onChange={(e) => setInitial(Number(e.target.value))}
          />
          <TextField
            label="Monthly Withdrawal"
            type="number"
            value={withdraw}
            onChange={(e) => setWithdraw(Number(e.target.value))}
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
          {ending !== null && (
            <Typography variant="h6">
              Projected Ending Balance: ₹ {fmt(ending)}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
