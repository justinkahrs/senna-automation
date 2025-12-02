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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext } from "@/app/ClientProviders";
import ThemeToggleIcon from "@/components/ThemeToggleIcon";
import { useRouter } from "next/navigation";

export function AppBar() {
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const router = useRouter();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [productsMenuAnchorEl, setProductsMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleProductsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProductsMenuAnchorEl(event.currentTarget);
  };

  const handleProductsMenuClose = () => {
    setProductsMenuAnchorEl(null);
  };

  const handleProductClick = (path: string) => {
    router.push(path);
    handleProductsMenuClose();
    handleMobileMenuClose();
  };

  return (
    <MUIAppBar position="fixed">
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
          <Link href="/" passHref>
            <Box
              component="img"
              src={mode === "dark" ? "/senna-automation-full-logo-grey.svg" : "/senna-automation-full-logo.svg"}
              alt="Senna Automation"
              sx={{
                height: 40,
                cursor: "pointer",
              }}
            />
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
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleProductsMenuOpen}>
                <Typography color="inherit" variant="h6">
                  Products
                </Typography>
                <KeyboardArrowDownIcon />
              </MenuItem>
              <Menu
                anchorEl={productsMenuAnchorEl}
                open={Boolean(productsMenuAnchorEl)}
                onClose={handleProductsMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem onClick={() => handleProductClick("/products/ai-automation")}>
                  AI/Automation
                </MenuItem>
                <MenuItem onClick={() => handleProductClick("/products/web-development")}>
                  Web Development
                </MenuItem>
                <MenuItem onClick={() => handleProductClick("/products/custom-applications")}>
                  Custom Applications
                </MenuItem>
              </Menu>
              <MenuItem
                component={Link}
                href="/about"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  About
                </Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                href="/contact"
                onClick={handleMobileMenuClose}
              >
                <Typography color="inherit" variant="h6">
                  Contact
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
              <Button
                color="inherit"
                onClick={handleProductsMenuOpen}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <Typography variant="h5">Products</Typography>
              </Button>
              <Menu
                anchorEl={productsMenuAnchorEl}
                open={Boolean(productsMenuAnchorEl)}
                onClose={handleProductsMenuClose}
              >
                <MenuItem onClick={() => handleProductClick("/products/ai-automation")}>
                  <Typography variant="body1">AI/Automation</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleProductClick("/products/web-development")}>
                  <Typography variant="body1">Web Development</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleProductClick("/products/custom-applications")}>
                  <Typography variant="body1">Custom Applications</Typography>
                </MenuItem>
              </Menu>
              <Link href="/about" passHref>
                <Button color="inherit">
                  <Typography variant="h5">About</Typography>
                </Button>
              </Link>
              <Link href="/contact" passHref>
                <Button color="inherit">
                  <Typography variant="h5">Contact</Typography>
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