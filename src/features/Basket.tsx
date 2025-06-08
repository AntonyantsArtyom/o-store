"use client";

import React, { useEffect, useState } from "react";
import { Modal, Button, Table, notification, Popover } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import styles from "./styles.module.scss";
import { IMaskInput } from "react-imask";
import { ordersApi } from "@/entities/orders/ordersApi";

interface IBasketProps {
  open: boolean;
  onCancel: () => void;
}

enum NotificationType {
  "success" = "success",
  "error" = "error",
}

interface INotificationContent {
  message: string;
  description: string;
}

export const Basket = ({ open, onCancel }: IBasketProps) => {
  const basketItems = useSelector((state: RootState) => state.basket.items);
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    const content: Record<NotificationType, INotificationContent> = {
      [NotificationType.success]: { message: "Заказ оформлен", description: "мы получили заказ и уже работаем над его доставкой" },
      [NotificationType.error]: { message: "Что-то пошло не так", description: "мы не смогли получить ваш заказ" },
    };
    api[type](content[type]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("phone", phone);
    }, 500);

    return () => clearTimeout(timeout);
  }, [phone]);

  const TableBasketItem = basketItems.map((basketItem) => {
    return {
      ...basketItem.product,
      count: basketItem.count,
      key: basketItem.product.id,
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

  const [sendOrder] = ordersApi.useSendOrderMutation();

  const handleSubmit = async () => {
    const result = await sendOrder({
      phone: phone.replace(/\D/g, ""),
      cart: [
        { id: 12, quantity: 2 },
        { id: 15, quantity: 5 },
      ],
    });

    if ("error" in result) {
      openNotificationWithIcon(NotificationType.error);
    } else {
      onCancel();
      openNotificationWithIcon(NotificationType.success);
      onCancel();
    }
  };

  return (
    <>
      {contextHolder}
      <Modal onCancel={onCancel} open={open} footer={[]}>
        <div className={styles.container}>
          <Table pagination={false} dataSource={TableBasketItem} columns={columns} />
          <IMaskInput className={styles.phone} mask="+7 (000) 000-00-00" value={phone} onAccept={(value: string) => setPhone(value)} placeholder="+7 (___) ___-__-__" unmask={false} type="tel" />
          <Popover content={phone.replace(/\D/g, "").length !== 11 ? "для оформления заказа введите телефон" : null}>
            <Button disabled={phone.replace(/\D/g, "").length !== 11} onClick={handleSubmit} type="primary">
              Заказать
            </Button>
          </Popover>
        </div>
      </Modal>
    </>
  );
};
