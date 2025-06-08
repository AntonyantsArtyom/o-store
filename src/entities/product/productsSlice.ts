import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./productsApi";

interface ProductsState {
  items: IProduct[];
}

const initialState: ProductsState = {
  items: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.items = action.payload;
    },
    appendProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.items.push(...action.payload);
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
});
