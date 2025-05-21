import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// Initial state
const initialState = {
  categories: [],
  category: {}, // single category
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDelete: false,
};

// ✅ Create Category
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(`${baseURL}/categories`, formData, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Fetch All Categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories`);
      return data.categories;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Fetch Single Category
export const fetchCategoryAction = createAsyncThunk(
  "category/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/categories/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Update Category
export const updateCategoryAction = createAsyncThunk(
  "category/update",
  async ({ id, name }, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(`${baseURL}/categories/${id}`, { name }, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ✅ Delete Category
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (categoryId, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(`${baseURL}/categories/${categoryId}/delete`, config);
      return { data, id: categoryId };
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    // Create
    builder.addCase(createCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.isAdded = true;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch all
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch single
    builder.addCase(fetchCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategoryAction.fulfilled, (state) => {
      state.loading = false;
      state.isUpdated = true;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDelete = true;
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload.id
      );
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Reset
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
      state.isUpdated = false;
      state.isDelete = false;
    });
  },
});

export default categorySlice.reducer;

