// FILE: src/components/OrdersGrid/OrdersGrid.jsx

import { useState, useEffect, useCallback, useRef } from "react";
import { ordersGridStyles } from "./OrdersGrid.styles";
import { COLORS } from "../../constants/colors";
import { fetchOrders } from "../../api/orders";
import OrdersGridCard from "./OrdersGridCard";

const OrdersGrid = ({
  role = "buyer",
  dateFrom,
  dateTo,
  searchTerm,
  selectedCategory,
  clearSignal = 0,
  onClearDates = () => {},
  currentPage,
  itemsPerPage,
  isInitialMeasure,
  latestFetchIdRef,
  onMetaUpdate,
  onResetPage,
}) => {
  const [orderType, setOrderType] = useState("in-process");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < 920);

  const topRef = useRef(null);

  // --- Responsive handling ---
  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth < 920);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset orderType on filter clear
  useEffect(() => setOrderType("in-process"), [clearSignal]);

  const showToast = (msg, color = COLORS.danger, clearDates = false) => {
    const toast = document.createElement("div");
    toast.innerText = msg;
    Object.assign(toast.style, ordersGridStyles.toastContainer || {});
    toast.style.background = color;

    document.body.appendChild(toast);
    requestAnimationFrame(() => (toast.style.opacity = "1"));
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 300);
    }, 2500);

    if (clearDates) onClearDates();
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB");
    } catch {
      return "";
    }
  };

  const formattedFrom = dateFrom ? formatDate(dateFrom) : "";
  const formattedTo = dateTo ? formatDate(dateTo) : "";

  // --- Core data fetcher ---
  const loadOrders = useCallback(
    async (page = 1) => {
      if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
        showToast("'From' date cannot be greater than 'To' date.", COLORS.danger, true);
        return;
      }

      const fetchId = ++latestFetchIdRef.current;
      setLoading(true);

      try {
        const res = await fetchOrders(
          {
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
            status: orderType,
            category_id: selectedCategory || "",
            search: searchTerm || "",
            page,
            limit: itemsPerPage,
          },
          role
        );

        if (fetchId === latestFetchIdRef.current) {
          const normalizedOrders = (res?.data || []).map((o) => ({
            ...o,
            product_display_name: o.product_name || o.product_code || "Unnamed Product",
          }));
          setOrders(normalizedOrders);
          onMetaUpdate(res?.meta || { page: 1, totalPages: 1, total: 0 });
        }
      } catch (err) {
        if (fetchId === latestFetchIdRef.current) {
          console.error("Error fetching orders:", err);
          showToast("Failed to fetch orders. Please check your connection.", COLORS.danger);
          setOrders([]);
        }
      } finally {
        if (fetchId === latestFetchIdRef.current) setLoading(false);
      }
    },
    [
      dateFrom,
      dateTo,
      orderType,
      selectedCategory,
      searchTerm,
      itemsPerPage,
      role,
      latestFetchIdRef,
      onMetaUpdate,
    ]
  );

  // --- Fetch trigger ---
  useEffect(() => {
    if (!isInitialMeasure) loadOrders(currentPage);
  }, [
    currentPage,
    dateFrom,
    dateTo,
    orderType,
    selectedCategory,
    searchTerm,
    itemsPerPage,
    loadOrders,
    isInitialMeasure,
  ]);

  // --- Scroll to top on load complete ---
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }, 50);
    }
  }, [currentPage, loading, orders.length]);

  const renderDateHeader = () => {
    if (formattedFrom && formattedTo) {
      return (
        <p style={ordersGridStyles.dateRangeText}>
          From: <span style={ordersGridStyles.dateHighlight}>{formattedFrom}</span>
          <span style={ordersGridStyles.separator}>⟶</span>
          To: <span style={ordersGridStyles.dateHighlight}>{formattedTo}</span>
        </p>
      );
    } else if (formattedFrom) {
      return (
        <p style={ordersGridStyles.dateRangeText}>
          From: <span style={ordersGridStyles.dateHighlight}>{formattedFrom}</span>
        </p>
      );
    } else if (formattedTo) {
      return (
        <p style={ordersGridStyles.dateRangeText}>
          To: <span style={ordersGridStyles.dateHighlight}>{formattedTo}</span>
        </p>
      );
    }
  };

  return (
    <div style={ordersGridStyles.container} ref={topRef}>
      <div style={ordersGridStyles.dateAndFilterRow}>
        <div style={ordersGridStyles.dateHeader}>{renderDateHeader()}</div>

        <div
          style={
            isNarrow
              ? ordersGridStyles.radioFlowWrapper
              : ordersGridStyles.radioAbsolute
          }
        >
          <div style={ordersGridStyles.radioContainer}>
            {["in-process", "delivered"].map((type) => (
              <label
                key={type}
                style={{
                  ...ordersGridStyles.radioLabel,
                  ...(orderType === type ? ordersGridStyles.radioLabelActive : {}),
                }}
                onClick={() => {
                  if (orderType !== type) {
                    setOrderType(type);
                    onResetPage();
                  }
                }}
              >
                <input
                  type="radio"
                  name="orderType"
                  value={type}
                  checked={orderType === type}
                  readOnly
                  style={ordersGridStyles.radioInput}
                />
                {type === "in-process" ? "In-Process" : "Delivered"}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          ...ordersGridStyles.gridWrapper,
          ...(loading || orders.length === 0
            ? {
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
              }
            : {}),
        }}
      >
        {loading ? (
          <div style={ordersGridStyles.loadingContainer}>
            <div style={ordersGridStyles.loadingSpinner}></div>
            <p style={ordersGridStyles.loadingText}>Loading orders…</p>
          </div>
        ) : orders.length === 0 ? (
          <p style={ordersGridStyles.emptyState}>
            No orders found for the selected filters.
          </p>
        ) : (
          orders.map((order, index) => (
            <OrdersGridCard key={order.order_id || index} order={order} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersGrid;
