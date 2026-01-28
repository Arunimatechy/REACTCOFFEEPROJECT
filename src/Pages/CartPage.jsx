

import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();


  const { cart = [], addToCart, removeFromCart } = useContext(CartContext);
  const { darkMode } = useContext(ThemeContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`min-h-screen w-full transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {cart.length === 0 ? (
          <div className="mt-24 text-center text-2xl font-semibold opacity-70">
            🛒 Your cart is empty
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div
              className={`flex-1 overflow-x-auto rounded-2xl shadow-xl border transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr
                    className={`text-sm uppercase ${
                      darkMode
                        ? "bg-gray-700 text-gray-100"
                        : "bg-cyan-950 text-amber-50"
                    }`}
                  >
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Price</th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map((product) => (
                    <tr
                      key={product.id}
                      className={`border-t transition-colors ${
                        darkMode
                          ? "border-gray-700 hover:bg-gray-700/40"
                          : "border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <td className="p-4 flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-16 h-16 object-contain rounded-lg"
                        />
                        <span className="font-medium">{product.title}</span>
                      </td>

                      <td className="p-4 text-center">
                        <div className="inline-flex items-center border rounded-lg overflow-hidden">
                          <button
                            onClick={() => removeFromCart(product)}
                            className="px-3 py-1 font-bold hover:bg-red-500/30"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 font-semibold">
                            {product.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="px-3 py-1 font-bold hover:bg-green-500/30"
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="p-4 text-right font-semibold">
                        ₹{product.price * product.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

           
            <div
              className={`w-full md:w-96 p-6 rounded-2xl shadow-xl border flex flex-col gap-6 transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-2xl font-bold text-center">
                Order Summary
              </h2>

              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span className="text-amber-500 font-bold">
                  ₹{total}
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className={`w-full py-3 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg ${
                  darkMode
                    ? "bg-amber-500 hover:bg-amber-400 text-gray-900"
                    : "bg-cyan-950 hover:bg-cyan-900 text-amber-50"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
