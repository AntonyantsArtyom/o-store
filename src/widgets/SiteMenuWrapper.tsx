"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button, Menu, MenuProps } from "antd";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import { Basket } from "@/features/Basket";

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

  return (
    <>
      <Basket open={isBasketOpen} onCancel={handleBasketCancelClick} />
      <div className={styles.container}>
        <div>{children}</div>
        <div>
          <Menu className={styles.menu} items={items} onClick={handleClick} selectedKeys={[selectedKey]} />
          <Button onClick={handleButtonClick}>корзина</Button>
        </div>
      </div>
    </>
  );
};
