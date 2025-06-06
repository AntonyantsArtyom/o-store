import { IProduct } from "@/shared/api/productsApi";
import { ProductCard } from "./Product";
import styles from "./styles.module.css";

export const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className={styles.container}>
      {products.map((product) => (
        <ProductCard {...product} />
      ))}
    </div>
  );
};
