import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlice";
import postsReducer from "../slices/posts/postSlices";
import couponReducer from "../slices/coupons/couponsSlices";
import orderReducer from "../slices/orders/orderSlice";
import cartReducer from "../slices/cart/cartSlice";

//store
const store = configureStore({
    reducer:{
        users: usersReducer,
        products: productReducer,
        categories: categoryReducer,
        posts: postsReducer,
        coupons: couponReducer,
        orders: orderReducer,
        cart: cartReducer,
    },
});

export default store;