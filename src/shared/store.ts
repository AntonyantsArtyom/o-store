import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/shared/api/productsApi";
import { productsSlice } from "./slices/productsSlice";
import { basketSlice } from "./slices/basketSlice";
import { reviewsApi } from "./api/reviewsApi";
import { ordersApi } from "./api/ordersApi";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    basket: basketSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productsApi.middleware, reviewsApi.middleware, ordersApi.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
