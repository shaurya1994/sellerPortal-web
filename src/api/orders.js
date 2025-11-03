// FILE: src/api/orders.js

import api from "./axios";

// Fetching grouped orders for seller (Paginated)
export const fetchSellerOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 18, // CRITICAL: Must be a number, not empty string
} = {}) => {
  try {
    const response = await api.get(`/seller/grouped-orders-paginated`, {
      params: {
        page,
        limit: Number(limit) || 18, // Ensure it's always a number
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
