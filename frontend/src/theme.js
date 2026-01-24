import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8c5b4e"
    },
    secondary: {
      main: "#e4c7b7"
    },
    background: {
      default: "#f8f4f1"
    }
  },
  typography: {
    fontFamily: "'Inter', 'Helvetica', 'Arial', sans-serif",
    h2: {
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none"
        }
      }
    }
  }
});

export default theme;
