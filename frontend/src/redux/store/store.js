import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlice";
import postsReducer from "../slices/posts/postSlices";

//store
const store = configureStore({
    reducer:{
        users: usersReducer,
        products: productReducer,
        categories: categoryReducer,
        posts: postsReducer,
    },
});

export default store;