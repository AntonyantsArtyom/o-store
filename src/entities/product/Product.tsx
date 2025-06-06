import { IProduct } from "@/shared/api/productsApi";
import { Card } from "antd";
import styles from "./styles.module.scss";

export const ProductCard = ({ image_url, title, description, price }: IProduct) => {
  return (
    <Card className={styles.card}>
      <img className="image" src={image_url} />
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <p className="price">{price}</p>
    </Card>
  );
};
