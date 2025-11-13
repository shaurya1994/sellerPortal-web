// FILE: src/api/orders.js

import api from "./apiClient";

// ---- SELLER: grouped orders (paginated) ----
export const fetchSellerGroupedOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 18,
} = {}) => {
  try {
    const res = await api.get(`/seller/grouped-orders-paginated`, {
      params: {
        page,
        limit: Number(limit) || 18,
        date_from: date_from || undefined,
        date_to: date_to || undefined,
        status: status || undefined,
        category_id: category_id || undefined,
        search: search || undefined,
        t: Date.now(), // bust any caches
      },
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data; // { message, data, meta }
  } catch (err) {
    console.error("Error fetching seller grouped orders:", err.response || err);
    throw err;
  }
};

// ---- BUYER: my orders (paginated) ----
export const fetchBuyerOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 18,
} = {}) => {
  try {
    const res = await api.get(`/buyer/my-orders-paginated`, {
      params: {
        page,
        limit: Number(limit) || 18,
        date_from: date_from || undefined,
        date_to: date_to || undefined,
        status: status || undefined,
        category_id: category_id || undefined,
        search: search || undefined,
        t: Date.now(),
      },
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching buyer orders:", err.response || err);
    throw err;
  }
};

// ---- UNIFIED role-aware fetcher ----
export const fetchOrders = async (opts = {}, role = "buyer") => {
  return role === "seller"
    ? await fetchSellerGroupedOrders(opts)
    : await fetchBuyerOrders(opts);
};
