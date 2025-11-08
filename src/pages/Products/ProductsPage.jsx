// FILE: src/pages/ProductsPage/ProductsPage.jsx

import { useEffect, useRef, useState, useCallback } from "react";
import { COLORS } from "../../constants/colors";
import { productsPageStyles } from "./ProductsPage.styles";

import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// import { fetchSellerProducts } from "../../api/products";
import { fetchProducts } from "../../api/products";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

import { CATEGORY_MAP } from "../../constants/categoryMap";

const ProductsPage = () => {
  // --- STATES ---
  const latestFetchIdRef = useRef(0);

  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialMeasure, setIsInitialMeasure] = useState(true);

  // --- CONSTANTS ---
  const CARD_MIN = 240;
  const CARD_MAX = 360;
  const GRID_GAP = 24;
  const ROWS_PER_PAGE = 5;

  // --- MEASURE CONTAINER WIDTH ---
  const measure = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      setContainerWidth(Math.floor(el.getBoundingClientRect().width));
      setIsInitialMeasure(false);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // --- COMPUTE GRID DIMENSIONS ---
  const cardWidth = Math.max(
    CARD_MIN,
    Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
  );
  const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));
  const columns = Math.max(
    1,
    Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
  );

  const totalGridSlots = ROWS_PER_PAGE * columns;
  const itemsPerPage = Math.max(1, totalGridSlots - 1);

  const { user } = useSelector(selectAuth);
  const role = user?.role || "buyer";

  // --- DATA FETCHER ---
  const loadProducts = useCallback(
    async (page = 1) => {
      const fetchId = ++latestFetchIdRef.current;
      setLoading(true);

      try {
        const response = await fetchProducts(
          {
            page,
            limit: itemsPerPage,
            search: searchTerm || "",
            category_id: selectedCategory || "",
          },
          role
        );

        if (fetchId === latestFetchIdRef.current) {
          setProducts(response.data || []);
          setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
          setNetworkError(false);
        }
      } catch (err) {
        if (fetchId === latestFetchIdRef.current) {
          console.error("Error loading products:", err);
          setNetworkError(true);
          setProducts([]);
        }
      } finally {
        if (fetchId === latestFetchIdRef.current) {
          setLoading(false);
        }
      }
    },
    [itemsPerPage, searchTerm, selectedCategory, role]
  );

  useEffect(() => {
    if (!isInitialMeasure) {
      loadProducts(currentPage);
    }
  }, [currentPage, searchTerm, selectedCategory, itemsPerPage, loadProducts, isInitialMeasure]);

  useEffect(() => {
    if (!loading && products.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage, loading, products.length]);

  // --- HANDLERS ---
  const handleAddProductClick = () => setShowAddModal(true);

  const handleProductAdded = async () => {
    await loadProducts(currentPage);
    setShowAddModal(false);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const handleSearchClear = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory("");
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSearchSubmit();

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  // --- RENDER LOGIC ---
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
            style={productsPageStyles.retryBtn}
            onClick={() => loadProducts(currentPage)}
          >
            Retry
          </button>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div style={productsPageStyles.emptyState}>
          <p style={productsPageStyles.emptyText}>You have no products yet.</p>
          <button
            onClick={handleAddProductClick}
            style={productsPageStyles.addProductBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.text;
              e.currentTarget.style.borderColor = COLORS.text;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.primary;
              e.currentTarget.style.borderColor = COLORS.primary;
            }}
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
      {showHeader && (
        <div style={productsPageStyles.headerRow}>
          <div style={productsPageStyles.headerLeft}>
            <div style={productsPageStyles.titleWrapper}>
              <h2 style={productsPageStyles.title}>My Products</h2>
              <div style={productsPageStyles.titleUnderline} />
            </div>
          </div>

          <div style={productsPageStyles.headerRight}>
            <div style={productsPageStyles.filterBar}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                style={productsPageStyles.searchInput}
              />

              <button
                onClick={handleSearchSubmit}
                style={productsPageStyles.searchBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                  e.currentTarget.style.borderColor = COLORS.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.primary;
                  e.currentTarget.style.borderColor = COLORS.primary;
                }}
              >
                Search
              </button>

              <button
                onClick={handleSearchClear}
                style={productsPageStyles.clearBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.text;
                  e.currentTarget.style.color = COLORS.white;
                  e.currentTarget.style.borderColor = COLORS.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = COLORS.primary;
                  e.currentTarget.style.borderColor = COLORS.primary;
                }}
              >
                Clear
              </button>

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

      <div ref={containerRef} style={productsPageStyles.gridContainer}>
        {renderContent()}
      </div>

      {!networkError && !loading && products.length > 0 && meta.totalPages > 1 && (
        <div style={productsPageStyles.paginationRow}>
          <Pagination
            current={meta.page}
            total={meta.totalPages}
            onChange={handlePageChange}
            withRowWrapper
          />
        </div>
      )}

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

// import { useEffect, useRef, useState, useCallback } from "react";
// import { COLORS } from "../../constants/colors";
// import { productsPageStyles } from "./ProductsPage.styles";

// import Pagination from "../../components/Pagination/Pagination";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import ProductAddModal from "../../components/ProductAddModal/ProductAddModal";
// import NetworkErrorIcon from "../../components/NetworkErrorIcon/NetworkErrorIcon";

// // import { fetchSellerProducts } from "../../api/products";
// import { fetchProducts } from "../../api/products";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../store/authSlice";

// import { CATEGORY_MAP } from "../../constants/categoryMap";

// const ProductsPage = () => {
//   // --- STATES ---
//   const latestFetchIdRef = useRef(0);

//   const [products, setProducts] = useState([]);
//   const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  
//   const [loading, setLoading] = useState(true);
//   const [networkError, setNetworkError] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);

//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);
//   const [isInitialMeasure, setIsInitialMeasure] = useState(true);

//   // --- CONSTANTS ---
//   const CARD_MIN = 240;
//   const CARD_MAX = 360;
//   const GRID_GAP = 24;
//   const ROWS_PER_PAGE = 5;

//   // --- MEASURE CONTAINER WIDTH ---
//   const measure = useCallback(() => {
//     const el = containerRef.current;
//     if (el) {
//       setContainerWidth(Math.floor(el.getBoundingClientRect().width));
//       setIsInitialMeasure(false);
//     }
//   }, []);

//   useEffect(() => {
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [measure]);

//   // --- COMPUTE GRID DIMENSIONS ---
//   const cardWidth = Math.max(
//     CARD_MIN,
//     Math.min(Math.round(containerWidth * 0.18 || CARD_MAX), CARD_MAX)
//   );
//   const effectiveCardWidth = Math.min(cardWidth, Math.max(120, containerWidth - 40));
//   const columns = Math.max(
//     1,
//     Math.floor((containerWidth + GRID_GAP) / (effectiveCardWidth + GRID_GAP))
//   );

//   const totalGridSlots = ROWS_PER_PAGE * columns;
//   const itemsPerPage = Math.max(1, totalGridSlots - 1);

//   // --- DATA FETCHER ---
//   // const loadProducts = useCallback(
//   //   async (page = 1) => {
//   //     const fetchId = ++latestFetchIdRef.current;

//   //     setLoading(true);
//   //     try {
//   //       const response = await fetchSellerProducts({
//   //         page,
//   //         limit: itemsPerPage,
//   //         search: searchTerm || "",
//   //         category_id: selectedCategory || "",
//   //       });

//   //       if (fetchId === latestFetchIdRef.current) {
//   //         setProducts(response.data || []);
//   //         setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
//   //         setNetworkError(false);
//   //       }
//   //     } catch (err) {
//   //       if (fetchId === latestFetchIdRef.current) {
//   //         console.error("Error loading products:", err);
//   //         setNetworkError(true);
//   //         setProducts([]);
//   //       }
//   //     } finally {
//   //       if (fetchId === latestFetchIdRef.current) {
//   //         setLoading(false);
//   //       }
//   //     }
//   //   },
//   //   [itemsPerPage, searchTerm, selectedCategory]
//   // );
  
//   const { user } = useSelector(selectAuth);
//   const role = user?.role || "buyer";

//   // --- DATA FETCHER ---
//   const loadProducts = useCallback(
//     async (page = 1) => {
//       const fetchId = ++latestFetchIdRef.current;
//       setLoading(true);

//       try {
//         const response = await fetchProducts(
//           {
//             page,
//             limit: itemsPerPage,
//             search: searchTerm || "",
//             category_id: selectedCategory || "",
//           },
//           role
//         );

//         if (fetchId === latestFetchIdRef.current) {
//           setProducts(response.data || []);
//           setMeta(response.meta || { page: 1, totalPages: 1, total: 0 });
//           setNetworkError(false);
//         }
//       } catch (err) {
//         if (fetchId === latestFetchIdRef.current) {
//           console.error("Error loading products:", err);
//           setNetworkError(true);
//           setProducts([]);
//         }
//       } finally {
//         if (fetchId === latestFetchIdRef.current) {
//           setLoading(false);
//         }
//       }
//     },
//     [itemsPerPage, searchTerm, selectedCategory, role]
//   );

//   useEffect(() => {
//     if (!isInitialMeasure) {
//       loadProducts(currentPage);
//     }
//   }, [currentPage, searchTerm, selectedCategory, itemsPerPage, loadProducts, isInitialMeasure]);

//   useEffect(() => {
//     if (!loading && products.length > 0) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   }, [currentPage, loading, products.length]);

//   // --- HANDLERS ---
//   const handleAddProductClick = () => setShowAddModal(true);

//   const handleProductAdded = async () => {
//     await loadProducts(currentPage);
//     setShowAddModal(false);
//   };

//   const handlePageChange = (page) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSearchSubmit = () => {
//     setSearchTerm(searchInput.trim());
//     setCurrentPage(1);
//   };

//   const handleSearchClear = () => {
//     setSearchInput("");
//     setSearchTerm("");
//     setSelectedCategory("");
//     setCurrentPage(1);
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleSearchSubmit();

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
//   };

//   // --- RENDER LOGIC ---
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
//             style={productsPageStyles.retryBtn}
//             onClick={() => loadProducts(currentPage)}
//           >
//             Retry
//           </button>
//         </div>
//       );
//     }

//     if (products.length === 0) {
//       return (
//         <div style={productsPageStyles.emptyState}>
//           <p style={productsPageStyles.emptyText}>You have no products yet.</p>
//           <button
//             onClick={handleAddProductClick}
//             style={productsPageStyles.addProductBtn}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = COLORS.text;
//               e.currentTarget.style.borderColor = COLORS.text;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = COLORS.primary;
//               e.currentTarget.style.borderColor = COLORS.primary;
//             }}
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
//       {showHeader && (
//         <div style={productsPageStyles.headerRow}>
//           <div style={productsPageStyles.headerLeft}>
//             <div style={productsPageStyles.titleWrapper}>
//               <h2 style={productsPageStyles.title}>My Products</h2>
//               <div style={productsPageStyles.titleUnderline} />
//             </div>
//           </div>

//           <div style={productsPageStyles.headerRight}>
//             <div style={productsPageStyles.filterBar}>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 style={productsPageStyles.searchInput}
//               />

//               <button
//                 onClick={handleSearchSubmit}
//                 style={productsPageStyles.searchBtn}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = COLORS.text;
//                   e.currentTarget.style.borderColor = COLORS.text;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = COLORS.primary;
//                   e.currentTarget.style.borderColor = COLORS.primary;
//                 }}
//               >
//                 Search
//               </button>

//               <button
//                 onClick={handleSearchClear}
//                 style={productsPageStyles.clearBtn}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.backgroundColor = COLORS.text;
//                   e.currentTarget.style.color = COLORS.white;
//                   e.currentTarget.style.borderColor = COLORS.text;
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.backgroundColor = "transparent";
//                   e.currentTarget.style.color = COLORS.primary;
//                   e.currentTarget.style.borderColor = COLORS.primary;
//                 }}
//               >
//                 Clear
//               </button>

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

//       <div ref={containerRef} style={productsPageStyles.gridContainer}>
//         {renderContent()}
//       </div>

//       {!networkError && !loading && products.length > 0 && meta.totalPages > 1 && (
//         <div style={productsPageStyles.paginationRow}>
//           <Pagination
//             current={meta.page}
//             total={meta.totalPages}
//             onChange={handlePageChange}
//             withRowWrapper
//           />
//         </div>
//       )}

//       <ProductAddModal
//         show={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         onSubmit={handleProductAdded}
//       />
//     </div>
//   );
// };

// export default ProductsPage;
