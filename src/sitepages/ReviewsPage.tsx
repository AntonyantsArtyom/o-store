"use client";

import { ReviewsList } from "@/entities/review/ReviewsList";
import { reviewsApi } from "@/shared/api/reviewsApi";

export const ReviewsPage = () => {
  const { data: reviews } = reviewsApi.useGetReviewsQuery();

  return <ReviewsList reviews={reviews || []} />;
};
