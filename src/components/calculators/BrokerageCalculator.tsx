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

export default function BrokerageCalculator() {
  const [buyPrice, setBuyPrice] = React.useState(100);
  const [sellPrice, setSellPrice] = React.useState(105);
  const [qty, setQty] = React.useState(100);
  // percent inputs (per side where applicable)
  const [brokeragePct, setBrokeragePct] = React.useState(0.03); // %
  const [txnPct, setTxnPct] = React.useState(0.00345); // %
  const [sttPct, setSttPct] = React.useState(0.025); // % (sell side intraday; 0.1 for delivery)
  const [gstPct, setGstPct] = React.useState(18); // % on (brokerage+txn)
  const [stampPct, setStampPct] = React.useState(0.015); // % buy side

  const [summary, setSummary] = React.useState<null | {
    gross: number;
    totalCharges: number;
    net: number;
    breakeven: number;
  }>(null);

  const calculate = () => {
    const buyVal = buyPrice * qty;
    const sellVal = sellPrice * qty;

    const brokerage = (brokeragePct / 100) * (buyVal + sellVal);
    const txn = (txnPct / 100) * (buyVal + sellVal);
    const stt = (sttPct / 100) * sellVal; // mostly on sell
    const gst = (gstPct / 100) * (brokerage + txn);
    const stamp = (stampPct / 100) * buyVal; // mostly on buy
    const charges = brokerage + txn + stt + gst + stamp;

    const gross = sellVal - buyVal;
    const net = gross - charges;

    // breakeven price change required per share
    const breakeven = charges / qty;

    setSummary({ gross, totalCharges: charges, net, breakeven });
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6">Equity P&L After Charges</Typography>
          <TextField
            label="Buy Price"
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(Number(e.target.value))}
          />
          <TextField
            label="Sell Price"
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(Number(e.target.value))}
          />
          <TextField
            label="Quantity"
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <TextField
            label="Brokerage % (each side total)"
            type="number"
            value={brokeragePct}
            onChange={(e) => setBrokeragePct(Number(e.target.value))}
          />
          <TextField
            label="Exchange Txn % (each side total)"
            type="number"
            value={txnPct}
            onChange={(e) => setTxnPct(Number(e.target.value))}
          />
          <TextField
            label="STT % (sell side)"
            type="number"
            value={sttPct}
            onChange={(e) => setSttPct(Number(e.target.value))}
          />
          <TextField
            label="GST % (on brokerage+txn)"
            type="number"
            value={gstPct}
            onChange={(e) => setGstPct(Number(e.target.value))}
          />
          <TextField
            label="Stamp % (buy side)"
            type="number"
            value={stampPct}
            onChange={(e) => setStampPct(Number(e.target.value))}
          />
          <Button onClick={calculate} variant="contained">
            Calculate
          </Button>
          {summary && (
            <>
              <Typography>Gross P&L: ₹ {fmt(summary.gross)}</Typography>
              <Typography>
                Total Charges: ₹ {fmt(summary.totalCharges)}
              </Typography>
              <Typography variant="h6">
                Net P&L: ₹ {fmt(summary.net)}
              </Typography>
              <Typography color="text.secondary">
                Breakeven / Share: ₹ {fmt(summary.breakeven)}
              </Typography>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
