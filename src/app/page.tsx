"use client";

import * as React from "react";
import { Box, Toolbar, Container, Typography } from "@mui/material";
import Sidebar, { CALC_LIST } from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";

// calculators
import LoanCalculator from "@/components/calculators/LoanCalculator";
import SipCalculator from "@/components/calculators/SipCalculator";
import BrokerageCalculator from "@/components/calculators/BrokerageCalculator";
import MarginCalculator from "@/components/calculators/MarginCalculator";
import LumpsumCalculator from "@/components/calculators/LumpsumCalculator";
import SwpCalculator from "@/components/calculators/SwpCalculator";
import StepUpSipCalculator from "@/components/calculators/StepUpSipCalculator";
import MutualFundReturnsCalculator from "@/components/calculators/MutualFundReturnsCalculator";
import FdCalculator from "@/components/calculators/FdCalculator";
import RdCalculator from "@/components/calculators/RdCalculator";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import PpfCalculator from "@/components/calculators/PpfCalculator";

export default function Page() {
  const [selected, setSelected] = React.useState("EMI Calculator");

  const renderCalculator = () => {
    switch (selected) {
      case "EMI Calculator":
        return <LoanCalculator />;
      case "SIP Calculator":
        return <SipCalculator />;
      case "Brokerage Calculator":
        return <BrokerageCalculator />;
      case "Margin Calculator":
        return <MarginCalculator />;
      case "Lumpsum Calculator":
        return <LumpsumCalculator />;
      case "SWP Calculator":
        return <SwpCalculator />;
      case "Step Up SIP Calculator":
        return <StepUpSipCalculator />;
      case "Mutual Fund Returns Calculator":
        return <MutualFundReturnsCalculator />;
      case "FD Calculator":
        return <FdCalculator />;
      case "RD Calculator":
        return <RdCalculator />;
      case "Compound Interest Calculator":
        return <CompoundInterestCalculator />;
      case "PPF Calculator":
        return <PpfCalculator />;
      default:
        return (
          <Typography color="text.secondary">
            {selected} coming soon...
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar selected={selected} onSelect={setSelected} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Fixed Theme Toggle at top-right */}
        <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1300 }}>
          <ThemeToggle />
        </Box>
        <Toolbar /> {/* Drawer offset */}
        <Container maxWidth="md" sx={{ mt: 2 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            {selected}
          </Typography>
          {renderCalculator()}
        </Container>
      </Box>
    </Box>
  );
}
