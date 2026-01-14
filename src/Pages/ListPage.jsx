
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import Card from "../Components/Card.jsx";

const ListPage = () => {
  const { products } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);

  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setFiltered(products);
  }, [products]);

  useEffect(() => {
    let data = products;

    if (query.trim()) {
      data = data.filter((x) =>
        x.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((x) => x.category === category);
    }

    setFiltered(data);
  }, [query, category, products]);

  return (
    <div className={`p-6 flex flex-col items-center min-h-screen
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      
      <h1 className={`text-3xl font-bold mb-4
        ${darkMode ? "text-amber-400" : "text-cyan-950"}`}>
        Product List
      </h1>

      <div className="flex gap-4 mb-4 flex-wrap justify-center">
        <input
          onInput={(e) => setQuery(e.target.value)}
          placeholder="Search product..."
          className={`p-2 rounded outline-none border
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
        />

        <select
          onChange={(e) => setCategory(e.target.value)}
          className={`p-2 rounded outline-none border
            ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300"}`}
        >
          <option value="">Select Category</option>
          <option value="COFFEE">COFFEE</option>
          <option value="FRENCH TOAST">FRENCH TOAST</option>
          <option value="SANDWICH">SANDWICH</option>
          <option value="FRAPPE">FRAPPE</option>
          <option value="CROISSANTS">CROISSANTS</option>
          <option value="COOKIES">COOKIES</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <h2 className="text-lg opacity-70">No Products Found</h2>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filtered.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
