"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { productsSlice } from "@/entities/product/productsSlice";
import { IGetProductsResponse, productsApi } from "@/entities/product/productsApi";
import { ProductList } from "@/entities/product/ProductList";
import { IntersectionCheck } from "@/shared/IntersectionCheck";

export const ProductsPage = ({ initial }: { initial: IGetProductsResponse }) => {
  const [page, setPage] = useState(initial.page);

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [isEndOfList, setIsEndOfList] = useState(false);

  useEffect(() => {
    if (initial?.items) {
      dispatch(productsSlice.actions.setProducts(initial.items));
    }
  }, [initial, dispatch]);

  const { data: productsData } = productsApi.useGetProductsQuery({ page: page + 1 }, { skip: !isEndOfList });

  useEffect(() => {
    if (productsData) {
      dispatch(productsSlice.actions.appendProducts(productsData.items));
      setPage(productsData.page);
    }
  }, [productsData]);

  const productsWithCount = (products.length ? products : initial.items).map((product) => {
    const basketItem = basketItems.find((item) => item.product.id === product.id);
    return {
      ...product,
      count: basketItem?.count,
    };
  });

  return (
    <>
      <ProductList products={productsWithCount} />
      <IntersectionCheck key={page} onEnter={() => setIsEndOfList(true)} onLeave={() => setIsEndOfList(false)} />
    </>
  );
};
