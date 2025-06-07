"use client";

import { reviewsApi } from "@/shared/api/reviewsApi";

export const ReviewsPage = () => {
  const { data: reviews } = reviewsApi.useGetReviewsQuery();

  return <>{JSON.stringify(reviews)}</>;
};
