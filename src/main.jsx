import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import {CartProvider} from "./context/CartContext.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
              <CartProvider>
                  <AuthProvider>
                      <App />
                  </AuthProvider>
              </CartProvider>
          </QueryClientProvider>
      </BrowserRouter>
  </React.StrictMode>
);
