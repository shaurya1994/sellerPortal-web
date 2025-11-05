// FILE: src/api/orders.js

// import api from "./axios";

import api from "./apiClient";

// Grouped orders (role-aware)
export const fetchGroupedOrders = async ({
  date_from = "",
  date_to = "",
  status = "",
  category_id = "",
  search = "",
  page = 1,
  limit = 18,
} = {}) => {
  const res = await api.get(`@role/grouped-orders-paginated`, {
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
  return res.data;
};

// Products list (role-aware)
export const fetchMyProducts = async ({
  page = 1,
  limit = 24,
  search = "",
  category_id = "",
  status = "",
} = {}) => {
  const res = await api.get(`@role/my-products-paginated`, {
    params: {
      page,
      limit: Number(limit) || 24,
      search: search || undefined,
      category_id: category_id || undefined,
      status: status || undefined,
    },
  });
  return res.data;
};

// Add product (role-aware) – multipart
export const addProduct = async (formData) => {
  const res = await api.post(`@role/add-product`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Edit images (role-aware)
export const editProductImages = async (product_id, formData) => {
  const res = await api.post(`@role/edit-product-images/${product_id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};


// // Fetching grouped orders for seller (Paginated)
// export const fetchSellerOrders = async ({
//   date_from = "",
//   date_to = "",
//   status = "",
//   category_id = "",
//   search = "",
//   page = 1,
//   limit = 18, // CRITICAL: Must be a number, not empty string
// } = {}) => {
//   try {
//     const response = await api.get(`/seller/grouped-orders-paginated`, {
//       params: {
//         page,
//         limit: Number(limit) || 18, // Ensure it's always a number
//         date_from: date_from || undefined,
//         date_to: date_to || undefined,
//         status: status || undefined,
//         category_id: category_id || undefined,
//         search: search || undefined,
//       },
//     });
    
//     return response.data; // { message, data, meta }
//   } catch (error) {
//     console.error("Error fetching grouped orders:", error.response || error);
//     throw error;
//   }
// };
