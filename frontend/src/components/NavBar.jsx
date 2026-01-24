import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { navItems } from "../data/content.js";
import PrimaryButton from "./PrimaryButton.jsx";

const NavBar = () => {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleOpenMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(item);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  return (
    <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: "blur(8px)" }}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
        <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif" }}>
          Caminho do Ser
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
          {navItems.map((item) =>
            item.children ? (
              <Button
                key={item.label}
                color="inherit"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={(event) => handleOpenMenu(event, item)}
              >
                {item.label}
              </Button>
            ) : (
              <Button key={item.label} component={Link} to={item.to} color="inherit">
                {item.label}
              </Button>
            )
          )}
          <PrimaryButton component={Link} to={isAuthenticated ? "/minha-conta" : "/login"}>
            {isAuthenticated ? "Minha conta" : "Iniciar sessão"}
          </PrimaryButton>
        </Stack>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setMobileOpen(true)}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {activeMenu?.children?.map((child) => (
          <MenuItem key={child.label} component={Link} to={child.to} onClick={handleCloseMenu}>
            {child.label}
          </MenuItem>
        ))}
      </Menu>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, p: 3 }}>
          <Typography variant="h6" sx={{ fontFamily: "'Playfair Display', serif" }}>
            Caminho do Ser
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={1}>
            {navItems.map((item) => (
              <Box key={item.label}>
                <Button
                  fullWidth
                  component={Link}
                  to={item.to || item.children?.[0]?.to}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Button>
                {item.children && (
                  <Stack spacing={0.5} sx={{ pl: 2 }}>
                    {item.children.map((child) => (
                      <Button
                        key={child.label}
                        component={Link}
                        to={child.to}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Button>
                    ))}
                  </Stack>
                )}
              </Box>
            ))}
            <PrimaryButton component={Link} to={isAuthenticated ? "/minha-conta" : "/login"}>
              {isAuthenticated ? "Minha conta" : "Iniciar sessão"}
            </PrimaryButton>
          </Stack>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
