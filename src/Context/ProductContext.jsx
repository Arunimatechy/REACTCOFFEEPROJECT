
// import { createContext, useState, useEffect } from "react";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState(() => {
//     const stored = localStorage.getItem("products");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("products", JSON.stringify(products));
//   }, [products]);

//   const addProduct = (data) => {
//     setProducts(prev => [...prev, { id: Date.now(), reviews: [], ...data }]);
//   };

//   const deleteProduct = (id) => {
//     setProducts(prev => prev.filter(p => p.id !== id));
//   };

//   const updateProduct = (updatedProduct) => {
//     setProducts(prev =>
//       prev.map(p => p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p)
//     );
//   };

//   return (
//     <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";
import { products as defaultProducts } from "../data/data.js";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : defaultProducts; // Use default products if nothing in localStorage
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (data) => {
    setProducts((prev) => [...prev, { id: Date.now(), reviews: [], ...data }]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
