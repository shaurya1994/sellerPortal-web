// FILE: src/api/products.js

import api from "./apiClient";

// Seller: Fetch paginated products uploaded by the seller
// Endpoint: /seller/my-products-paginated
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
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching seller products:", err.response || err);
    throw err;
  }
};

// Buyer: Fetch approved/public products (paginated)
// Endpoint expected by backend: /buyer/approved-products
export const fetchBuyerProducts = async ({
  page = 1,
  limit = 25,
  search = "",
  category_id = "",
} = {}) => {
  try {
    const res = await api.get(`/buyer/approved-products`, {
      params: {
        page,
        limit: Number(limit) || 25,
        search: search || undefined,
        category_id: category_id || undefined,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching buyer products:", err.response || err);
    throw err;
  }
};

// Unified helper — calls seller or buyer fetcher based on role
export const fetchProducts = async (opts = {}, role = "buyer") => {
  if (role === "seller") return await fetchSellerProducts(opts);
  return await fetchBuyerProducts(opts);
};

// Seller: Fetch paginated products uploaded by the seller
// Matches backend: getMyProductsPaginated
// export const fetchSellerProducts = async ({
//   page = 1,
//   limit = 24,
//   search = "",
//   category_id = "",
//   status = "",
// } = {}) => {
//   try {
//     const res = await api.get(`/seller/my-products-paginated`, {
//       params: {
//         page,
//         limit: Number(limit) || 24,
//         search: search || undefined,
//         category_id: category_id || undefined,
//         status: status || undefined,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching seller products:", err.response || err);
//     throw err;
//   }
// };

// // Buyer: Fetch approved products (public)
// // Matches backend: getApprovedProductsPaginated
// export const fetchBuyerProducts = async ({
//   page = 1,
//   limit = 25,
//   category_id = "",
// } = {}) => {
//   try {
//     const res = await api.get(`/buyer/approved-products`, {
//       params: {
//         page,
//         limit: Number(limit) || 25,
//         category_id: category_id || undefined,
//       },
//     });
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching buyer products:", err.response || err);
//     throw err;
//   }
// };

// // Unified fetcher — automatically calls correct endpoint
// export const fetchProducts = async (opts = {}, role = "buyer") => {
//   if (role === "seller") return await fetchSellerProducts(opts);
//   return await fetchBuyerProducts(opts);
// };

// Fetching products uploaded by seller (Paginated)
// export const fetchSellerProducts = async ({
//   page = 1,
//   limit = 24,
//   search = "",
//   category_id = "",
//   status = "",
// } = {}) => {
//   try {
//     const response = await api.get(`@role/my-products-paginated`, {
//       params: {
//         page,
//         limit: Number(limit) || 24,
//         search: search || undefined,
//         category_id: category_id || undefined,
//         status: status || undefined,
//       },
//     });
//     return response.data;
    
//   } catch (error) {
//     console.error("Error fetching paginated products:", error.response || error);
//     throw error;
//   }
// };

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


// FILE: src/api/products.js

// import api from "./axios";

// // Fetching products uploaded by seller (Paginated)
// export const fetchSellerProducts = async ({
//   page = 1,
//   limit = 24, // Default to 24 (As per current design)
//   search = "",
//   category_id = "",
//   status = "",
// } = {}) => {
//   try {
//     const response = await api.get(`/seller/my-products-paginated`, {
//       params: {
//         page,
//         limit: Number(limit) || 24, // Ensure it's always a number
//         search: search || undefined,
//         category_id: category_id || undefined,
//         status: status || undefined,
//       },
//     });
//     return response.data; // { message, data, meta }
//   } catch (error) {
//     console.error("Error fetching paginated products:", error.response || error);
//     throw error;
//   }
// };

// // Adding new product (Modify when creating session management)
// export const addSellerProduct = async (formData) => {
//   try {
//     const response = await api.post("/seller/add-product", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error adding product:", error.response || error);
//     throw error;
//   }
// };

// // Add / Edit Product Images
// export const editProductImages = async (product_id, formData) => {
//   try {
//     const response = await api.post(
//       `/seller/edit-product-images/${product_id}`,
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error editing product images:", error.response || error);
//     throw error;
//   }
// };
