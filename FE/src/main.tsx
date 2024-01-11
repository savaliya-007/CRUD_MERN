import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { store } from "./Store/store.ts";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./route.tsx";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { brown, grey } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: { main: brown[500], dark: brown[300] },
    secondary: { main: grey[700], dark: grey[500] },
  },
  typography: {
    fontFamily: [
      "roboto",
      "monospace",
      "AdiminBoard",
      "Helvetica Neue Light",
    ].join(","),
    fontSize: 20,
    h1: { fontWeight: "bold", fontSize: 25 },
    htmlFontSize: 20,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
    },
  },
  shape: { borderRadius: 0 },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
