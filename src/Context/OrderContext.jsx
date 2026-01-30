

import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
 
  const [orders, setOrders] = useState(() => 
    JSON.parse(localStorage.getItem("orders")) || []
  );

 
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders(prev => [
      ...prev, 
      { id: Date.now(), status: "Pending", ...order }
    ]);
  };

  
  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, deleteOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
