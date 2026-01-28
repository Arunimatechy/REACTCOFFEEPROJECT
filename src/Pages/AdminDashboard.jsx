import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { Link, Navigate } from "react-router-dom";

const AdminDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { orders } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />;
  }

 
  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      bg: darkMode ? "bg-blue-700" : "bg-blue-600",
      text: "text-white",
    },
    {
      label: "Pending",
      value: pending,
      bg: darkMode ? "bg-yellow-600" : "bg-yellow-400",
      text: "text-gray-900",
    },
    {
      label: "Delivered",
      value: delivered,
      bg: darkMode ? "bg-green-700" : "bg-green-600",
      text: "text-white",
    },
    {
      label: "Revenue",
      value: `₹${revenue}`,
      bg: darkMode ? "bg-indigo-700" : "bg-indigo-600",
      text: "text-white",
    },
  ];

  const buttonStyles =
    "px-5 py-3 rounded-2xl font-semibold shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105";

  return (
    <div
      className={`min-h-screen p-8 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1
        className={`text-4xl font-extrabold mb-8 tracking-tight text-center md:text-left ${
          darkMode ? "text-amber-400" : "text-cyan-950"
        }`}
      >
        Admin Dashboard
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl ${stat.bg} ${stat.text} shadow-xl flex flex-col justify-center items-center transition-all transform hover:-translate-y-2 hover:shadow-2xl`}
          >
            <p className="text-sm opacity-80">{stat.label}</p>
            <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
          </div>
        ))}
      </div>

      
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <Link
          to="/admin/add"
          className={`${buttonStyles} ${
            darkMode ? "bg-amber-500 hover:bg-amber-400 text-gray-900" : "bg-amber-600 hover:bg-amber-500 text-white"
          }`}
        >
          ➕ Add Product
        </Link>

        <Link
          to="/"
          className={`${buttonStyles} ${
            darkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600"
              : "bg-white text-indigo-700 border border-indigo-500 hover:bg-indigo-50"
          }`}
        >
          📦 View Products
        </Link>

        <Link
          to="/admin/orders"
          className={`${buttonStyles} ${
            darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          🛒 View Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
