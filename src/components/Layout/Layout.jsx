// FILE: Layout.jsx
import Header from "./Header";
import Footer from "./Footer";
import { layoutStyles } from "./Layout.styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname.includes("/orders") ? "orders" : "products";

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <Header />

      {/* Navigation Tabs */}
      <div style={layoutStyles.tabWrapper}>
        <div className="container-fluid d-flex justify-content-center px-lg-4">
          <ul className="nav" style={layoutStyles.navList}>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...layoutStyles.tabLink,
                  ...(active === "products" ? layoutStyles.tabActive : {}),
                }}
                onClick={() => navigate("/products")}
              >
                Products
              </button>
            </li>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...layoutStyles.tabLink,
                  ...(active === "orders" ? layoutStyles.tabActive : {}),
                }}
                onClick={() => navigate("/orders")}
              >
                Orders
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Page Content */}
      <main className="container-fluid flex-grow-1 px-lg-5 my-4">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
