import { IProduct } from "@/shared/api/productsApi";
import { Button, Card, InputNumber } from "antd";
import styles from "./styles.module.scss";
import { basketSlice } from "@/shared/slices/basketSlice";
import { useDispatch } from "react-redux";

enum CardType {
  default = "default",
  withCount = "with count",
}

export interface IProductWithCount extends IProduct {
  count?: number;
}

export const ProductCard = ({ image_url, title, description, price, count, id }: IProductWithCount) => {
  const type = count ? CardType.withCount : CardType.default;
  const dispatch = useDispatch();

  const handleBuyClick = () => {
    dispatch(basketSlice.actions.addToBasket(id));
  };

  const handleCountChange = (value: number | null) => {
    if (value !== null) {
      if (value === 0) {
        return dispatch(basketSlice.actions.removeFromBasket(id));
      }
      dispatch(basketSlice.actions.updateCount({ id, count: value }));
    }
  };

  const renderFootContent = () => {
    switch (type) {
      case CardType.default:
        return (
          <Button onClick={handleBuyClick} type="primary">
            купить
          </Button>
        );
      case CardType.withCount:
        return <InputNumber min={0} max={10} value={count} onChange={handleCountChange} changeOnWheel />;
      default:
        return null;
    }
  };

  return (
    <Card hoverable className={styles.card}>
      <img className="image" src={image_url} />
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
      <p className="price">{price}</p>
      {renderFootContent()}
    </Card>
  );
};
