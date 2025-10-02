"use client";

import * as React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Sidebar, { CALC_LIST, drawerWidth } from "@/components/Sidebar";
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
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  const handleDrawerToggle = () => setMobileOpen((p) => !p);

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
      {/* AppBar */}
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          {!upMd && (
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
              aria-label="open navigation"
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.3 }}
          >
            {selected}
          </Typography>

          <ThemeToggle />
        </Toolbar>
      </AppBar>

      {/* Sidebar (responsive) */}
      <Sidebar
        selected={selected}
        onSelect={(name) => {
          setSelected(name);
          setMobileOpen(false);
        }}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: { xs: 7, sm: 8 },
          p: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 700, md: 900, lg: 1000, xl: 1200 },
          }}
        >
          {renderCalculator()}
        </Box>
      </Box>
    </Box>
  );
}
