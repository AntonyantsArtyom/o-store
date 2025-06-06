import { IProduct } from "@/shared/api/productsApi";
import { ProductCard } from "./Product";
import styles from "./styles.module.scss";

export const ProductList = ({ products }: { products: IProduct[] }) => {
  return (
    <div className={styles.list}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
