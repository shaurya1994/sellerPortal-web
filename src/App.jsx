// FILE: src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/layout";
import RequireAuth from "./routes/RequireAuth";
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

// // FILE: src/App.jsx

// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout/layout";

// import ProductsPage from "./pages/Products/ProductsPage";
// import OrdersPage from "./pages/Orders/OrdersPage";
// import LoginPage from "./pages/Login/LoginPage";

// import RequireAuth from "./routes/RequireAuth";

// const App = () => {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/login" element={<LoginPage />} />

//       {/* Buyer-facing routes */}
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <RequireAuth>
//               <Navigate to="/products" replace />
//             </RequireAuth>
//           </Layout>
//         }
//       />
//       <Route
//         path="/products"
//         element={
//           <Layout>
//             <RequireAuth>
//               <ProductsPage />
//             </RequireAuth>
//           </Layout>
//         }
//       />
//       <Route
//         path="/orders"
//         element={
//           <Layout>
//             <RequireAuth>
//               <OrdersPage />
//             </RequireAuth>
//           </Layout>
//         }
//       />

//       {/* Seller-facing routes */}
//       <Route
//         path="/s/products"
//         element={
//           <Layout>
//             <RequireAuth>
//               <ProductsPage />
//             </RequireAuth>
//           </Layout>
//         }
//       />
//       <Route
//         path="/s/orders"
//         element={
//           <Layout>
//             <RequireAuth>
//               <OrdersPage />
//             </RequireAuth>
//           </Layout>
//         }
//       />
//     </Routes>
//   );
// };

// export default App;
