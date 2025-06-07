"use client";

import { ProductList } from "@/entities/product/ProductList";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";

export const BasketPage = () => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const products = useSelector((state: RootState) => state.products.items);

  const basketItemsWithProductData = basketItems.map((basketItem) => {
    const product = products.find((product) => product.id === basketItem.id)!;
    return {
      ...product,
      count: basketItem.count,
    };
  });

  return (
    <>
      <ProductList products={basketItemsWithProductData} />
    </>
  );
};
