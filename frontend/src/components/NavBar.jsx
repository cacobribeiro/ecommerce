import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="sticky" elevation={0} color="transparent">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Yoga em Movimento</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/planos" color="inherit">
            Planos
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Área do aluno
          </Button>
          {isAuthenticated && (
            <Button onClick={logout} color="inherit">
              Sair
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
