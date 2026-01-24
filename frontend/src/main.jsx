import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SiteConfigProvider } from "./context/SiteConfigContext.jsx";
import theme from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <SiteConfigProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SiteConfigProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
