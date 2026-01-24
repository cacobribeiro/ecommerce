import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6d4aa6",
      dark: "#52327f",
      light: "#bba6e0"
    },
    secondary: {
      main: "#caa354"
    },
    background: {
      default: "#f7f1ea",
      paper: "#fcf8f3"
    },
    text: {
      primary: "#2c2335",
      secondary: "#5b4b6b"
    }
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600
    },
    h3: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 18
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          paddingInline: 24,
          paddingBlock: 10,
          fontWeight: 500,
          boxShadow: "none"
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: "0 18px 40px rgba(72, 46, 101, 0.08)",
          border: "1px solid rgba(202, 163, 84, 0.15)"
        }
      }
    }
  }
});

export default theme;
