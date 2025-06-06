import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProduct {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export interface IGetProductsResponse {
  page: number;
  amount: number;
  total: number;
  items: IProduct[];
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ items: IGetProductsResponse }, { page: number; page_size?: number }>({
      query: ({ page, page_size = 20 }) => ({
        url: `products?page=${page}&page_size=${page_size}`,
        method: "GET",
      }),
    }),
  }),
});
