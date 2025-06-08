import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/entities/product/productsApi";
import { productsSlice } from "../entities/product/productsSlice";
import { basketSlice, IBasketState } from "../features/basketSlice";
import { reviewsApi } from "../entities/review/reviewsApi";
import { ordersApi } from "../entities/orders/ordersApi";

const saveBasketToLocalStorage = (basket: IBasketState) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("basket", JSON.stringify(basket));
};

const basketMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = storeAPI.getState();
  saveBasketToLocalStorage(state.basket);
  return result;
};

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    basket: basketSlice.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productsApi.middleware, reviewsApi.middleware, ordersApi.middleware, basketMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
