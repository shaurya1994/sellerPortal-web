import { useState, useEffect } from "react";
import { productsPageStyles } from "./ProductsPage.styles";
import { fetchSellerProducts } from "../../api/products";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

const ProductsPage = () => {
  const [active, setActive] = useState("my-products");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const status = active === "my-products" ? "approved" : "pending";
    const load = async () => {
      try {
        const data = await fetchSellerProducts(status);
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    load();
  }, [active]);

  return (
    <div className="container-fluid py-3 px-4">
      {/* Tabs */}
      <div style={productsPageStyles.tabWrapper}>
        <div className="d-flex justify-content-start">
          <ul className="nav" style={productsPageStyles.navList}>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...productsPageStyles.tabLink,
                  ...(active === "my-products"
                    ? productsPageStyles.tabActive
                    : {}),
                }}
                onClick={() => setActive("my-products")}
              >
                My Products
              </button>
            </li>
            <li className="nav-item">
              <button
                className="tab-link"
                style={{
                  ...productsPageStyles.tabLink,
                  ...(active === "pending"
                    ? productsPageStyles.tabActive
                    : {}),
                }}
                onClick={() => setActive("pending")}
              >
                Pending Approval
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Grid Area */}
      <div className="mt-4 w-100" style={productsPageStyles.contentArea}>
        <ProductGrid
          products={products}
          showAddCard={active === "my-products"}
          onAddClick={() => console.log("🟢 Add product clicked")}
        />
      </div>
    </div>
  );
};

export default ProductsPage;


// import { useState, useEffect } from "react";
// import { productsPageStyles } from "./ProductsPage.styles";
// import { fetchSellerProducts } from "../../api/products";

// const ProductsPage = () => {
//   const [active, setActive] = useState("my-products");

//   useEffect(() => {
//     const status = active === "my-products" ? "approved" : "pending";

//     const getProducts = async () => {
//       try {
//         const data = await fetchSellerProducts(status);
//         console.log("✅ Products fetched:", data);
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       }
//     };

//     getProducts();
//   }, [active]);

//   return (
//     <div className="container-fluid py-3 px-4">
//       {/* Tabs */}
//       <div style={productsPageStyles.tabWrapper}>
//         <div className="d-flex justify-content-start">
//           <ul className="nav" style={productsPageStyles.navList}>
//             <li className="nav-item">
//               <button
//                 className="tab-link"
//                 style={{
//                   ...productsPageStyles.tabLink,
//                   ...(active === "my-products"
//                     ? productsPageStyles.tabActive
//                     : {}),
//                 }}
//                 onClick={() => setActive("my-products")}
//               >
//                 My Products
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className="tab-link"
//                 style={{
//                   ...productsPageStyles.tabLink,
//                   ...(active === "pending"
//                     ? productsPageStyles.tabActive
//                     : {}),
//                 }}
//                 onClick={() => setActive("pending")}
//               >
//                 Pending Approval
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Placeholder */}
//       <div className="mt-4 w-100" style={productsPageStyles.contentArea}>
//         <div className="d-flex flex-column align-items-center justify-content-center py-5">
//           <p className="text-muted fs-5">Fetching products... (check console)</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

// import React, { useState } from "react";
// import { productsPageStyles } from "./ProductsPage.styles";

// const ProductsPage = () => {
//   const [active, setActive] = useState("my-products");

//   return (
//     <div className="container-fluid py-3 px-4">
//       {/* Tabs (Left-Aligned, Full Width) */}
//       <div style={productsPageStyles.tabWrapper}>
//         <div className="d-flex justify-content-start">
//           <ul className="nav" style={productsPageStyles.navList}>
//             <li className="nav-item">
//               <button
//                 className="tab-link"
//                 style={{
//                   ...productsPageStyles.tabLink,
//                   ...(active === "my-products"
//                     ? productsPageStyles.tabActive
//                     : {}),
//                 }}
//                 onClick={() => setActive("my-products")}
//               >
//                 My Products
//               </button>
//             </li>
//             <li className="nav-item">
//               <button
//                 className="tab-link"
//                 style={{
//                   ...productsPageStyles.tabLink,
//                   ...(active === "pending"
//                     ? productsPageStyles.tabActive
//                     : {}),
//                 }}
//                 onClick={() => setActive("pending")}
//               >
//                 Pending Approval
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Grid Area (Full Width Placeholder) */}
//       <div
//         className="mt-4 w-100"
//         style={productsPageStyles.contentArea}
//       >
//         <div className="d-flex flex-column align-items-center justify-content-center py-5">
//           <p className="text-muted fs-5">No products to show</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
