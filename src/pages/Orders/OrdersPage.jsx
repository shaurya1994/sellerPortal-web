// FILE: src/pages/Orders/OrdersPage.jsx

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";

import { COLORS } from "../../constants/colors";
import { ordersPageStyles } from "./OrdersPage.styles";
import { CATEGORY_MAP } from "../../constants/categoryMap";

import OrdersGrid from "../../components/OrdersGrid/OrdersGrid";
import Pagination from "../../components/Pagination/Pagination";

// --- Ultra-light debounce util ---
const debounce = (fn, delay) => {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
  debounced.cancel = () => clearTimeout(timer);
  return debounced;
};

const OrdersPage = () => {
  const { user } = useSelector(selectAuth);
  const role = user?.role || "buyer";
  const isSeller = role === "seller";

  const latestFetchIdRef = useRef(0);
  const containerRef = useRef(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [isInitialMeasure, setIsInitialMeasure] = useState(true);

  // --- Filters ---
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // --- Pagination ---
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

  // --- Grid refresh signal ---
  const [clearSignal, setClearSignal] = useState(0);
  const ITEMS_PER_PAGE = 18;

  // --- Responsive handling ---
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(Math.floor(entry.contentRect.width));
        setIsInitialMeasure(false);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Debounced search input ---
  const handleSearchInputChange = useCallback(
    debounce((val) => setSearchInput(val), 120),
    []
  );

  const handleSearchSubmit = () => {
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSearchSubmit();

  const handleClear = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedCategory("");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
    setClearSignal((s) => s + 1);
  };

  const handleClearDatesFromGrid = () => {
    setDateFrom("");
    setDateTo("");
    setClearSignal((s) => s + 1);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const handleDateChange = (field, value) => {
    if (field === "from") setDateFrom(value);
    else setDateTo(value);
    setCurrentPage(1);
  };

  // --- Debounced pagination ---
  const handlePageChange = useMemo(
    () =>
      debounce((page) => {
        setCurrentPage((prev) => (page !== prev ? page : prev));
      }, 150),
    []
  );

  useEffect(() => {
    return () => handlePageChange.cancel();
  }, [handlePageChange]);

  return (
    <div style={ordersPageStyles.container}>
      {/* HEADER */}
      <div style={ordersPageStyles.headerRow}>
        <div style={ordersPageStyles.titleWrapper}>
          <h2 style={ordersPageStyles.title}>
            {isSeller ? "My Orders" : "Orders"}
          </h2>
          <div style={ordersPageStyles.titleUnderline} />
        </div>

        {/* FILTER BAR */}
        <div style={ordersPageStyles.filterBar}>
          <input
            type="text"
            placeholder="Search orders..."
            onChange={(e) => handleSearchInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={ordersPageStyles.searchInput}
          />

          <button
            onClick={handleSearchSubmit}
            style={ordersPageStyles.searchBtn}
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
            style={ordersPageStyles.clearBtn}
            onClick={handleClear}
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

          {/* DATE RANGE */}
          <div style={ordersPageStyles.dateRangeWrapper}>
            <label style={ordersPageStyles.dateLabel}>From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => handleDateChange("from", e.target.value)}
              style={ordersPageStyles.dateInput}
            />
            <label style={ordersPageStyles.dateLabel}>To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => handleDateChange("to", e.target.value)}
              style={ordersPageStyles.dateInput}
            />
          </div>

          {/* CATEGORY FILTER */}
          <div style={ordersPageStyles.customSelectWrapper}>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              style={ordersPageStyles.customSelect}
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_MAP).map(([id, label]) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
            <span style={ordersPageStyles.dropdownArrow}>▼</span>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div ref={containerRef} style={ordersPageStyles.gridContainer}>
        <OrdersGrid
          role={role}
          dateFrom={dateFrom}
          dateTo={dateTo}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          clearSignal={clearSignal}
          onClearDates={handleClearDatesFromGrid}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          isInitialMeasure={isInitialMeasure}
          latestFetchIdRef={latestFetchIdRef}
          onMetaUpdate={setMeta}
          onResetPage={() => setCurrentPage(1)}
        />
      </div>

      {/* PAGINATION */}
      {meta.totalPages > 1 && (
        <div style={ordersPageStyles.paginationRow}>
          <Pagination
            current={meta.page}
            total={meta.totalPages}
            onChange={handlePageChange}
            withRowWrapper
          />
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

// // FILE: src/pages/Orders/OrdersPage.jsx

// import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// import { COLORS } from "../../constants/colors";
// import { ordersPageStyles } from "./OrdersPage.styles";
// import { CATEGORY_MAP } from "../../constants/categoryMap";

// import OrdersGrid from "../../components/OrdersGrid/OrdersGrid";
// import Pagination from "../../components/Pagination/Pagination";

// // Ultra-light debounce util
// const debounce = (fn, delay) => {
//   let timer;

//   function debounced(...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => fn(...args), delay);
//   }
//   debounced.cancel = () => clearTimeout(timer);
//   return debounced;
// };

// const OrdersPage = () => {
//   const latestFetchIdRef = useRef(0);
//   const containerRef = useRef(null);

//   const [containerWidth, setContainerWidth] = useState(0);
//   const [isInitialMeasure, setIsInitialMeasure] = useState(true);

//   // Filters
//   const [searchInput, setSearchInput] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });

//   // Signal for OrdersGrid
//   const [clearSignal, setClearSignal] = useState(0);

//   const ITEMS_PER_PAGE = 18;


//   // Use ResizeObserver instead of window resize (no layout thrash)
  
//   useEffect(() => {
//     if (!containerRef.current) return;
//     const observer = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         setContainerWidth(Math.floor(entry.contentRect.width));
//         setIsInitialMeasure(false);
//       }
//     });

//     observer.observe(containerRef.current);
//     return () => observer.disconnect();
//   }, []);

//   // Debounced user typing (does not trigger search until submission)
//   const handleSearchInputChange = useCallback(
//     debounce((value) => setSearchInput(value), 120),
//     []
//   );

//   const onChangeSearch = (e) => {
//     const val = e.target.value;
//     handleSearchInputChange(val);
//   };

//   // Apply search only on submit (user action)
//   const handleSearchSubmit = () => {
//     setSearchTerm(searchInput.trim());
//     setCurrentPage(1);
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleSearchSubmit();

//   const handleClear = () => {
//     setSearchInput("");
//     setSearchTerm("");
//     setSelectedCategory("");
//     setDateFrom("");
//     setDateTo("");
//     setCurrentPage(1);
//     setClearSignal((s) => s + 1);
//   };

//   const handleClearDatesFromGrid = () => {
//     setDateFrom("");
//     setDateTo("");
//     setClearSignal((s) => s + 1);
//   };

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
//   };

//   const handleDateChange = (field, value) => {
//     if (field === "from") setDateFrom(value);
//     else setDateTo(value);
//     setCurrentPage(1);
//   };

//   // Debounced pagination to prevent burst API calls
//   const handlePageChange = useMemo(
//     () =>
//       debounce((page) => {
//         setCurrentPage((prev) => (page !== prev ? page : prev));
//       }, 150),
//     []
//   );

//   useEffect(() => {
//     return () => handlePageChange.cancel();
//   }, [handlePageChange]);

//   return (
//     <div style={ordersPageStyles.container}>
//       {/* HEADER */}
//       <div style={ordersPageStyles.headerRow}>
//         <div style={ordersPageStyles.titleWrapper}>
//           <h2 style={ordersPageStyles.title}>My Orders</h2>
//           <div style={ordersPageStyles.titleUnderline} />
//         </div>

//         {/* RIGHT: Filters */}
//         <div style={ordersPageStyles.filterBar}>
//           <input
//             type="text"
//             placeholder="Search orders..."
//             onChange={onChangeSearch}
//             onKeyDown={handleKeyDown}
//             style={ordersPageStyles.searchInput}
//           />

//           <button
//             onClick={handleSearchSubmit}
//             style={ordersPageStyles.searchBtn}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = COLORS.text;
//               e.currentTarget.style.borderColor = COLORS.text;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = COLORS.primary;
//               e.currentTarget.style.borderColor = COLORS.primary;
//             }}
//           >
//             Search
//           </button>

//           <button
//             style={ordersPageStyles.clearBtn}
//             onClick={handleClear}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.backgroundColor = COLORS.text;
//               e.currentTarget.style.color = COLORS.white;
//               e.currentTarget.style.borderColor = COLORS.text;
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = "transparent";
//               e.currentTarget.style.color = COLORS.primary;
//               e.currentTarget.style.borderColor = COLORS.primary;
//             }}
//           >
//             Clear
//           </button>

//           {/* Date Range */}
//           <div style={ordersPageStyles.dateRangeWrapper}>
//             <label style={ordersPageStyles.dateLabel}>From:</label>
//             <input
//               type="date"
//               value={dateFrom}
//               onChange={(e) => handleDateChange("from", e.target.value)}
//               style={ordersPageStyles.dateInput}
//             />
//             <label style={ordersPageStyles.dateLabel}>To:</label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => handleDateChange("to", e.target.value)}
//               style={ordersPageStyles.dateInput}
//             />
//           </div>

//           {/* Category */}
//           <div style={ordersPageStyles.customSelectWrapper}>
//             <select
//               value={selectedCategory}
//               onChange={(e) => handleCategoryChange(e.target.value)}
//               style={ordersPageStyles.customSelect}
//             >
//               <option value="">All Categories</option>
//               {Object.entries(CATEGORY_MAP).map(([id, label]) => (
//                 <option key={id} value={id}>
//                   {label}
//                 </option>
//               ))}
//             </select>
//             <span style={ordersPageStyles.dropdownArrow}>▼</span>
//           </div>
//         </div>
//       </div>

//       {/* GRID */}
//       <div ref={containerRef} style={ordersPageStyles.gridContainer}>
//         <OrdersGrid
//           dateFrom={dateFrom}
//           dateTo={dateTo}
//           searchTerm={searchTerm}
//           selectedCategory={selectedCategory}
//           clearSignal={clearSignal}
//           onClearDates={handleClearDatesFromGrid}
//           currentPage={currentPage}
//           itemsPerPage={ITEMS_PER_PAGE}
//           isInitialMeasure={isInitialMeasure}
//           latestFetchIdRef={latestFetchIdRef}
//           onMetaUpdate={setMeta}
//           onResetPage={() => setCurrentPage(1)}
//         />
//       </div>

//       {/* PAGINATION */}
//       {meta.totalPages > 1 && (
//         <div style={ordersPageStyles.paginationRow}>
//           <Pagination
//             current={meta.page}
//             total={meta.totalPages}
//             onChange={handlePageChange}
//             withRowWrapper
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;
