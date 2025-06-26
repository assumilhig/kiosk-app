// app/context/AppContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const defaultState = {
  orderItems: [] as { name: string; qty: number }[],
  discount: 0,
  serviceCharge: 0,
  setOrderItems: (items: any[]) => {},
  setDiscount: (value: number) => {},
  setServiceCharge: (value: number) => {},
};

const AppContext = createContext(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderItems, setOrderItems] = useState(defaultState.orderItems);
  const [discount, setDiscount] = useState(defaultState.discount);
  const [serviceCharge, setServiceCharge] = useState(defaultState.serviceCharge);

  return (
    <AppContext.Provider value={{ orderItems, setOrderItems, discount, setDiscount, serviceCharge, setServiceCharge }}>
      {children}
    </AppContext.Provider>
  );
};
