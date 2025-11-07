import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider } from "./context/CartProvider.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CartProvider>
        <App />
      </CartProvider>
    </React.StrictMode>
  );
} else {
  console.error(
    "Não foi possível encontrar o elemento 'root'. O App não pode ser montado."
  );
}
