// src/api/products.js
import api from "./axios";

export const fetchSellerProducts = async (status = "approved") => {
  try {
    const response = await api.get(`/seller/my-products?status=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response || error);
    throw error;
  }
};
