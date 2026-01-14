
import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import Card from "../Components/Card.jsx";
import { ThemeContext } from "../Context/ThemeContext";

const CardPage = () => {
  const { products } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`p-6 min-h-screen transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-5">All Products</h1>
      <div className="flex flex-wrap gap-6">
        {products.length > 0 ? products.map(p => <Card key={p.id} product={p} />) : <p>No products found.</p>}
      </div>
    </div>
  );
};

export default CardPage;
