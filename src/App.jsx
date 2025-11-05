// FILE: src/App.jsx

import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/layout";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import ProductsPage from "./pages/Products/ProductsPage";
import OrdersPage from "./pages/Orders/OrdersPage";
import RequireAuth from "./routes/RequireAuth";

export default function App() {
  return (
    <Routes>

      {/* ✅ Public routes, NO layout */}
      <Route path="/login" element={<LoginPage defaultRole="buyer" />} />
      <Route path="/signup" element={<SignUpPage defaultRole="buyer" />} />

      <Route path="/s/login" element={<LoginPage defaultRole="seller" />} />
      <Route path="/s/signup" element={<SignUpPage defaultRole="seller" />} />

      {/* ✅ Authenticated routes go inside Layout */}
      <Route element={<Layout />}>
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
      </Route>

      {/* ✅ Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// import { Routes, Route, Navigate } from "react-router-dom";

// import Layout from "./components/Layout/layout";
// import RequireAuth from "./routes/RequireAuth";

// import LoginPage from "./pages/Login/LoginPage";
// import SignUpPage from "./pages/SignUp/SignUpPage";

// import ProductsPage from "./pages/Products/ProductsPage";
// import OrdersPage from "./pages/Orders/OrdersPage";

// /**
//  * Public routes (/login for buyers, /s/login for sellers)
//  * Authenticated routes are nested under <Layout> so login pages don't show header/footer.
//  */
// const App = () => {
//   return (
//     <>
//       {/* Public (no layout) */}
//       <Routes>
//         <Route path="/login" element={<LoginPage defaultRole="buyer" />} />
//         <Route path="/s/login" element={<LoginPage defaultRole="seller" />} />

//         <Route path="/signup" element={<SignUpPage defaultRole="buyer" />} />
//         <Route path="/s/signup" element={<SignUpPage defaultRole="seller" />} />

//         {/* Default redirect to buyer login if unauth root */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>

//       {/* Authenticated (with layout) */}
//       <Layout>
//         <Routes>
//           <Route
//             path="/products"
//             element={
//               <RequireAuth>
//                 <ProductsPage />
//               </RequireAuth>
//             }
//           />
//           <Route
//             path="/orders"
//             element={
//               <RequireAuth>
//                 <OrdersPage />
//               </RequireAuth>
//             }
//           />
//         </Routes>
//       </Layout>
//     </>
//   );
// };

// export default App;

// FILE: src/App.jsx

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
