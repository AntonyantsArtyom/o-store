import { ProductsPage } from "@/pages/ProductsPage";
import { IGetProductsResponse } from "@/shared/api/productsApi";

export default async function Home() {
  const serverResponse = await fetch("http://o-complex.com:1337/products?page=1");
  const initialProducts: IGetProductsResponse = await serverResponse.json();
  return <ProductsPage initial={initialProducts} />;
}
