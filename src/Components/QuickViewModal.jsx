import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const QuickViewModal = ({ product, open, onClose }) => {
  const { addtoCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  if (!open || !product) return null;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (user.isAdmin) return;

    addtoCart(product);
    toast.success("Added to cart!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className={`w-full max-w-md p-6 rounded-2xl shadow-2xl transition-all duration-300
          ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover rounded-xl mb-4 shadow-md"
        />
        <h2 className="text-2xl font-bold text-center mb-1">{product.title}</h2>
        <p className="text-green-600 font-semibold text-center mb-2">₹ {product.price}</p>
        <p className="text-sm text-center opacity-80 mb-4">{product.description}</p>

        {!user?.isAdmin && (
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded-lg font-semibold mb-2 transition-all
              ${darkMode ? "bg-amber-500 hover:bg-amber-400 text-gray-900" : "bg-yellow-400 hover:bg-yellow-300 text-gray-900"}`}
          >
            Add to Cart
          </button>
        )}

        <button
          onClick={onClose}
          className={`w-full py-2 rounded-lg border font-semibold transition-all
            ${darkMode ? "border-gray-600 hover:border-gray-500 text-gray-100" : "border-gray-300 hover:border-gray-400 text-gray-800"}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;
