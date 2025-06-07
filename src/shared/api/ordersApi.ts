import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICartItem {
  id: number;
  quantity: number;
}

export interface IOrderRequest {
  phone: string;
  cart: ICartItem[];
}

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    sendOrder: builder.mutation<void, IOrderRequest>({
      query: (order) => ({
        url: "order",
        method: "POST",
        body: order,
      }),
    }),
  }),
});
