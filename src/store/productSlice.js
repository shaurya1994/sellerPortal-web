// FILE: src/store/productSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/seller/products");
      // Expecting backend response { success, message, data }
      return res.data.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (payload, thunkAPI) => {
    try {
      const { name, desc, category_id, variants, images = [] } = payload;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      if (category_id) formData.append("category_id", category_id);
      if (variants) formData.append("variants", JSON.stringify(variants));

      // append image files (field name = images)
      images.forEach((file) => formData.append("images", file));

      const res = await api.post("/seller/add-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "products",
  initialState: { list: [], loading: false, error: null, addLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      })
      .addCase(addProduct.pending, (s) => {
        s.addLoading = true;
        s.error = null;
      })
      .addCase(addProduct.fulfilled, (s, a) => {
        s.addLoading = false;
        // Optionally push newly created product (or refetch).
        if (a.payload) s.list.unshift(a.payload);
      })
      .addCase(addProduct.rejected, (s, a) => {
        s.addLoading = false;
        s.error = a.payload || a.error?.message;
      });
  },
});

export default slice.reducer;
