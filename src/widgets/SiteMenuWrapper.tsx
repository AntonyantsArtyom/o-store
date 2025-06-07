import { Menu, type GetProp, type MenuProps } from "antd";
import styles from "./style.module.scss";
type MenuItem = GetProp<MenuProps, "items">[number];

export const SiteMenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const items: MenuItem[] = [
    {
      key: "1",
      label: "продукты",
    },
    {
      key: "2",
      label: "корзина",
    },
    {
      key: "3",
      label: "отзывы",
    },
  ];
  return (
    <div className={styles.container}>
      <div>{children}</div>
      <Menu className={styles.menu} items={items} />
    </div>
  );
};
