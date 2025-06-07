"use client";

import { useRouter, usePathname } from "next/navigation";
import { Menu, MenuProps } from "antd";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";

enum Routes {
  products = "/",
  reviews = "/reviews",
}

export const SiteMenuWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className={styles.container}>
      <div>{children}</div>
      <Menu className={styles.menu} items={items} onClick={handleClick} selectedKeys={[selectedKey]} />
    </div>
  );
};
