"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type OrderItem = { name: string; qty: number };

interface AppContextType {
  orderItems: OrderItem[];
  setOrderItems: Dispatch<SetStateAction<OrderItem[]>>;
  discount: number;
  setDiscount: Dispatch<SetStateAction<number>>;
  serviceCharge: number;
  setServiceCharge: Dispatch<SetStateAction<number>>;
}

const defaultState: AppContextType = {
  orderItems: [],
  setOrderItems: () => {}, // Accepts a parameter but does nothing
  discount: 0,
  setDiscount: () => {},
  serviceCharge: 0,
  setServiceCharge: () => {},
};

const AppContext = createContext<AppContextType>(defaultState);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);

  return (
    <AppContext.Provider
      value={{
        orderItems,
        setOrderItems,
        discount,
        setDiscount,
        serviceCharge,
        setServiceCharge,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
