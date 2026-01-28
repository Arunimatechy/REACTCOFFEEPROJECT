

import React, { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart = [], clearCart } = useContext(CartContext); 
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phonenumber: "",
    payment: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (!user) return toast.error("Please login first");
    if (cart.length === 0) return toast.error("Your cart is empty");

    for (let key in form) {
      if (!form[key]) {
        return toast.error("Please fill all fields");
      }
    }

    const order = {
      id: Date.now(),
      userId: user.id,
      username: user.username,
      items: cart,
      total,
      payment: form.payment,
      status: "Pending",
      date: new Date().toISOString(),
    };

    addOrder(order);
    clearCart();
    navigate("/success");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <form
        onSubmit={placeOrder}
        className={`w-full max-w-xl p-8 md:p-10 rounded-3xl shadow-2xl border backdrop-blur-md transition-colors ${
          darkMode
            ? "bg-gray-800/90 border-gray-700"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-amber-400" : "text-cyan-950"
          }`}
        >
          Delivery Address
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-xl border outline-none"
        />

        <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          rows="3"
          className="w-full mb-4 p-3 rounded-xl border outline-none resize-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="p-3 rounded-xl border outline-none"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="p-3 rounded-xl border outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          
          <input
            type="text"
            name="phonenumber"
            placeholder="Phone Number"
            value={form.phonenumber}
            onChange={handleChange}
            className="p-3 rounded-xl border outline-none"
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="p-3 rounded-xl border outline-none"
          />
        </div>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-3">Payment Method</h3>

          {["COD", "UPI"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-3 mb-3 p-3 border rounded-xl cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={form.payment === method}
                onChange={handleChange}
              />
              <span>
                {method === "COD"
                  ? "Cash on Delivery"
                  : "UPI / Online Payment"}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-amber-500">₹{total}</span>
        </div>

        <button
          type="submit"
          className="mt-6 w-full p-3 rounded-xl bg-amber-500 hover:bg-amber-400 font-semibold text-gray-900"
        >
          PLACE ORDER
        </button>
      </form>
    </div>
  );
};

export default Checkout;
