import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getInitialCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x._id === item._id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.cartItems.push({ ...item, qty: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) item.qty = qty;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
    state.cartItems = [];
    localStorage.removeItem("cartItems");
  },
  },
});

export const { addToCart, removeFromCart, changeQty, clearCart } = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
