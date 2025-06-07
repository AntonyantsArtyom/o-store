"use client";

import { useRouter } from "next/navigation";
import { Menu, MenuProps } from "antd";
import styles from "./style.module.scss";

export const SiteMenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const items: MenuProps["items"] = [
    {
      key: "/",
      label: "продукты",
    },
    {
      key: "/basket",
      label: "корзина",
    },
    {
      key: "/reviews",
      label: "отзывы",
    },
  ];

  const handleClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <div className={styles.container}>
      <div>{children}</div>
      <Menu className={styles.menu} items={items} onClick={handleClick} />
    </div>
  );
};
