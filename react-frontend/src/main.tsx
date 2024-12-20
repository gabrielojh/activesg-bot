import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./index.css";

// Custom Light Theme (Inspiration from Catppuccin theme)
const catppuccinLight = {
  primary: {
    main: '#7287fd',
    light: '#04a5e5',
    dark: '#8839ef',
  },
  secondary: {
    main: '#f50057',
  },
  background: {
    default: '#eff1f5',
    paper: '#e6e9ef',
  },
  text: {
    primary: '#4c4f69',
    secondary: '#5c5f77',
    hint: '#7c7f93',
  },
};

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
  palette: {
    mode: "light",
    ...catppuccinLight
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
