// FILE: src/api/products.js

import api from "./apiClient";

// ---- SELLER PRODUCTS ----
export const fetchSellerProducts = async ({
  page = 1,
  limit = 24,
  search = "",
  category_id = "",
  status = "",
} = {}) => {
  try {
    const res = await api.get(`/seller/my-products-paginated`, {
      params: {
        page,
        limit: Number(limit) || 24,
        search: search || undefined,
        category_id: category_id || undefined,
        status: status || undefined,
        t: Date.now(), // prevent cache reuse
      },
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching seller products:", err.response || err);
    throw err;
  }
};

// ---- BUYER PRODUCTS ----
export const fetchBuyerProducts = async ({
  page = 1,
  limit = 25,
  search = "",
  category_id = "",
} = {}) => {
  try {
    // Corrected endpoint name to match backend
    const res = await api.get(`/buyer/approved-products-paginated`, {
      params: {
        page,
        limit: Number(limit) || 25,
        search: search || undefined,
        category_id: category_id || undefined,
        t: Date.now(),
      },
      headers: { "Cache-Control": "no-cache" },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching buyer products:", err.response || err);
    throw err;
  }
};

// ---- UNIFIED ROLE AWARE FETCHER ----
export const fetchProducts = async (opts = {}, role = "buyer") => {
  return role === "seller"
    ? await fetchSellerProducts(opts)
    : await fetchBuyerProducts(opts);
};

// Adding new product (multipart)
export const addSellerProduct = async (formData) => {
  try {
    const response = await api.post(`@role/add-product`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;

  } catch (error) {
    console.error("Error adding product:", error.response || error);
    throw error;
  }
};

// Edit Product Images
export const editProductImages = async (product_id, formData) => {
  try {
    const response = await api.post(
      `@role/edit-product-images/${product_id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;

  } catch (error) {
    console.error("Error editing product images:", error.response || error);
    throw error;
  }
};
