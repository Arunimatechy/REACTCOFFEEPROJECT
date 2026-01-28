import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ThemeContext } from "../Context/ThemeContext";

const OrderSuccess = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`shadow-2xl rounded-2xl p-10 text-center max-w-md w-full transition-all ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <FaCheckCircle className="text-green-500 text-7xl mx-auto mb-5 animate-bounce" />
        <h1 className="text-3xl font-extrabold mb-3">Order Placed Successfully!</h1>
        <p className="text-sm mb-6 opacity-80">
          Your order has been placed and is being processed. Thank you for shopping with us!
        </p>
        <Link
          to="/orders"
          className={`inline-block w-full py-3 rounded-xl font-semibold transition-transform transform hover:scale-105 ${
            darkMode
              ? "bg-cyan-700 hover:bg-cyan-600 text-white shadow-md"
              : "bg-cyan-950 hover:bg-cyan-900 text-amber-50 shadow-md"
          }`}
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
