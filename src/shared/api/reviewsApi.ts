import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IReview {
  id: number;
  text: string;
}

export const reviewsApi = createApi({
  reducerPath: "revieswApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    getReviews: builder.query<IReview[], void>({
      query: () => ({
        url: `reviews`,
        method: "GET",
      }),
    }),
  }),
});
