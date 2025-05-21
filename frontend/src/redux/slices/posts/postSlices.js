import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
  isAdded: false,
  isDeleted: false,
};

export const fetchPostsAction = createAsyncThunk("posts/list", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${baseURL}/posts`);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const createPostAction = createAsyncThunk("posts/create", async (payload, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.userAuth.userInfo.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("link", payload.link);
    formData.append("file", payload.image);

    const { data } = await axios.post(`${baseURL}/posts`, formData, config);
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const deletePostAction = createAsyncThunk("posts/delete", async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().users.userAuth.userInfo.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`${baseURL}/posts/${id}`, config);
    return id; // return the deleted ID to filter it out
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});


const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPostAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAction.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdded = true;
        state.post = action.payload;
      })
      .addCase(createPostAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePostAction.fulfilled, (state, action) => {
  state.posts = state.posts.filter((post) => post._id !== action.payload);
  state.isDeleted = true;
})
;
  },
});

//generate the reducer
const postsReducer = postSlice.reducer;

export default postsReducer;