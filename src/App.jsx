import {Routes, Route} from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/Login.jsx";
import Header from "./components/Header.jsx";

export default function App() {

  return (
      <>
          <Header/>

          <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route
                  path="/checkout"
                  element={
                      <ProtectedRoute>
                          <CheckoutPage />
                      </ProtectedRoute>
                  }
              />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
      </>
  );
}
