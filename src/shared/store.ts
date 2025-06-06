import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/shared/api/productsApi";
import { productsSlice } from "./slices/productsSlice";
import { basketSlice } from "./slices/basketSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    basket: basketSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
