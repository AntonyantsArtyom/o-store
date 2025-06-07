import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../api/productsApi";

export interface IBasketItem {
  product: IProduct;
  count: number;
}

export interface IBasketState {
  items: IBasketItem[];
}

const initialState: IBasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setCount(state, action: PayloadAction<{ product: IProduct; count: number }>) {
      const { product, count } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);

      if (count === 0) {
        state.items = state.items.filter((item) => item.product.id !== product.id);
      } else if (existingItem) {
        existingItem.count = count;
      } else {
        state.items.push({ product, count });
      }
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});

export const { setCount, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
