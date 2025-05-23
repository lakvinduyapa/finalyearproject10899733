import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

// Initial state
const initialState = {
  loading: false,
  error: null,
  users: [],
  user: {},
  profile: {},
  userAuth: {
    loading: false,
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

// ================= REGISTER =================
export const registerUserAction = createAsyncThunk(
  "users/register",
  async (
    { firstname, lastname, contact, email, password, isSeller, isAdmin },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/register`, {
        firstname,
        lastname,
        contact,
        email,
        password,
        isSeller,
        isAdmin,
      });
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================= LOGIN =================
export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

// ================= FETCH ALL USERS =================
export const fetchAllUsersAction = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/users`, config);
      return data.users;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// ================= GET LOGGED-IN USER PROFILE =================
export const getUserProfileAction = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`${baseURL}/users/profile`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

// ================= SLICE =================
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logoutUserAction: (state) => {
      state.userAuth.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    // ==== LOGIN ====
    builder.addCase(loginUserAction.pending, (state) => {
      state.userAuth.loading = true;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.userAuth.userInfo = action.payload;
      state.userAuth.loading = false;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.userAuth.error = action.payload;
      state.userAuth.loading = false;
    });

    // ==== REGISTER ====
    builder.addCase(registerUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.userAuth.userInfo = action.payload; // ✅ Ensures redirect works
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // ✅ Optional: persist user
      state.loading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // ==== FETCH ALL USERS ====
    builder.addCase(fetchAllUsersAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // ==== GET PROFILE ====
    builder.addCase(getUserProfileAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getUserProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logoutUserAction } = usersSlice.actions;

export default usersSlice.reducer;
