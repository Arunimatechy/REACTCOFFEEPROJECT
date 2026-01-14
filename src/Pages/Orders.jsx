
import React, { useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";

const Orders = () => {
  const { orders, deleteOrder, updateOrderStatus } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <h2>Please login to view your orders</h2>
      </div>
    );
  }

  const userOrders = user.isAdmin
    ? orders
    : orders.filter((o) => o.userId === user.id);

  if (userOrders.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
      >
        <h2>No Orders Found</h2>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">
          {user.isAdmin ? "All Orders" : "My Orders"}
        </h2>

        {userOrders.map((order) => {
          const totalItems = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <div
              key={order.id}
              className={`mb-10 rounded-xl shadow-md border transition-colors
              ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
            >
             
              <div
                className={`grid grid-cols-2 md:grid-cols-6 gap-4 p-5 text-sm font-semibold
                ${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-900"}`}
              >
                <div>
                  <p className="text-xs opacity-70">ORDER ID</p>
                  <p>{order.id}</p>
                </div>

                <div>
                  <p className="text-xs opacity-70">TOTAL</p>
                  <p>₹{order.total}</p>
                </div>

                <div>
                  <p className="text-xs opacity-70">ITEMS</p>
                  <p>{totalItems}</p>
                </div>

                <div>
                  <p className="text-xs opacity-70">PAYMENT</p>
                  <p>{order.payment}</p>
                </div>

                <div>
                  <p className="text-xs opacity-70">DATE</p>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>

              
                <div>
                  <p className="text-xs opacity-70">STATUS</p>

                  {!user.isAdmin && (
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-bold inline-block
                        ${
                          order.status === "Pending"
                            ? darkMode
                              ? "bg-yellow-700 text-white"
                              : "bg-yellow-300 text-black"
                            : order.status === "Confirmed"
                            ? darkMode
                              ? "bg-blue-700 text-white"
                              : "bg-blue-300 text-black"
                            : darkMode
                            ? "bg-green-700 text-white"
                            : "bg-green-300 text-black"
                        }`}
                    >
                      {order.status === "Pending" && "⏳ Pending"}
                      {order.status === "Confirmed" && "📦 Confirmed"}
                      {order.status === "Delivered" && "✅ Delivered"}
                    </span>
                  )}

                  {user.isAdmin && (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className={`mt-1 px-3 py-1.5 rounded border font-semibold transition-colors
                        ${
                          darkMode
                            ? "bg-gray-800 text-white border-gray-600"
                            : "bg-white text-black border-gray-400"
                        }`}
                    >
                      <option value="Pending">⏳ Pending</option>
                      <option value="Confirmed">📦 Confirmed</option>
                      <option value="Delivered">✅ Delivered</option>
                    </select>
                  )}
                </div>
              </div>

              {user.isAdmin && (
                <div className="flex justify-end px-5 pt-4">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                  >
                    Delete Order
                  </button>
                </div>
              )}

             
              <div className="divide-y">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between p-5">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm">₹{item.price}</p>
                    </div>
                    <div>
                      Qty: {item.quantity} | ₹
                      {item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              
              <div
                className={`px-5 py-4 flex justify-between font-semibold transition-colors
                ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
              >
                <span>Total Payable</span>
                <span className="text-amber-600">₹{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
