import React, { useContext } from "react";
import { OrderContext } from "../Context/OrderContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";

const Orders = () => {
  const { orders = [], deleteOrder, updateOrderStatus } = useContext(OrderContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);


  if (!user) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <h2 className="text-xl font-semibold">Please login to view your orders</h2>
      </div>
    );
  }


  const userOrders = user?.isAdmin ? orders : orders.filter((o) => o.userId === user.id);


  if (userOrders.length === 0) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        <h2 className="text-xl font-semibold">No Orders Found</h2>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          {user?.isAdmin ? "All Orders (Admin)" : "My Orders"}
        </h1>

        {userOrders.map((order) => {
          const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0);

          return (
            <div
              key={order.id}
              className={`mb-8 rounded-xl border shadow transition-transform transform hover:scale-[1.01] ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
             
              <div
                className={`grid grid-cols-2 md:grid-cols-6 gap-4 p-5 text-sm font-semibold ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
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

                 
                  {!user?.isAdmin && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold inline-block transition ${
                        order.status === "Pending"
                          ? "bg-yellow-400 text-black shadow-sm"
                          : order.status === "Confirmed"
                          ? "bg-blue-400 text-black shadow-sm"
                          : "bg-green-500 text-white shadow-sm"
                      }`}
                    >
                      {order.status}
                    </span>
                  )}

                  {user?.isAdmin && (
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`mt-1 px-3 py-2 rounded-lg border font-semibold transition ${
                        darkMode
                          ? "bg-gray-800 text-white border-gray-600 hover:border-amber-400"
                          : "bg-white border-gray-400 hover:border-cyan-700"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  )}
                </div>
              </div>

            
              {user?.isAdmin && (
                <div className="flex justify-end px-5 pt-4">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm transition"
                  >
                    Delete Order
                  </button>
                </div>
              )}

             
              <div className="divide-y flex flex-col gap-3">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between p-5">
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm opacity-70">₹{item.price}</p>
                    </div>
                    <div className="font-semibold">
                      Qty: {item.quantity} | ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

             
              <div
                className={`px-5 py-4 flex justify-between font-semibold ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <span>Total Payable</span>
                <span className="text-amber-500">₹{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
