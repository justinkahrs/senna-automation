"use client";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useState, useContext } from "react";
import { Switch } from "@mui/material";
import { ColorModeContext } from "@/app/ClientProviders";

const mobileMenuItems = [
  // { text: "Pricing", href: "/pricing" },
  { text: "Products", href: "/products" },
  // { text: "Documentation", href: "/docs" },
  // { text: "Blog", href: "/blog" },
  // { text: "Support", href: "/support" },
];

export function AppBar() {
  const { user, signOut } = useAuth();
  const [resourcesAnchorEl, setResourcesAnchorEl] =
    useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleResourcesClick = (event: React.MouseEvent<HTMLElement>) => {
    setResourcesAnchorEl(event.currentTarget);
  };

  const handleResourcesClose = () => {
    setResourcesAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <span role="img" aria-label="sun">
                🔆
              </span>
              <Switch checked={mode === "dark"} onChange={toggleColorMode} />
              <span role="img" aria-label="moon">
                🔅
              </span>
            </Box>
          </ListItemButton>
        </ListItem>
        {mobileMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {!user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/auth/signin"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/pricing"
                onClick={handleDrawerToggle}
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <ListItemText primary="Get Started" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/dashboard"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  signOut();
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Sign Out" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <MuiAppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        backdropFilter: "blur(8px)",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(0, 0, 0, 0.8)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/" passHref style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            }}
          >
            Senna Automation
          </Typography>
        </Link>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Box sx={{ display: "none" }}>
            <Link href="/pricing" passHref>
              <Button color="inherit">Pricing</Button>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span role="img" aria-label="sun">
                🔆
              </span>
              <Switch checked={mode === "dark"} onChange={toggleColorMode} />
              <span role="img" aria-label="moon">
                🔅
              </span>
            </Box>
            <Link href="/products" passHref>
              <Button sx={{ color: "text.primary" }}>Products</Button>
            </Link>
            {/* {!user ? (
              <Link href="/auth/signin" passHref>
                <Button variant="contained">Sign In</Button>
              </Link>
            ) : (
              <>
                <Button variant="text" href="/dashboard">
                  Dashboard
                </Button>
                <Button variant="outlined" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            )} */}
          </Box>

          <Box>
            <Box sx={{ display: "none" }}>
              <Button
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleResourcesClick}
              >
                Resources
              </Button>
            </Box>
            <Menu
              anchorEl={resourcesAnchorEl}
              open={Boolean(resourcesAnchorEl)}
              onClose={handleResourcesClose}
            >
              <MenuItem
                onClick={handleResourcesClose}
                component={Link}
                href="/docs"
              >
                Documentation
              </MenuItem>
              <MenuItem
                onClick={handleResourcesClose}
                component={Link}
                href="/blog"
              >
                Blog
              </MenuItem>
              <MenuItem
                onClick={handleResourcesClose}
                component={Link}
                href="/support"
              >
                Support
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerToggle}
          sx={{ display: { md: "none" }, ml: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Toolbar>
    </MuiAppBar>
  );
}
