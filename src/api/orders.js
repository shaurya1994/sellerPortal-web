// src/api/orders.js

import api from "./axios";

// Fetches grouped orders for the seller with applied filters
// Example: /seller/grouped-orders-paginated?date_from=...&date_to=...&status=...&category_id=...&search=...
export const fetchSellerOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 25,
} = {}) => {
  try {
    const response = await api.get(`/seller/grouped-orders-paginated`, {
      params: {
        date_from: date_from || undefined,
        date_to: date_to || undefined,
        status: status || undefined,
        category_id: category_id || undefined,
        search: search || undefined,
        page,
        limit,
      },
    });
    return response.data; // { message, data, meta }
  } catch (error) {
    console.error("Error fetching grouped orders:", error.response || error);
    throw error;
  }
};
