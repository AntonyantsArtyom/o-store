import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/shared/api/productsApi";
import { productsSlice } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
