// src/api/products.js
import api from "./axios";

// Fetching products based on status
// If parameters are needed to be passed
// export const fetchSellerProducts = async (status = "approved") => {
//   try {
//     const response = await api.get(`/seller/my-products?status=${status}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching products:", error.response || error);
//     throw error;
//   }
// };

// Fetching all products uploaded by seller
export const fetchSellerProducts = async () => {
  try {
    const response = await api.get(`/seller/my-products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.response || error);
    throw error;
  }
};

// Adding new product
// export const addSellerProduct = async (formData) => {
//   const response = await api.post("/seller/add-product", formData);
//   return response.data;
// };

// Adding new product (Modify when creating session management)
export const addSellerProduct = async (formData) => {
  try {
    const response = await api.post("/seller/add-product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response || error);
    throw error;
  }
};

// Add / Edit Product Images
export const editProductImages = async (product_id, formData) => {
  try {
    const response = await api.post(
      `/seller/edit-product-images/${product_id}`,
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
