"use client";

import { useRouter, usePathname } from "next/navigation";
import { Badge, Button, Menu, MenuProps, Popover } from "antd";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { Basket } from "@/features/Basket";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";

enum Routes {
  products = "/",
  reviews = "/reviews",
}

export const SiteMenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(pathname);

  useEffect(() => {
    setSelectedKey(pathname);
  }, [pathname]);

  const items: MenuProps["items"] = [
    {
      key: Routes.products,
      label: "продукты",
    },
    {
      key: Routes.reviews,
      label: "отзывы",
    },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  const handleButtonClick = () => {
    setIsBasketOpen(true);
  };

  const handleBasketCancelClick = () => {
    setIsBasketOpen(false);
  };

  const basketItems = useSelector((state: RootState) => state.basket.items);

  const totalCount = basketItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      <Basket open={isBasketOpen} onCancel={handleBasketCancelClick} />
      <div className={styles.menuContainer}>
        <Menu className={styles.menu} items={items} onClick={handleClick} selectedKeys={[selectedKey]} />
        <Badge count={totalCount}>
          <Popover content={totalCount ? null : "корзина пуста"}>
            <Button disabled={totalCount === 0} onClick={handleButtonClick}>
              корзина
            </Button>
          </Popover>
        </Badge>
      </div>
      <div className={styles.container}>
        <div>{children}</div>
      </div>
    </>
  );
};
