import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import Card from "../Components/Card.jsx";
import { ThemeContext } from "../Context/ThemeContext";

const CardPage = () => {
  const { products } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`p-6 min-h-screen transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">All Menu Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((p) => <Card key={p.id} product={p} />)
        ) : (
          <p className="col-span-full text-center text-lg opacity-70 mt-10">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default CardPage;
