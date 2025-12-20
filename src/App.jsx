// FILE: src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from "./routes/RequireAuth";
import Layout from "./components/Layout/layout";

import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProductsPage from "./pages/Products/ProductsPage";
import OrdersPage from "./pages/Orders/OrdersPage";

const App = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage defaultRole="buyer" />} />

    <Route path="/s/login" element={<LoginPage role="seller" />} />
    <Route path="/s/signup" element={<SignUpPage defaultRole="seller" />} />

    {/* Default redirect */}
    <Route path="/" element={<Navigate to="/login" replace />} />

    {/* Buyer routes */}
    <Route
      path="/*"
      element={
        <Layout>
          <Routes>
            <Route
              path="products"
              element={
                <RequireAuth>
                  <ProductsPage />
                </RequireAuth>
              }
            />
            <Route
              path="orders"
              element={
                <RequireAuth>
                  <OrdersPage />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      }
    />

    {/* Seller routes */}
    <Route
      path="/s/*"
      element={
        <Layout>
          <Routes>
            <Route
              path="products"
              element={
                <RequireAuth>
                  <ProductsPage />
                </RequireAuth>
              }
            />
            <Route
              path="orders"
              element={
                <RequireAuth>
                  <OrdersPage />
                </RequireAuth>
              }
            />
          </Routes>
        </Layout>
      }
    />
  </Routes>
);

export default App;
