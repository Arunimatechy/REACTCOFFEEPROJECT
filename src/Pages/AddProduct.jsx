
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
        className={`w-full max-w-sm p-6 rounded-3xl shadow-2xl space-y-4 transition-all ${
          darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-900 border border-gray-200"
        }`}
      >
      
        {form.image && (
          <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
            <img
              src={form.image}
              alt={form.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

     
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xl font-bold">{form.title || "Product Name"}</h2>
          <StarRating rating={form.rating} />
          <p className="text-sm text-gray-400 mt-1">{form.prepTime}</p>
        </div>

        <input
          name="title"
          placeholder="Item Name (Latte, Cappuccino)"
          value={form.title}
          onChange={handleInput}
          className={`w-full p-3 rounded-xl border transition ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

        <input
          name="shortDesc"
          placeholder="Short description"
          value={form.shortDesc}
          onChange={handleInput}
          className={`w-full p-3 rounded-xl border transition ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

        <textarea
          name="description"
          placeholder="Full description"
          value={form.description}
          onChange={handleInput}
          rows={2}
          className={`w-full p-3 rounded-xl border resize-none transition ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

        <div className="flex gap-2">
          <input
            name="price"
            type="number"
            placeholder="Price (₹)"
            value={form.price}
            onChange={handleInput}
            className={`flex-1 p-3 rounded-xl border transition ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
          />

          <input
            name="prepTime"
            placeholder="Prep Time"
            value={form.prepTime}
            onChange={handleInput}
            className={`w-32 p-3 rounded-xl border transition ${
              darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
            }`}
          />
        </div>

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleInput}
          className={`w-full p-3 rounded-xl border transition ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleInput}
          className={`w-full p-3 rounded-xl border transition ${
            darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        >
          <option value="">Select Category</option>
          <option value="COFFEE">COFFEE</option>
          <option value="FRAPPE">FRAPPE</option>
          <option value="BAKERY">BAKERY</option>
          <option value="SANDWICH">SANDWICH</option>
          <option value="COOKIES">COOKIES</option>
          <option value="FRENCH TOAST">FRENCH TOAST</option>
        </select>

    
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Rating: {form.rating}</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={form.rating}
            onChange={(e) => setForm((p) => ({ ...p, rating: Number(e.target.value) }))}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-all shadow-lg"
          >
            Add to Menu
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
