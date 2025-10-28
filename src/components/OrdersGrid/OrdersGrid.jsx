// FILE: src/components/OrdersGrid/OrdersGrid.jsx

import { useState, useEffect } from "react";
import { ordersGridStyles } from "./OrdersGrid.styles";
import { COLORS } from "../../constants/colors";
import { fetchSellerOrders } from "../../api/orders";

import OrdersGridCard from "./OrdersGridCard";

const OrdersGrid = ({
  dateFrom,
  dateTo,
  searchInput,
  selectedCategory,
  clearSignal = 0,
  onClearDates = () => {},
}) => {
  const [orderType, setOrderType] = useState("in-process"); // default changed to "in-process"
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNarrow, setIsNarrow] = useState(() => window.innerWidth < 920);

  useEffect(() => {
    const onResize = () => setIsNarrow(window.innerWidth < 920);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // reset orderType when clearSignal changes
  useEffect(() => {
    setOrderType("in-process");
  }, [clearSignal]);

  // toast
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
  const formattedToday = formatDate(new Date());

  const loadOrders = async () => {
    if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
      showToast("‘From’ date cannot be greater than ‘To’ date.", COLORS.danger, true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetchSellerOrders({
        date_from: dateFrom || undefined,
        date_to: dateTo || undefined,
        status: orderType, // no conditional logic needed now
        category_id: selectedCategory || "",
        search: searchInput || "",
        page: 1,
        limit: 25,
      });
      setOrders(res?.data || []);
    } catch (err) {
      showToast("Failed to fetch orders. Please check your connection.", COLORS.danger);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, orderType, selectedCategory, searchInput]);

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
    return (
      <p style={ordersGridStyles.dateRangeText}>
        Date: <span style={ordersGridStyles.dateHighlight}>{formattedToday}</span>
      </p>
    );
  };

  const orderTypes = ["in-process", "delivered"]; // only two options now

  const renderOrderTypeRadios = () => (
    <div style={ordersGridStyles.radioContainer}>
      {orderTypes.map((type) => (
        <label
          key={type}
          style={{
            ...ordersGridStyles.radioLabel,
            ...(orderType === type ? ordersGridStyles.radioLabelActive : {}),
          }}
          onClick={() => setOrderType(type)}
        >
          <input
            type="radio"
            name="orderType"
            value={type}
            checked={orderType === type}
            onChange={() => setOrderType(type)}
            style={ordersGridStyles.radioInput}
          />
          {type === "in-process" ? "In-Process" : "Delivered"}
        </label>
      ))}
    </div>
  );

  return (
    <div style={ordersGridStyles.container}>
      <div style={ordersGridStyles.dateAndFilterRow}>
        <div style={ordersGridStyles.dateHeader}>{renderDateHeader()}</div>

        {!isNarrow ? (
          <div style={ordersGridStyles.radioAbsolute}>{renderOrderTypeRadios()}</div>
        ) : (
          <div style={ordersGridStyles.radioFlowWrapper}>{renderOrderTypeRadios()}</div>
        )}
      </div>

      {/* --- Orders Grid --- */}
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
          orders.map((order, index) => <OrdersGridCard key={index} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrdersGrid;
