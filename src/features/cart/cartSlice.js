
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const { tart, quantity } = action.payload;

      if (!tart?.id) return;

      if (quantity <= 0) {
        delete state.items[tart.id];
        return;
      }

      const safeQuantity = Math.min(5, quantity);

      state.items[tart.id] = {
        id: tart.id,
        name: tart.name,
        price: tart.price,
        image: tart.image,
        serves: tart.serves,
        quantity: safeQuantity,
      };
    },

    removeCartItem: (state, action) => {
      delete state.items[action.payload];
    },

    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const {
  setCartItem,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
