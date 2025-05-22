import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// Initial state
const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
  latestProducts: [],
};

// ✅ Create Product Action (accepts FormData directly)
export const createProductAction = createAsyncThunk(
  "product/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`${baseURL}/products`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Update Product Action
export const updateProductAction = createAsyncThunk(
  "product/update",
  async ({ name, description, category, price, totalQty, id }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${baseURL}/products/${id}`,
        { name, description, category, price, totalQty },
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Fetch Products Action
export const fetchProductsAction = createAsyncThunk(
  "product/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


// ✅ Fetch Single Product Action
export const fetchProductAction = createAsyncThunk(
  "product/details",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`${baseURL}/products/${productId}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Delete Product Action
export const deleteProductAction = createAsyncThunk(
  "product/delete",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/products/${productId}/delete`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
//create review action
export const createReviewAction = createAsyncThunk(
  "review/create",
  async ({ productId, reviewData }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(`${baseURL}/reviews/${productId}`, reviewData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

//fetch latest products
export const fetchLatestProductsAction = createAsyncThunk(
  "products/fetchLatest",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/latest`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isAdded = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isUpdated = true;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.isUpdated = false;
      state.error = action.payload;
    });

    // Fetch all
    builder.addCase(fetchProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.payload;
    });

    // Fetch single
    builder.addCase(fetchProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.product = null;
      state.error = action.payload;
    });

    // Reset errors/success
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });

    // ✅ Delete Product
builder.addCase(deleteProductAction.pending, (state) => {
  state.loading = true;
});
builder.addCase(deleteProductAction.fulfilled, (state, action) => {
  state.loading = false;
  state.isDelete = true;
  
  state.products = state.products.filter(
    (prod) => prod._id !== action.meta.arg
  );
});
builder.addCase(deleteProductAction.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

//fetch latest product
builder.addCase(fetchLatestProductsAction.pending, (state) => {
  state.loading = true;
});
builder.addCase(fetchLatestProductsAction.fulfilled, (state, action) => {
  state.loading = false;
  state.latestProducts = action.payload;
});
builder.addCase(fetchLatestProductsAction.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});


  },
});

const productReducer = productSlice.reducer;
export default productReducer;
