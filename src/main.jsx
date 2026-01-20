import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";

import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import { ProductProvider } from "./Context/ProductContext.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <UserProvider>
            <WishlistProvider>
              <ProductProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </ProductProvider>
            </WishlistProvider>
          </UserProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);

