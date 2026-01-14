import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useContext(UserContext);
  const { addProduct } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ 
    title: "", 
    price: "", 
    image: "", 
    description: "", 
    category: "", 
    stock: "", 
  });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitProduct = (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.image || !form.description || !form.stock) {
      return toast.error("Fill all fields");
    }

    addProduct({
      ...form,
      stock: Number(form.stock),
    });

    toast.success("Product added!");
    setForm({
      title: "",
      price: "",
      image: "",
      description: "",
      category: "",
      stock: "",
    });
    navigate("/products");
  };

  if (!user?.isAdmin)
    return (
      <p className="text-center mt-10 text-red-500 font-semibold">
        Only Admin can add products.
      </p>
    );

  return (
    <div
      className={`flex justify-center items-center min-h-screen px-4 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <form
        onSubmit={submitProduct}
        className={`w-full max-w-lg p-6 rounded-2xl shadow-2xl flex flex-col gap-4
          ${darkMode ? "bg-gray-800 text-gray-100 border border-gray-700" : "bg-white text-gray-900 border border-gray-200"}`}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Add Product</h1>

        <input
          name="title"
          type="text"
          value={form.title}
          placeholder="Title"
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        />

        <input
          name="price"
          type="number"
          value={form.price}
          placeholder="Price"
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        />

        <input
          name="stock"
          type="number"
          value={form.stock}
          placeholder="Stock Quantity"
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        />

        <input
          name="image"
          type="text"
          value={form.image}
          placeholder="Image URL"
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        >
          <option value="">Select Category</option>
          <option value="COFFEE">COFFEE</option>
          <option value="FRENCH TOAST">FRENCH TOAST</option>
          <option value="SANDWICH">SANDWICH</option>
          <option value="FRAPPE">FRAPPE</option>
          <option value="CROISSANTS">CROISSANTS</option>
          <option value="COOKIES">COOKIES</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleInput}
          className={`border p-3 rounded-lg outline-none transition
            ${darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-amber-400" : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500"}`}
        />

        <button
          type="submit"
          className={`py-3 rounded-lg font-semibold transition
            ${darkMode ? "bg-amber-500 hover:bg-amber-400 text-gray-900" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
