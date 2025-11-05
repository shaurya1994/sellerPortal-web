// FILE: src/App.jsx

import Layout from "./components/Layout/layout";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login/LoginPage";
import ProductsPage from "./pages/Products/ProductsPage";
import OrdersPage from "./pages/Orders/OrdersPage";

import RequireAuth from "./routes/RequireAuth";

const App = () => {
  return (
    <Layout>
      <Routes>

        {/* Public route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/products" replace />} />

        {/* Auth-protected shared pages (buyer or seller) */}
        <Route
          path="/products"
          element={
            <RequireAuth>
              <ProductsPage />
            </RequireAuth>
          }
        />

        <Route
          path="/orders"
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          }
        />

      </Routes>
    </Layout>
  );
};

export default App;


// import Layout from "./components/Layout/layout"
// import { Routes, Route, Navigate } from "react-router-dom";

// import ProductsPage from "./pages/Products/ProductsPage";
// import OrdersPage from "./pages/Orders/OrdersPage";
// import TesterPage from "./pages/Tester/TesterPage";

// const App = () => {
//   return (
//     <Layout>
//       <Routes>
//         <Route path="/" element={<Navigate to="/products" replace />} />
//         <Route path="/products" element={<ProductsPage />} />
//         <Route path="/orders" element={<OrdersPage />} />
//         <Route path="/test" element={<TesterPage />} />
//       </Routes>
//     </Layout>
//   );
// };

// export default App;
