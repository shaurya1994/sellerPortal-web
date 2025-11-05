// File: src/store/orderSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (status, thunkAPI) => {
    try {
      const url = status ? `/seller/my-orders?status=${status}` : "/seller/my-orders";
      const res = await api.get(url);
      return res.data.data || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: "orders",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchOrders.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchOrders.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || a.error?.message;
      });
  },
});

export default slice.reducer;
