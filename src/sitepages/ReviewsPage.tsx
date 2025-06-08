"use client";

import { ReviewsList } from "@/entities/review/ReviewsList";
import { reviewsApi } from "@/entities/review/reviewsApi";

export const ReviewsPage = () => {
  const { data: reviews } = reviewsApi.useGetReviewsQuery();

  return <ReviewsList reviews={reviews || []} />;
};
