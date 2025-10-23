// FILE: src/pages/ProductsPage/ProductsPage.jsx

// FILE: src/pages/ProductsPage/ProductsPage.jsx

import { useEffect, useRef, useState, useCallback } from "react";

import { COLORS } from "../../constants/colors";
import { CATEGORY_MAP } from "../../constants/categoryMap";

import { productsPageStyles } from "./ProductsPage.styles";

import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// API Calls
import { fetchSellerProducts } from "../../api/products";

// Simple debounce utility
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const CARD_MIN = 240;
  const CARD_MAX = 360;
  const GRID_GAP = 24;
  const ROWS_PER_PAGE = 5;


  // Search start 
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // reset pagination
  };

  const handleSearchInput = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setCurrentPage(1); // reset pagination when searching
    }, 400),
    []
  );
  // End

  // 🧮 Measure container width for responsive grid
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

  // 📦 Load products (server-side pagination)
  // const loadProducts = useCallback(
  //   async (page = 1) => {
  //     setLoading(true);
  //     try {
  //       const response = await fetchSellerProducts({
  //         page,
  //         limit: 24, // 5 rows × 5 columns
  //       });

  //       setProducts(response.data || []);
  //       setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
  //       setNetworkError(false);
  //     } catch (err) {
  //       console.error("Error loading products:", err);
  //       setNetworkError(true);
  //       setProducts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );
  const loadProducts = useCallback(
    async (page = 1) => {
      setLoading(true);

      try {
        const response = await fetchSellerProducts({
          page,
          limit: 24,
          search: searchTerm,
          category_id: selectedCategory,
        });

        setProducts(response.data || []);
        setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
        setNetworkError(false);

      } catch (err) {
        console.error("Error loading products:", err);
        setNetworkError(true);
        setProducts([]);

      } finally {
        setLoading(false);
      }
    },
    [searchTerm, selectedCategory]
  );



  // Fetch whenever page changes
  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage, loadProducts]);

  // 💡 Compute responsive card dimensions
  const cardWidth = Math.max(
    CARD_MIN,
    Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
  );
  const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

  const columns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
  );

  // 🧭 Handlers
  const handleAddProductClick = () => setShowAddModal(true);

  const handleProductAdded = async () => {
    await loadProducts(currentPage); // reload same page
    setShowAddModal(false);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  // 🎨 Render sectioned content
  const renderContent = () => {
    if (loading) {
      return (
        <div style={productsPageStyles.loadingContainer}>
          <div style={productsPageStyles.loadingSpinner}></div>
          <p style={productsPageStyles.loadingText}>Loading products…</p>
        </div>
      );
    }

    if (networkError) {
      return (
        <div style={productsPageStyles.networkErrorContainer}>
          <NetworkErrorIcon />
          <h4 style={productsPageStyles.networkErrorTitle}>No Network Connection</h4>
          <p style={productsPageStyles.networkErrorText}>
            Kindly check your internet connection and try again.
          </p>
          <button
            className="btn"
            style={{
              ...productsPageStyles.retryBtn,
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              border: `1px solid ${COLORS.primary}`,
            }}
            onClick={() => loadProducts(currentPage)}
          >
            Retry
          </button>
        </div>
      );
    }

    if (!networkError && products.length === 0) {
      return (
        <div style={productsPageStyles.emptyState}>
          <p style={productsPageStyles.emptyText}>You have no products yet.</p>
          <button
            className="btn btn-outline-primary"
            onClick={handleAddProductClick}
            style={productsPageStyles.addProductBtn}
          >
            ➕ Add Product
          </button>
        </div>
      );
    }

    return (
      <ProductGrid
        products={products}
        showAddCard={true}
        onAddClick={handleAddProductClick}
        cardWidth={effectiveCardWidth}
        gap={GRID_GAP}
      />
    );
  };

  const showHeader = !loading && !networkError;

  return (
    <div style={productsPageStyles.container}>
      {/* Header */}

      {/* {showHeader && (
        <div style={productsPageStyles.headerRow}>
          <div style={productsPageStyles.headerLeft}>
            <div style={productsPageStyles.titleWrapper}>
              <h2 style={productsPageStyles.title}>My Products</h2>
              <div style={productsPageStyles.titleUnderline} />
            </div>
          </div>
        </div>
      )} */}

      {showHeader && (
        <div style={productsPageStyles.headerRow}>
          <div style={productsPageStyles.headerLeft}>
            <div style={productsPageStyles.titleWrapper}>
              <h2 style={productsPageStyles.title}>My Products</h2>
              <div style={productsPageStyles.titleUnderline} />
            </div>
          </div>

          {/* 🔍 Search + Category Controls */}
          <div style={productsPageStyles.headerRight}>
            <div style={productsPageStyles.filterBar}>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearchInput(e.target.value)}
                style={productsPageStyles.searchInput}
              />

              {/* Category Dropdown */}
              <div style={productsPageStyles.customSelectWrapper}>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  style={productsPageStyles.customSelect}
                >
                  <option value="">All Categories</option>
                  {Object.entries(CATEGORY_MAP).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
                <span style={productsPageStyles.dropdownArrow}>▼</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div ref={containerRef} style={productsPageStyles.gridContainer}>
        {renderContent()}
      </div>

      {/* Pagination */}
      {!networkError && !loading && products.length > 0 && meta.totalPages > 1 && (
        <div style={productsPageStyles.paginationRow}>
          <Pagination
            current={meta.page}
            total={meta.totalPages}
            onChange={handlePageChange}
            styles={{
              container: productsPageStyles.paginationContainer,
              btn: productsPageStyles.paginationBtn,
              btnActive: productsPageStyles.paginationBtnActive,
              btnDisabled: productsPageStyles.paginationBtnDisabled,
            }}
          />
        </div>
      )}

      {/* Add Product Modal */}
      <ProductAddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleProductAdded}
      />
    </div>
  );
};

export default ProductsPage;

// // FILE: src/pages/ProductsPage/ProductsPage.jsx

// // FILE: src/pages/ProductsPage/ProductsPage.jsx

// import { useEffect, useRef, useState, useCallback } from "react";

// import { COLORS } from "../../constants/colors";
// import { productsPageStyles } from "./ProductsPage.styles";

// import Pagination from "../../components/Pagination/Pagination";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
// import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// // API Calls
// import { fetchSellerProducts } from "../../api/products";

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
//   const [loading, setLoading] = useState(true);
//   const [networkError, setNetworkError] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   const CARD_MIN = 240;
//   const CARD_MAX = 360;
//   const GRID_GAP = 24;
//   const ROWS_PER_PAGE = 5;

//   // 🧮 Measure container width for responsive grid
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

//   // 📦 Load products (server-side pagination)
//   const loadProducts = useCallback(
//     async (page = 1) => {
//       setLoading(true);
//       try {
//         const response = await fetchSellerProducts({
//           page,
//           limit: 24, // 5 rows × 5 columns
//         });

//         setProducts(response.data || []);
//         setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
//         setNetworkError(false);
//       } catch (err) {
//         console.error("Error loading products:", err);
//         setNetworkError(true);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   // Fetch whenever page changes
//   useEffect(() => {
//     loadProducts(currentPage);
//   }, [currentPage, loadProducts]);

//   // 💡 Compute responsive card dimensions
//   const cardWidth = Math.max(
//     CARD_MIN,
//     Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
//   );
//   const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

//   const columns = Math.max(
//     1,
//     Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
//   );

//   // 🧭 Handlers
//   const handleAddProductClick = () => setShowAddModal(true);

//   const handleProductAdded = async () => {
//     await loadProducts(currentPage); // reload same page
//     setShowAddModal(false);
//   };

//   const handlePageChange = (page) => {
//     if (page !== currentPage) setCurrentPage(page);
//   };

//   // 🎨 Render sectioned content
//   const renderContent = () => {
//     if (loading) {
//       return (
//         <div style={productsPageStyles.loadingContainer}>
//           <div style={productsPageStyles.loadingSpinner}></div>
//           <p style={productsPageStyles.loadingText}>Loading products…</p>
//         </div>
//       );
//     }

//     if (networkError) {
//       return (
//         <div style={productsPageStyles.networkErrorContainer}>
//           <NetworkErrorIcon />
//           <h4 style={productsPageStyles.networkErrorTitle}>No Network Connection</h4>
//           <p style={productsPageStyles.networkErrorText}>
//             Kindly check your internet connection and try again.
//           </p>
//           <button
//             className="btn"
//             style={{
//               ...productsPageStyles.retryBtn,
//               backgroundColor: COLORS.primary,
//               color: COLORS.white,
//               border: `1px solid ${COLORS.primary}`,
//             }}
//             onClick={() => loadProducts(currentPage)}
//           >
//             Retry
//           </button>
//         </div>
//       );
//     }

//     if (!networkError && products.length === 0) {
//       return (
//         <div style={productsPageStyles.emptyState}>
//           <p style={productsPageStyles.emptyText}>You have no products yet.</p>
//           <button
//             className="btn btn-outline-primary"
//             onClick={handleAddProductClick}
//             style={productsPageStyles.addProductBtn}
//           >
//             ➕ Add Product
//           </button>
//         </div>
//       );
//     }

//     return (
//       <ProductGrid
//         products={products}
//         showAddCard={true}
//         onAddClick={handleAddProductClick}
//         cardWidth={effectiveCardWidth}
//         gap={GRID_GAP}
//       />
//     );
//   };

//   const showHeader = !loading && !networkError;

//   return (
//     <div style={productsPageStyles.container}>
//       {/* Header */}
//       {showHeader && (
//         <div style={productsPageStyles.headerRow}>
//           <div style={productsPageStyles.headerLeft}>
//             <div style={productsPageStyles.titleWrapper}>
//               <h2 style={productsPageStyles.title}>My Products</h2>
//               <div style={productsPageStyles.titleUnderline} />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Grid Container */}
//       <div ref={containerRef} style={productsPageStyles.gridContainer}>
//         {renderContent()}
//       </div>

//       {/* Pagination */}
//       {!networkError && !loading && products.length > 0 && meta.totalPages > 1 && (
//         <div style={productsPageStyles.paginationRow}>
//           <Pagination
//             current={meta.page}
//             total={meta.totalPages}
//             onChange={handlePageChange}
//             styles={{
//               container: productsPageStyles.paginationContainer,
//               btn: productsPageStyles.paginationBtn,
//               btnActive: productsPageStyles.paginationBtnActive,
//               btnDisabled: productsPageStyles.paginationBtnDisabled,
//             }}
//           />
//         </div>
//       )}

//       {/* Add Product Modal */}
//       <ProductAddModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={handleProductAdded}
//       />
//     </div>
//   );
// };

// export default ProductsPage;

