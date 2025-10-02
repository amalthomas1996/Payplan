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

export default function StepUpSipCalculator() {
  const [startSIP, setStartSIP] = React.useState(5000);
  const [stepPct, setStepPct] = React.useState(10); // yearly increase
  const [rate, setRate] = React.useState(12);
  const [years, setYears] = React.useState(10);
  const [fv, setFv] = React.useState<number | null>(null);

  const calculate = () => {
    const i = rate / 12 / 100;
    const months = years * 12;
    let m = startSIP;
    let total = 0;
    for (let k = 1; k <= months; k++) {
      // deposit at month k, grow for (months - k + 1) months
      total += m * Math.pow(1 + i, months - k + 1);
      // every 12th month, bump SIP
      if (k % 12 === 0) m *= 1 + stepPct / 100;
    }
    setFv(total);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Starting Monthly SIP"
            type="number"
            value={startSIP}
            onChange={(e) => setStartSIP(Number(e.target.value))}
          />
          <TextField
            label="Yearly Step-Up (%)"
            type="number"
            value={stepPct}
            onChange={(e) => setStepPct(Number(e.target.value))}
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
