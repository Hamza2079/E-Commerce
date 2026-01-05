import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartCount: number;
  cartItems: string[]; // Array of product IDs in cart
}

const initialState: CartState = {
  cartCount: 0,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    incrementCart: (state, action: PayloadAction<number | undefined>) => {
      state.cartCount += action.payload || 1;
    },
    decrementCart: (state) => {
      if (state.cartCount > 0) {
        state.cartCount -= 1;
      }
    },
    resetCart: (state) => {
      state.cartCount = 0;
      state.cartItems = [];
    },
    // New actions for managing cart items
    setCartItems: (state, action: PayloadAction<string[]>) => {
      state.cartItems = action.payload;
    },
    addCartItem: (state, action: PayloadAction<string>) => {
      if (!state.cartItems.includes(action.payload)) {
        state.cartItems.push(action.payload);
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(id => id !== action.payload);
    },
  },
});

export const { 
  setCartCount, 
  incrementCart, 
  decrementCart, 
  resetCart,
  setCartItems,
  addCartItem,
  removeCartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
