"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { productsSlice } from "@/shared/slices/productsSlice";
import { IGetProductsResponse, productsApi } from "@/shared/api/productsApi";
import { ProductList } from "@/entities/product/ProductList";

export const ProductsPage = ({ initial }: { initial: IGetProductsResponse }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const basketItems = useSelector((state: RootState) => state.basket.items);

  useEffect(() => {
    if (initial?.items) {
      dispatch(productsSlice.actions.setProducts(initial.items));
    }
  }, [initial, dispatch]);

  const { data: nextPageData } = productsApi.useGetProductsQuery({ page: 2 });

  useEffect(() => {
    if (nextPageData?.items) {
      dispatch(productsSlice.actions.appendProducts(nextPageData.items));
    }
  }, [nextPageData, dispatch]);

  const allProducts = products.length ? products : initial.items;

  const productsWithCount = allProducts.map((product) => {
    const basketItem = basketItems.find((item) => item.id === product.id);
    return {
      ...product,
      count: basketItem?.count,
    };
  });

  return <ProductList products={productsWithCount} />;
};
