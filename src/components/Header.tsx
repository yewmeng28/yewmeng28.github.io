import { Link } from "react-router-dom";
import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useThemeContext } from "../context/ThemeContext";
import { navItems } from "../config/navigation";

export default function Header() {

  const { darkMode, toggleTheme } = useThemeContext();

  const [open, setOpen] = useState(false);

  const buttonStyle = {color: "text.primary", fontFamily: "Geomini",}

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            flexGrow: 1,
            letterSpacing: 1,
            color: "text.primary",
          }}
        >
          Chai Yew Meng
        </Typography>

        <IconButton
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <Tooltip
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
          }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              transition: "transform 1s ease",
              "&:hover": {
                transform: "rotate(360deg)",
              },
              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
            gap: 2,
            alignItems: "center",
          }}
        >
          {navItems.map(({ label, path }) => (
            <Button
              key={path}
              sx={buttonStyle}
              component={Link}
              to={path}
            >
              {label}
            </Button>
          ))}
          <Tooltip
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                transition: "transform 1s ease",
                "&:hover": {
                  transform: "rotate(360deg)",
                },
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        <Drawer
          anchor="right"
          open={open}
          onClose={() => setOpen(false)}
        >
          <Box sx={{ width: 250 }}>
            <List>

              {navItems.map(({ label, path }) => (
                <ListItemButton
                  key={path}
                  component={Link}
                  to={path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              ))}

            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}