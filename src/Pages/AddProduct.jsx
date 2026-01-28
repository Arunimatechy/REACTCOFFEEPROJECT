import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StarRating from "../Components/StarRating";

const AddProduct = () => {
  const { user } = useContext(UserContext);
  const { addProduct } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    shortDesc: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    rating: 4.5,
    sizes: ["S", "M", "L"],
    prepTime: "5–7 mins",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const submitProduct = (e) => {
    e.preventDefault();

    if (!form.title || !form.shortDesc || !form.price || !form.image || !form.category) {
      return toast.error("Fill all required fields");
    }

    addProduct(form);
    toast.success("Café item added ☕");
    navigate("/");
  };

  if (!user?.isAdmin) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold text-lg">
        Only Admin can add products
      </p>
    );
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center px-4 py-10 transition-colors ${
        darkMode ? "bg-gray-900" : "bg-amber-50"
      }`}
    >
      <form
        onSubmit={submitProduct}
        className={`w-full max-w-xl p-8 rounded-3xl shadow-2xl space-y-5 transition-all ${
          darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
        <h1 className="text-3xl font-extrabold text-center">
          Add Café Menu Item ☕
        </h1>

        <input
          name="title"
          placeholder="Item name (Latte, Cappuccino)"
          value={form.title}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <input
          name="shortDesc"
          placeholder="Short description (1–2 lines)"
          value={form.shortDesc}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <textarea
          name="description"
          placeholder="Full description (optional)"
          rows={3}
          value={form.description}
          onChange={handleInput}
          className={`input-field resize-none ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <input
          name="price"
          type="number"
          placeholder="Base price (₹)"
          value={form.price}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        >
          <option value="">Select Category</option>
          <option value="COFFEE">COFFEE</option>
          <option value="FRAPPE">FRAPPE</option>
          <option value="BAKERY">BAKERY</option>
          <option value="SANDWICH">SANDWICH</option>
        </select>

        <input
          name="prepTime"
          placeholder="Prep time (e.g., 5–7 mins)"
          value={form.prepTime}
          onChange={handleInput}
          className={`input-field ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
        />

        <div>
          <label className="font-semibold mb-1 block">Rating: {form.rating}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
            className="w-full accent-amber-500"
          />
          <div className="mt-1">
            <StarRating rating={form.rating} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-all shadow-lg"
        >
          Add to Menu
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
