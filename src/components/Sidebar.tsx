"use client";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
} from "@mui/material";

export const CALC_LIST = [
  "EMI Calculator",
  "SIP Calculator",
  "Brokerage Calculator",
  "Margin Calculator",
  "Lumpsum Calculator",
  "SWP Calculator",
  "Step Up SIP Calculator",
  "Mutual Fund Returns Calculator",
  "FD Calculator",
  "RD Calculator",
  "Compound Interest Calculator",
  "PPF Calculator",
];

export default function Sidebar({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
      }}
    >
      {/* Brand Section */}
      <Toolbar sx={{ justifyContent: "center", py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            width: "100%",
          }}
        >
          <SavingsOutlinedIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography
            variant="h4"
            fontWeight={900}
            sx={{
              color: "primary.main",
              letterSpacing: 2,
            }}
          >
            PayPlan
          </Typography>
        </Box>
      </Toolbar>
      <Divider />

      {/* Sidebar List */}
      <List>
        {CALC_LIST.map((name) => (
          <ListItemButton
            key={name}
            selected={selected === name}
            onClick={() => onSelect(name)}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "#fff",
                transform: "translateX(5px)", // smooth slide effect
              },
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            <ListItemText primary={name} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
