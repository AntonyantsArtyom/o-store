"use client";

import React, { useState } from "react";
import { Modal, Button, Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import styles from "./styles.module.scss";
import { IMaskInput } from "react-imask";

interface IBasketProps {
  open: boolean;
  onCancel: () => void;
}

export const Basket = ({ open, onCancel }: IBasketProps) => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const products = useSelector((state: RootState) => state.products.items);
  const [phone, setPhone] = useState("");

  const basketItemsWithProductData = basketItems.map((basketItem) => {
    const product = products.find((product) => product.id === basketItem.id)!;
    return {
      ...product,
      count: basketItem.count,
      key: product.id,
    };
  });

  const columns = [
    {
      title: "название",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "количество",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "цена",
      key: "price",
      render: (_: any, record: { price: number; count: number }) => {
        return record.price * record.count;
      },
    },
  ];

  return (
    <Modal onCancel={onCancel} open={open} footer={[]}>
      <div className={styles.container}>
        <Table pagination={false} dataSource={basketItemsWithProductData} columns={columns} />
        <IMaskInput className={styles.phone} mask="+7 (000) 000-00-00" value={phone} onAccept={(value: string) => setPhone(value)} placeholder="+7 (___) ___-__-__" unmask={false} type="tel" />
        <Button type="primary" key="submit">
          Отправить
        </Button>
      </div>
    </Modal>
  );
};
