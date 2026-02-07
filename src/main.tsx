import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/app/store";
import "./i18n";
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light">
      <ReduxProvider store={store}>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontSize: "0.9rem",
              padding: "0.5rem 0.75rem",
            },
          }}
        />
      </ReduxProvider>
    </ThemeProvider>
  </StrictMode>,
);
