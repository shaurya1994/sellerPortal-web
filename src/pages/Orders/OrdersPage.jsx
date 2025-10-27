// FILE: src/pages/Orders/OrdersPage.jsx

import { useState, useEffect, useRef, useCallback } from "react";
import { COLORS } from "../../constants/colors";
import { ordersPageStyles } from "./OrdersPage.styles";
import { CATEGORY_MAP } from "../../constants/categoryMap";
import OrdersGrid from "../../components/OrdersGrid/OrdersGrid";

const OrdersPage = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // --- Filters (remain here)
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // signal that Clear was pressed — increments to notify child
  const [clearSignal, setClearSignal] = useState(0);

  const measure = useCallback(() => {
    const el = containerRef.current;
    if (el) setContainerWidth(Math.floor(el.getBoundingClientRect().width));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const handleClear = () => {
    setSearchInput("");
    setSelectedCategory("");
    setDateFrom("");
    setDateTo("");

    // notify OrdersGrid to reset orderType -> 'all'
    setClearSignal((s) => s + 1);
  };

  // OrdersGrid can call this when date validation fails and it wants the page to clear dates
  const handleClearDatesFromGrid = () => {
    setDateFrom("");
    setDateTo("");
    // also notify radio reset if you want
    setClearSignal((s) => s + 1);
  };

  return (
    <div style={ordersPageStyles.container}>
      {/* HEADER */}
      <div style={ordersPageStyles.headerRow}>
        <div style={ordersPageStyles.titleWrapper}>
          <h2 style={ordersPageStyles.title}>My Orders</h2>
          <div style={ordersPageStyles.titleUnderline} />
        </div>

        {/* RIGHT: Filters */}
        <div style={ordersPageStyles.filterBar}>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={ordersPageStyles.searchInput}
          />

          <button
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
            onClick={handleClear} // <-- wired
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

          {/* Date Range */}
          <div style={ordersPageStyles.dateRangeWrapper}>
            <label style={ordersPageStyles.dateLabel}>From:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              style={ordersPageStyles.dateInput}
            />
            <label style={ordersPageStyles.dateLabel}>To:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              style={ordersPageStyles.dateInput}
            />
          </div>

          {/* Category */}
          <div style={ordersPageStyles.customSelectWrapper}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
          dateFrom={dateFrom}
          dateTo={dateTo}
          searchInput={searchInput}
          selectedCategory={selectedCategory}
          clearSignal={clearSignal}
          onClearDates={handleClearDatesFromGrid}
        />
      </div>
    </div>
  );
};

export default OrdersPage;

// FILE: src/pages/Orders/OrdersPage.jsx
// import { useState, useEffect, useRef, useCallback } from "react";
// import { COLORS } from "../../constants/colors";
// import { ordersPageStyles } from "./OrdersPage.styles";
// import { CATEGORY_MAP } from "../../constants/categoryMap";
// import OrdersGrid from "../../components/OrdersGrid/OrdersGrid";

// const OrdersPage = () => {
//   const containerRef = useRef(null);
//   const [containerWidth, setContainerWidth] = useState(0);

//   // Filters remain here
//   const [searchInput, setSearchInput] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const measure = useCallback(() => {
//     const el = containerRef.current;
//     if (el) setContainerWidth(Math.floor(el.getBoundingClientRect().width));
//   }, []);

//   useEffect(() => {
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [measure]);

//   return (
//     <div style={ordersPageStyles.container}>
//       {/* HEADER */}
//       <div style={ordersPageStyles.headerRow}>
//         {/* LEFT: My Orders */}
//         <div style={ordersPageStyles.titleWrapper}>
//           <h2 style={ordersPageStyles.title}>My Orders</h2>
//           <div style={ordersPageStyles.titleUnderline} />
//         </div>

//         {/* RIGHT: Filters */}
//         <div style={ordersPageStyles.filterBar}>
//           <input
//             type="text"
//             placeholder="Search orders..."
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             style={ordersPageStyles.searchInput}
//           />

//           <button
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
//               onChange={(e) => setDateFrom(e.target.value)}
//               style={ordersPageStyles.dateInput}
//             />
//             <label style={ordersPageStyles.dateLabel}>To:</label>
//             <input
//               type="date"
//               value={dateTo}
//               onChange={(e) => setDateTo(e.target.value)}
//               style={ordersPageStyles.dateInput}
//             />
//           </div>

//           {/* Category */}
//           <div style={ordersPageStyles.customSelectWrapper}>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
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
//         {/* Filters passed to OrdersGrid for API + toast handling */}
//         <OrdersGrid
//           dateFrom={dateFrom}
//           dateTo={dateTo}
//           searchInput={searchInput}
//           selectedCategory={selectedCategory}
//         />
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
