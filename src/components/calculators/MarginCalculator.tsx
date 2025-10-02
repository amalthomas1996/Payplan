"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { fmt } from "@/lib/number";

export default function MarginCalculator() {
  const [mode, setMode] = React.useState<"required" | "power">("required");
  // required-margin mode
  const [tradeValue, setTradeValue] = React.useState(100000);
  const [marginPct, setMarginPct] = React.useState(20);
  const [required, setRequired] = React.useState<number | null>(null);
  // power mode
  const [funds, setFunds] = React.useState(50000);
  const [leverage, setLeverage] = React.useState(5);
  const [power, setPower] = React.useState<number | null>(null);

  const calculate = () => {
    if (mode === "required") {
      setRequired((marginPct / 100) * tradeValue);
    } else {
      setPower(funds * leverage);
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Margin Calculator</Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, v) => v && setMode(v)}
            size="small"
          >
            <ToggleButton value="required">Required Margin</ToggleButton>
            <ToggleButton value="power">Buying Power</ToggleButton>
          </ToggleButtonGroup>

          {mode === "required" ? (
            <>
              <TextField
                label="Trade Value (₹)"
                type="number"
                value={tradeValue}
                onChange={(e) => setTradeValue(Number(e.target.value))}
              />
              <TextField
                label="Margin % Required"
                type="number"
                value={marginPct}
                onChange={(e) => setMarginPct(Number(e.target.value))}
              />
            </>
          ) : (
            <>
              <TextField
                label="Available Funds (₹)"
                type="number"
                value={funds}
                onChange={(e) => setFunds(Number(e.target.value))}
              />
              <TextField
                label="Leverage Multiple"
                type="number"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
              />
            </>
          )}

          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>

          {mode === "required" && required !== null && (
            <Typography variant="h6">
              Required Margin: ₹ {fmt(required)}
            </Typography>
          )}
          {mode === "power" && power !== null && (
            <Typography variant="h6">Buying Power: ₹ {fmt(power)}</Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
