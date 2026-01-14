import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { OrderContext } from "../Context/OrderContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { darkMode } = useContext(ThemeContext);
  const { orders } = useContext(OrderContext);

  const totalOrders = orders.length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-5 rounded ${darkMode ? "bg-blue-700 text-white" : "bg-blue-500 text-white"}`}>
          Total Orders<br />{totalOrders}
        </div>
        <div className={`p-5 rounded ${darkMode ? "bg-yellow-600 text-black" : "bg-yellow-400 text-white"}`}>
          Pending<br />{pending}
        </div>
        <div className={`p-5 rounded ${darkMode ? "bg-green-700 text-white" : "bg-green-500 text-white"}`}>
          Delivered<br />{delivered}
        </div>
        <div className={`p-5 rounded ${darkMode ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"}`}>
          Revenue<br />₹{revenue}
        </div>
      </div>

  
      <div className="flex gap-4 flex-wrap">
        <Link
          to="/admin/add"
          className={`px-4 py-2 rounded font-semibold shadow 
            ${darkMode ? "bg-cyan-700 text-white hover:bg-cyan-600" : "bg-cyan-600 text-white hover:bg-cyan-500"}`}
        >
          ➕ Add Product
        </Link>

        <Link
          to="/"
          className={`px-4 py-2 rounded font-semibold shadow 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-white text-indigo-700 hover:bg-gray-100 border"}`}
        >
          📦 View Products
        </Link>

        <Link
          to="/admin/orders"
          className={`px-4 py-2 rounded font-semibold shadow 
            ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-500 text-white hover:bg-gray-400"}`}
        >
          🛒 View Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

