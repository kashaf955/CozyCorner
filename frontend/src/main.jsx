import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store.js";
import { AlertProvider } from "./context/AlertContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Provider>
  </StrictMode>
);
