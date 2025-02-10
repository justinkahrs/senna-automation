"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Button,
  Box,
  Switch,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext } from "@/app/ClientProviders";

export function AppBar() {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MUIAppBar position="fixed">
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link href="/" passHref>
            <Typography variant="h5" color="inherit" sx={{ cursor: "pointer" }}>
              Senna Automation
            </Typography>
          </Link>
        </Box>
        {isMobile ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Switch
              checked={mode === "dark"}
              onChange={() => toggleColorMode()}
              icon={
                <span role="img" aria-label="bright mode">
                  ☀️
                </span>
              }
              checkedIcon={
                <span role="img" aria-label="dim mode">
                  🌙
                </span>
              }
            />
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link href="/products" passHref>
                  <Typography color="inherit">Products</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link href="/request" passHref>
                  <Typography color="inherit">Request</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Link href="/products" passHref>
                <Button color="inherit">Products</Button>
              </Link>
              <Link href="/request" passHref>
                <Button color="inherit">Request</Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Switch
                checked={mode === "dark"}
                onChange={() => toggleColorMode()}
                icon={
                  <span role="img" aria-label="bright mode">
                    ☀️
                  </span>
                }
                checkedIcon={
                  <span role="img" aria-label="dim mode">
                    🌙
                  </span>
                }
              />
            </Box>
          </>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
