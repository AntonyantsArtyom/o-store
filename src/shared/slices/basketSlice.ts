import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IBasketItem {
  id: number;
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
    addToBasket(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({ id: action.payload, count: 1 });
      }
    },
    removeFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCount(state, action: PayloadAction<{ id: number; count: number }>) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.count = action.payload.count;
      }
    },
    clearBasket(state) {
      state.items = [];
    },
  },
});
