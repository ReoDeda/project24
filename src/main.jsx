import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CommissionProvider } from "./context/CommissionProvider";
import "./index.css"; // Важно! Подключаем стили

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CommissionProvider>
      <App />
    </CommissionProvider>
  </React.StrictMode>
);