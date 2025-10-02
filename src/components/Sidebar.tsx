"use client";

import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export const drawerWidth = 240;

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

type Props = {
  selected: string;
  onSelect: (name: string) => void;
  mobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  selected,
  onSelect,
  mobileOpen = false,
  onClose,
}: Props) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  const DrawerContent = (
    <Box
      role="presentation"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* Brand Section */}
      <Toolbar sx={{ justifyContent: "space-between", py: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SavingsOutlinedIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Typography
            variant="h5"
            fontWeight={900}
            sx={{ color: "primary.main", letterSpacing: 2 }}
          >
            PayPlan
          </Typography>
        </Box>

        {/* Close button - only show on mobile */}
        {!upMd && (
          <IconButton
            onClick={onClose}
            edge="end"
            aria-label="close drawer"
            sx={{ ml: 1 }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />

      {/* Sidebar List */}
      <List sx={{ px: 1, py: 1, flexGrow: 1, overflowY: "auto" }}>
        {CALC_LIST.map((name) => {
          const isSelected = selected === name;
          return (
            <ListItemButton
              key={name}
              selected={isSelected}
              onClick={() => onSelect(name)}
              sx={{
                borderRadius: 1,
                my: 0.5,
                transition: "all 0.25s ease",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "#fff",
                  transform: "translateX(4px)",
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
              <ListItemText
                primary={name}
                primaryTypographyProps={{
                  noWrap: true,
                  fontWeight: isSelected ? 700 : 500,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box
        sx={{
          p: 2,
          color: "text.secondary",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} PayPlan
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile / small screens: temporary drawer */}
      {!upMd && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}

      {/* Desktop md+: permanent drawer */}
      {upMd && (
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
            },
          }}
        >
          {DrawerContent}
        </Drawer>
      )}
    </>
  );
}
