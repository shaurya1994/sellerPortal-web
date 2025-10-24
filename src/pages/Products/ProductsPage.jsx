// FILE: src/pages/ProductsPage/ProductsPage.jsx

// FILE: src/pages/ProductsPage/ProductsPage.jsx

import { useEffect, useRef, useState, useCallback } from "react";

import { COLORS } from "../../constants/colors";
import { productsPageStyles } from "./ProductsPage.styles";

import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// API Calls
import { fetchSellerProducts } from "../../api/products";

// Category map (adjust import path as needed)
import { CATEGORY_MAP } from "../../constants/categoryMap";


const ProductsPage = () => {
  // Data + meta
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  // UI state
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Search / filters
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // committed term for fetching
  const [selectedCategory, setSelectedCategory] = useState("");

  // Pagination & layout
  const [currentPage, setCurrentPage] = useState(1);

  // Responsive grid measuring
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Constants
  const CARD_MIN = 240;
  const CARD_MAX = 360;
  const GRID_GAP = 24;
  const ROWS_PER_PAGE = 5;

  // 🧮 Measure container width
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

  // 📐 Calculate responsive columns
  const cardWidth = Math.max(
    CARD_MIN,
    Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
  );
  const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

  const columns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
  );

  // ✅ Professional fix for 24 items per page (account for AddProductCard)
  const totalGridSlots = ROWS_PER_PAGE * columns;
  const itemsPerPage = Math.max(1, totalGridSlots - 1); // 1 reserved for AddProductCard

  // 📦 Fetch products
  const loadProducts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await fetchSellerProducts({
          page,
          limit: itemsPerPage,
          search: searchTerm || "",
          category_id: selectedCategory || "",
        });

        setProducts(response.data || []);
        setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });

        if (response.meta && response.meta.page && response.meta.page !== currentPage) {
          setCurrentPage(response.meta.page);
        }

        setNetworkError(false);
      } catch (err) {
        console.error("Error loading products:", err);
        setNetworkError(true);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, searchTerm, selectedCategory, currentPage]
  );

  useEffect(() => {
    loadProducts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, selectedCategory, itemsPerPage]);

  // 🧭 Handlers
  const handleAddProductClick = () => setShowAddModal(true);

  const handleProductAdded = async () => {
    await loadProducts(currentPage);
    setShowAddModal(false);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) setCurrentPage(page);
  };

  // 🔍 Search logic
  const handleSearchChange = (value) => {
    setSearchInput(value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory(""); // ✅ also reset category
    setCurrentPage(1);
  };

  // 🗂 Category filter
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // 🎨 Content renderer
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
            onClick={handleAddProductClick}
            style={{
              ...productsPageStyles.addProductBtn,
              backgroundColor: COLORS.primary,
              color: COLORS.white,
              border: `1.5px solid ${COLORS.primary}`,
              fontWeight: 600,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = COLORS.text)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = COLORS.primary)
            }
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
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                style={productsPageStyles.searchInput}
                aria-label="Search products"
              />

              <button
                onClick={handleSearchSubmit}
                style={productsPageStyles.searchBtn}
                aria-label="Search"
              >
                Search
              </button>

              <button
                onClick={handleSearchClear}
                style={{
                  ...productsPageStyles.searchBtn,
                  backgroundColor: "transparent",
                  color: COLORS.primary,
                  borderColor: COLORS.primary,
                }}
                aria-label="Clear search"
                title="Clear search and filters"
              >
                Clear
              </button>

              <div style={productsPageStyles.customSelectWrapper}>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  style={productsPageStyles.customSelect}
                  aria-label="Filter by category"
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


// import { useEffect, useRef, useState, useCallback } from "react";

// import { COLORS } from "../../constants/colors";
// import { CATEGORY_MAP } from "../../constants/categoryMap";

// import { productsPageStyles } from "./ProductsPage.styles";

// import Pagination from "../../components/Pagination/Pagination";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
// import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// // API Calls
// import { fetchSellerProducts } from "../../api/products";


// const ProductsPage = () => {
//   // Data + meta
//   const [products, setProducts] = useState([]);
//   const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

//   // UI state
//   const [loading, setLoading] = useState(true);
//   const [networkError, setNetworkError] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);

//   // Search / filters (controlled)
//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState(""); // committed search used for fetch
//   const [selectedCategory, setSelectedCategory] = useState("");

//   // Pagination & layout
//   const [currentPage, setCurrentPage] = useState(1);

//   // Responsive grid measuring
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // Constants
//   const CARD_MIN = 240;
//   const CARD_MAX = 360;
//   const GRID_GAP = 24;
//   const ROWS_PER_PAGE = 5;

//   // Measure container width to compute columns
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

//   // Compute responsive sizes
//   const cardWidth = Math.max(
//     CARD_MIN,
//     Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
//   );
//   const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));

//   const columns = Math.max(
//     1,
//     Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
//   );

//   // Number of items requested per page (keeps your 5 rows UX)
//   const itemsPerPage = 24
//   const itemsPerPage = Math.max(1, ROWS_PER_PAGE * columns);

//   // Fetcher (uses current filters & computed limit)
//   const loadProducts = useCallback(
//     async (page = 1) => {
//       setLoading(true);
//       try {
//         const response = await fetchSellerProducts({
//           page,
//           limit: itemsPerPage,
//           search: searchTerm || "",
//           category_id: selectedCategory || "",
//         });

//         // response expected: { message, data, meta }
//         setProducts(response.data || []);
//         setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });

//         // sync local page in case backend normalized it
//         if (response.meta && response.meta.page && response.meta.page !== currentPage) {
//           setCurrentPage(response.meta.page);
//         }

//         setNetworkError(false);
//       } catch (err) {
//         console.error("Error loading products:", err);
//         setNetworkError(true);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     // dependencies: itemsPerPage, searchTerm, selectedCategory, currentPage used only for sync above
//     [itemsPerPage, searchTerm, selectedCategory, currentPage]
//   );

//   // Trigger load whenever page, searchTerm, selectedCategory, or itemsPerPage changes
//   useEffect(() => {
//     loadProducts(currentPage);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, searchTerm, selectedCategory, itemsPerPage]);

//   // Handlers
//   const handleAddProductClick = () => setShowAddModal(true);

//   const handleProductAdded = async () => {
//     // reload current page after adding a product
//     await loadProducts(currentPage);
//     setShowAddModal(false);
//   };

//   const handlePageChange = (page) => {
//     if (page !== currentPage) setCurrentPage(page);
//   };

//   // Search handlers: typing updates input only; clicking Search commits it
//   const handleSearchChange = (value) => {
//     setSearchInput(value);
//   };

//   const handleSearchSubmit = () => {
//     // commit search and reset to page 1
//     setSearchTerm(searchInput.trim());
//     setCurrentPage(1);
//   };

//   const handleSearchClear = () => {
//     setSearchInput("");
//     setSearchTerm("");
//     setCurrentPage(1);
//   };

//   // Category change: immediately commit filter and reset to page 1
//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
//   };

//   // Render content (loading / network / empty / grid)
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

//           {/* Search + Category Controls */}
//           <div style={productsPageStyles.headerRight}>
//             <div style={productsPageStyles.filterBar}>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchInput}
//                 onChange={(e) => handleSearchChange(e.target.value)}
//                 style={productsPageStyles.searchInput}
//                 aria-label="Search products"
//               />

//               <button
//                 onClick={handleSearchSubmit}
//                 style={productsPageStyles.searchBtn}
//                 aria-label="Search"
//               >
//                 Search
//               </button>

//               <button
//                 onClick={handleSearchClear}
//                 style={{
//                   ...productsPageStyles.searchBtn,
//                   backgroundColor: "transparent",
//                   color: COLORS.primary,
//                   borderColor: COLORS.primary,
//                 }}
//                 aria-label="Clear search"
//                 title="Clear search"
//               >
//                 Clear
//               </button>

//               <div style={productsPageStyles.customSelectWrapper}>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => handleCategoryChange(e.target.value)}
//                   style={productsPageStyles.customSelect}
//                   aria-label="Filter by category"
//                 >
//                   <option value="">All Categories</option>
//                   {Object.entries(CATEGORY_MAP).map(([id, label]) => (
//                     <option key={id} value={id}>
//                       {label}
//                     </option>
//                   ))}
//                 </select>
//                 <span style={productsPageStyles.dropdownArrow}>▼</span>
//               </div>
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

// // FILE: src/pages/ProductsPage/ProductsPage.jsx

// import { useEffect, useRef, useState, useCallback } from "react";

// import { COLORS } from "../../constants/colors";
// import { CATEGORY_MAP } from "../../constants/categoryMap";

// import { productsPageStyles } from "./ProductsPage.styles";

// import Pagination from "../../components/Pagination/Pagination";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
// import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// // API Calls
// import { fetchSellerProducts } from "../../api/products";

// // Simple debounce utility
// function debounce(fn, delay) {
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   };
// }

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
//   // const ROWS_PER_PAGE = 5;

//   // Search start 
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1); // reset pagination
//   };

//   const handleSearchInput = useCallback(
//     debounce((value) => {
//       setSearchTerm(value);
//       setCurrentPage(1); // reset pagination when searching
//     }, 400),
//     []
//   );
//   // End

//   // Measure container width for responsive grid
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

//   // Load products (server-side pagination)
//   const loadProducts = useCallback(
//     async (page = 1) => {
//       setLoading(true);

//       try {
//         const response = await fetchSellerProducts({
//           page,
//           limit: 24,
//           search: searchTerm,
//           category_id: selectedCategory,
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
//     [searchTerm, selectedCategory]
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

//           {/* 🔍 Search + Category Controls */}
//           <div style={productsPageStyles.headerRight}>
//             <div style={productsPageStyles.filterBar}>
//               {/* Search Input */}
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => handleSearchInput(e.target.value)}
//                 style={productsPageStyles.searchInput}
//               />

//               {/* Category Dropdown */}
//               <div style={productsPageStyles.customSelectWrapper}>
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => handleCategoryChange(e.target.value)}
//                   style={productsPageStyles.customSelect}
//                 >
//                   <option value="">All Categories</option>
//                   {Object.entries(CATEGORY_MAP).map(([id, label]) => (
//                     <option key={id} value={id}>
//                       {label}
//                     </option>
//                   ))}
//                 </select>
//                 <span style={productsPageStyles.dropdownArrow}>▼</span>
//               </div>
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
