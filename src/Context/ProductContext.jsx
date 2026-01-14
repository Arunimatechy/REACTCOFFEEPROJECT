
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  
  const addProduct = (data) => {
    setProducts((prev) => [
      ...prev,
      {
        id: Date.now(),
        reviews: [],   
        ...data,
      },
    ]);
  };

  
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

 
  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, ...updatedData } : p
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
