// FILE: src/api/orders.js

import api from "./apiClient";

// Fetch grouped orders (role-aware)
export const fetchSellerOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 18,
} = {}) => {
  try {
    const response = await api.get(`@role/grouped-orders-paginated`, {
      params: {
        page,
        limit: Number(limit) || 18,
        date_from: date_from || undefined,
        date_to: date_to || undefined,
        status: status || undefined,
        category_id: category_id || undefined,
        search: search || undefined,
      },
    });

    return response.data; // { message, data, meta }
  } catch (error) {
    console.error("Error fetching grouped orders:", error.response || error);
    throw error;
  }
};
