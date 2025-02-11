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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MUIAppBar
      position="fixed"
      sx={{
        bgcolor: mode === "dark" ? "grey.750" : "primary.main",
        transition: "background-color 0.8s ease",
      }}
    >
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
              slotProps={{
                paper: {
                  sx: {
                    bgcolor: mode === "dark" ? "grey.900" : "primary.main",
                    width: "200px",
                  },
                },
              }}
              sx={{
                "&& .Mui-selected": {
                  backgroundColor: "pink",
                },
              }}
            >
              <MenuItem
                component={Link}
                href="/products"
                onClick={handleMenuClose}
                sx={{
                  bgcolor: mode === "dark" ? "grey.850" : "primary.main",
                  color: "#FFF",
                }}
              >
                <Typography color="inherit">Products</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/request"
                onClick={handleMenuClose}
                sx={{
                  bgcolor: mode === "dark" ? "grey.850" : "primary.main",
                  color: "#FFF",
                }}
              >
                <Typography color="inherit">Request</Typography>
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
              <ThemeToggleIcon mode={mode} onToggle={toggleColorMode} />
            </Box>
          </>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}