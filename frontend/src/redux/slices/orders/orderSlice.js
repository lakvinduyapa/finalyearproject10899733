// redux/slices/orders/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Fetch all orders
export const fetchOrdersAction = createAsyncThunk(
  "orders/fetch",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/orders`, config);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// Update order status
export const updateOrderAction = createAsyncThunk(
  "orders/update",
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.put(`${baseURL}/orders/update/${id}`, { status }, config);
      return data.updatedorder;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// === Fetch Order Stats ===
export const fetchOrderStatsAction = createAsyncThunk(
  "orders/stats",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/orders/sales/stats`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    loading: false,
    error: null,
    stats: null,
  statsLoading: false,
  statsError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchOrdersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderAction.fulfilled, (state, action) => {
        const index = state.allOrders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) {
          state.allOrders[index] = action.payload;
        }
      })
    .addCase(fetchOrderStatsAction.pending, (state) => {
    state.statsLoading = true;
    })
    .addCase(fetchOrderStatsAction.fulfilled, (state, action) => {
    state.statsLoading = false;
    state.stats = action.payload;
    })
    .addCase(fetchOrderStatsAction.rejected, (state, action) => {
    state.statsLoading = false;
    state.statsError = action.payload;
    });
    },
    });

const orderReducer = orderSlice.reducer;
export default orderReducer;
