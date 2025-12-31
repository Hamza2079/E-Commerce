import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  cartCount: number;
}

const initialState: CartState = {
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartCount: (state, action: PayloadAction<number>) => {
      state.cartCount = action.payload;
    },
    incrementCart: (state) => {
      state.cartCount += 1;
    },
    decrementCart: (state) => {
      if (state.cartCount > 0) {
        state.cartCount -= 1;
      }
    },
    resetCart: (state) => {
      state.cartCount = 0;
    },
  },
});

export const { setCartCount, incrementCart, decrementCart, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
