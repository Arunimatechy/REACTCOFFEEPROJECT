import { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders(prev => [...prev, order]);
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status } : o
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, deleteOrder, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};
