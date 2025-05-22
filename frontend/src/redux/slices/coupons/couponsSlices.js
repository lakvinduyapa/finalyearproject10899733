import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Initial state
const initialState = {
  coupons: [],
  coupon: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

// Create coupon
export const createCouponAction = createAsyncThunk(
  "coupon/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(`${baseURL}/coupons`, payload, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Fetch all coupons
export const fetchCouponsAction = createAsyncThunk(
  "coupon/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Fetch single coupon
export const fetchCouponAction = createAsyncThunk(
  "coupon/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/coupons/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Update coupon
export const updateCouponAction = createAsyncThunk(
  "coupon/update",
  async ({ id, ...payload }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(`${baseURL}/coupons/${id}`, payload, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

// Delete coupon
export const deleteCouponAction = createAsyncThunk(
  "coupon/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.delete(`${baseURL}/coupons/${id}`, config);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetCouponSuccess(state) {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDeleted = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state) => {
      state.loading = false;
      state.isAdded = true;
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch All
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload.coupons;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch One
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload.coupon;
    });
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCouponAction.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCouponAction.fulfilled, (state) => {
      state.loading = false;
      state.isDeleted = true;
    });
    builder.addCase(deleteCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetCouponSuccess } = couponSlice.actions;
const couponReducer = couponSlice.reducer;
export default couponReducer;