// FILE: ProductsPage.jsx
import { useEffect, useRef, useState, useCallback } from "react";

import { productsPageStyles } from "./ProductsPage.styles";
import { fetchSellerProducts } from "../../api/products";

import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Pagination from "../../components/Pagination/Pagination";
import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Add modal visibility state
  const [showAddModal, setShowAddModal] = useState(false);

  // Layout / pagination states
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const CARD_MIN = 240;
  const CARD_MAX = 360;
  const GRID_GAP = 24;
  const ROWS_PER_PAGE = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const w = Math.max(0, Math.floor(el.getBoundingClientRect().width));
    setContainerWidth(w);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // ✅ Fetch products function (so we can call again after add)
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSellerProducts();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error loading products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Compute layout
  const cardWidth = Math.max(
    CARD_MIN,
    Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
  );

  const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

  const columns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
  );

  const itemsPerPage = Math.max(1, ROWS_PER_PAGE * columns);

  const totalItems = products.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleProducts = products.slice(start, end);

  // ✅ Handle Add Product click
  const handleAddProductClick = () => {
    setShowAddModal(true);
  };

  // ✅ Handle Product Added
  const handleProductAdded = async (newProductData) => {
    // Option 1: Simply refetch all
    await loadProducts();
    setShowAddModal(false);

    // Option 2 (faster): Add to local state
    // setProducts(prev => [...prev, newProductData.newProduct]);
  };

  return (
    <div style={productsPageStyles.container}>
      {/* Header */}
      <div style={productsPageStyles.headerRow}>
        <div style={productsPageStyles.headerLeft}>
          <div style={productsPageStyles.titleWrapper}>
            <h2 style={productsPageStyles.title}>My Products</h2>
            <div style={productsPageStyles.titleUnderline} />
          </div>
        </div>
        <div style={productsPageStyles.headerRight}></div>
      </div>

      {/* Grid container */}
      <div ref={containerRef} style={productsPageStyles.gridContainer}>
        {loading ? (
          <div style={productsPageStyles.loading}>Loading products…</div>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <ProductGrid
                products={visibleProducts}
                showAddCard={true}
                onAddClick={handleAddProductClick} // ✅ replaced console.log
                cardWidth={effectiveCardWidth}
                gap={GRID_GAP}
              />

              {totalItems === 0 && (
                <div style={productsPageStyles.emptyState}>
                  <p style={productsPageStyles.emptyText}>No products to show</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      <div style={productsPageStyles.paginationRow}>
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={(p) => setCurrentPage(p)}
          styles={{
            container: productsPageStyles.paginationContainer,
            btn: productsPageStyles.paginationBtn,
            btnActive: productsPageStyles.paginationBtnActive,
            btnDisabled: productsPageStyles.paginationBtnDisabled,
          }}
        />
      </div>

      {/* ✅ Add Product Modal */}
      <ProductAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleProductAdded}
      />
    </div>
  );
};

export default ProductsPage;

// // FILE: ProductsPage.jsx
// import { useEffect, useRef, useState, useCallback } from "react";

// import { productsPageStyles } from "./ProductsPage.styles";
// import { fetchSellerProducts } from "../../api/products";

// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import Pagination from "../../components/Pagination/Pagination";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Layout / pagination states
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // card sizing constraints (we compute cardWidth from container)
//   const CARD_MIN = 240; // px - reasonable minimum card width
//   const CARD_MAX = 360; // px - reasonable maximum card width
//   const GRID_GAP = 24; // px between cards
//   const ROWS_PER_PAGE = 5;

//   const [currentPage, setCurrentPage] = useState(1);

//   // Measure container width responsively
//   const measure = useCallback(() => {
//     const el = containerRef.current;
//     if (!el) return;
//     const w = Math.max(0, Math.floor(el.getBoundingClientRect().width));
//     setContainerWidth(w);
//   }, []);

//   useEffect(() => {
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [measure]);

//   // fetch all products (previously filtered by tab). Now show all products in My Products
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     (async () => {
//       try {
//         const data = await fetchSellerProducts(); // assume API returns all (if API needs param, update)
//         if (!mounted) return;
//         setProducts(data.products || []);
//       } catch (err) {
//         console.error("Error loading products:", err);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     })();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // compute cardWidth and columns based on container width
//   // cardWidth = clamp(CARD_MIN, containerWidth * 0.22, CARD_MAX)
//   const cardWidth = Math.max(
//     CARD_MIN,
//     Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
//   );

//   // ensure cardWidth never exceeds container width (for very small screens)
//   const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

//   const columns = Math.max(
//     1,
//     Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
//   );

//   const itemsPerPage = Math.max(1, ROWS_PER_PAGE * columns);

//   // pagination slice
//   const totalItems = products.length;
//   const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
//   // clamp currentPage
//   useEffect(() => {
//     if (currentPage > totalPages) setCurrentPage(totalPages);
//   }, [totalPages, currentPage]);

//   const start = (currentPage - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   const visibleProducts = products.slice(start, end);

//   return (
//     <div style={productsPageStyles.container}>
//       {/* Header + container measurement wrapper */}
//       <div style={productsPageStyles.headerRow}>
//         <div style={productsPageStyles.headerLeft}>
//           <div style={productsPageStyles.titleWrapper}>
//             <h2 style={productsPageStyles.title}>My Products</h2>
//             <div style={productsPageStyles.titleUnderline} />
//           </div>
//         </div>
//         <div style={productsPageStyles.headerRight}>
//           {/* Reserved for actions (filter/search/add) if needed later */}
//         </div>
//       </div>

//       {/* Grid container (we measure width here) */}
//       <div ref={containerRef} style={productsPageStyles.gridContainer}>
//         {loading ? (
//           <div style={productsPageStyles.loading}>Loading products…</div>
//         ) : (
//           <>
//             <div style={{ width: "100%" }}>
//               <ProductGrid
//                 products={visibleProducts}
//                 showAddCard={true}
//                 onAddClick={() => console.log("Add Product clicked")}
//                 cardWidth={effectiveCardWidth}
//                 gap={GRID_GAP}
//               />
//               {totalItems === 0 && (
//                 <div style={productsPageStyles.emptyState}>
//                   <p style={productsPageStyles.emptyText}>No products to show</p>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </div>

//       {/* Pagination (only show if more than one page) */}
//       <div style={productsPageStyles.paginationRow}>
//         <Pagination
//           current={currentPage}
//           total={totalPages}
//           onChange={(p) => setCurrentPage(p)}
//           styles={{
//             container: productsPageStyles.paginationContainer,
//             btn: productsPageStyles.paginationBtn,
//             btnActive: productsPageStyles.paginationBtnActive,
//             btnDisabled: productsPageStyles.paginationBtnDisabled,
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
