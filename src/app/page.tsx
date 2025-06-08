import { ProductsPage } from "@/sitepages/ProductsPage";
import { IGetProductsResponse } from "@/entities/product/productsApi";

export default async function Home() {
  const serverResponse = await fetch("http://o-complex.com:1337/products?page=1&page_size=18");
  const initialProducts: IGetProductsResponse = await serverResponse.json();
  return <ProductsPage initial={initialProducts} />;
}
