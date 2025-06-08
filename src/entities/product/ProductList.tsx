import { IProduct } from "@/entities/product/productsApi";
import { ProductCard } from "./ProductCard";
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
