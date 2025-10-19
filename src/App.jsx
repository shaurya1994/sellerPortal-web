import Layout from "./components/Layout/layout"
import { Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/Products/ProductsPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import TesterPage from "./pages/Tester/TesterPage";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/test" element={<TesterPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
