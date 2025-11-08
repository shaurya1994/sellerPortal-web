// FILE: Layout.jsx

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import { layoutStyles } from "./Layout.styles";
import { selectAuth } from "../../store/authSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector(selectAuth);
  const role = user?.role || "buyer";

  // Detect active tab
  const isSeller = role === "seller";
  const active = location.pathname.includes("/orders") ? "orders" : "products";

  const tabs = [
    { key: "products", label: "Products", path: "/products" },
    { key: "orders", label: "Orders", path: "/orders" },
  ];

  const tabRefs = useRef({});
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const activeTab = tabRefs.current[active];
    const nav = navRef.current;
    if (activeTab && nav) {
      const tabRect = activeTab.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      const offsetLeft = tabRect.left - navRect.left;

      setIndicatorStyle({ width: tabRect.width, left: offsetLeft });
    }
  }, [active]);

  const handleTabClick = (path) => {
    // Auto prepend `/s` for seller URLs
    const targetPath = isSeller ? `/s${path}` : path;
    navigate(targetPath);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* Navigation Tabs */}
      <div style={layoutStyles.tabWrapper}>
        <div className="container-fluid d-flex justify-content-center px-lg-4">
          <ul ref={navRef} style={layoutStyles.navList}>
            {/* Sliding highlight pill */}
            <div
              style={{
                ...layoutStyles.activeIndicator,
                width: `${indicatorStyle.width}px`,
                transform: `translateX(${indicatorStyle.left}px)`,
              }}
            />

            {tabs.map(({ key, label, path }) => {
              const isActive = active === key;
              return (
                <li key={key} style={layoutStyles.navItem}>
                  <button
                    ref={(el) => (tabRefs.current[key] = el)}
                    style={{
                      ...layoutStyles.tabLink,
                      ...(isActive ? layoutStyles.tabActive : {}),
                    }}
                    onClick={() => handleTabClick(path)}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <main className="container-fluid flex-grow-1 px-lg-5 my-4">
        {children || <Outlet />}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

// import Header from "./Header";
// import Footer from "./Footer";

// import { layoutStyles } from "./Layout.styles";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";

// const Layout = ({ children }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const active = location.pathname.includes("/orders") ? "orders" : "products";

//   const tabs = [
//     { key: "products", label: "Products", path: "/products" },
//     { key: "orders", label: "Orders", path: "/orders" },
//   ];

//   const tabRefs = useRef({});
//   const navRef = useRef(null);
//   const [indicatorStyle, setIndicatorStyle] = useState({
//     width: 0,
//     left: 0,
//   });

//   useEffect(() => {
//     const activeTab = tabRefs.current[active];
//     const nav = navRef.current;
//     if (activeTab && nav) {
//       const tabRect = activeTab.getBoundingClientRect();
//       const navRect = nav.getBoundingClientRect();
//       const offsetLeft = tabRect.left - navRect.left;

//       setIndicatorStyle({
//         width: tabRect.width,
//         left: offsetLeft,
//       });
//     }
//   }, [active]);

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Header />

//       {/* Navigation Tabs */}
//       <div style={layoutStyles.tabWrapper}>
//         <div className="container-fluid d-flex justify-content-center px-lg-4">
//           <ul ref={navRef} style={layoutStyles.navList}>
//             {/* Sliding highlight pill */}
//             <div
//               style={{
//                 ...layoutStyles.activeIndicator,
//                 width: `${indicatorStyle.width}px`,
//                 transform: `translateX(${indicatorStyle.left}px)`,
//               }}
//             />

//             {tabs.map(({ key, label, path }) => {
//               const isActive = active === key;
//               return (
//                 <li key={key} style={layoutStyles.navItem}>
//                   <button
//                     ref={(el) => (tabRefs.current[key] = el)}
//                     style={{
//                       ...layoutStyles.tabLink,
//                       ...(isActive ? layoutStyles.tabActive : {}),
//                     }}
//                     onClick={() => navigate(path)}
//                   >
//                     {label}
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>

//       <main className="container-fluid flex-grow-1 px-lg-5 my-4">
//         {children || <Outlet />}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Layout;
