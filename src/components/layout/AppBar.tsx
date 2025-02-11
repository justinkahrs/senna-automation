"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext } from "@/app/ClientProviders";
import ThemeToggleIcon from "@/components/ThemeToggleIcon";

export function AppBar() {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
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
            <ThemeToggleIcon mode={mode} onToggle={toggleColorMode} />

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
              <MenuItem
                component={Link}
                href="/products"
                onClick={handleMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Products
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/request"
                onClick={handleMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Request
                </Typography>
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
                <Button color="inherit">
                  <Typography variant="h6">Products</Typography>
                </Button>
              </Link>
              <Link href="/request" passHref>
                <Button color="inherit">
                  <Typography variant="h6">Request</Typography>
                </Button>
              </Link>
            </Box>
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <ThemeToggleIcon mode={mode} onToggle={toggleColorMode} />
            </Box>
          </>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}
