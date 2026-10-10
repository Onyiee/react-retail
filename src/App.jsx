import ProductsPage from "./pages/ProductsPage.jsx";
import {Routes, Route} from "react-router-dom";

export default function App() {

  return (
      <Routes>
          <Route path="/" element={<ProductsPage />} />
      </Routes>
  );
}
