"use client";

import { productsApi } from "@/shared/api/productsApi";

export const ProductsPage = () => {
  const { data } = productsApi.useGetProductsQuery({ page: 1 });
  return <pre>{JSON.stringify(data?.items, null, 2)}</pre>;
};
