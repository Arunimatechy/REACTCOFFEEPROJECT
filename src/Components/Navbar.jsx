
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import { WishlistContext } from "../Context/WishlistContext.jsx";
import { Link } from "react-router-dom";

import { CiShoppingCart } from "react-icons/ci";
import { BiRegistered } from "react-icons/bi";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { cartlength } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <nav
      className={`flex justify-between items-center px-4 md:px-6 py-3 shadow-md sticky top-0 z-50 transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}
    >
    
      <div className="font-bold text-xl md:text-2xl">
        <Link to="/" className={darkMode ? "text-gray-100" : "text-gray-800"}>
          Coffee + Snacks
        </Link>
      </div>


      <div className="flex gap-3 md:gap-5 items-center flex-wrap md:flex-nowrap">
        <Link
          to="/"
          className={`hover:text-yellow-400 transition ${darkMode ? "text-gray-100" : "text-gray-700"}`}
        >
          Dashboard
        </Link>

        {user?.isAdmin && (
          <Link
            to="/admin"
            className="hover:text-yellow-400 transition"
          >
            Admin
          </Link>
        )}

        {user && !user.isAdmin && (
          <Link to="/orders" className="hover:text-yellow-400 transition">
            My Orders
          </Link>
        )}

       
        {user ? (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded-full font-semibold bg-gray-700 text-gray-100">
              ☕ {user.username}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded flex items-center gap-1"
            >
              <BiRegistered /> Register
            </Link>
          </>
        )}

   
        {user && !user.isAdmin && (
          <Link
            to="/wishlist"
            className="relative rounded-xl p-2 flex justify-center items-center hover:text-pink-400 transition"
          >
            <FaHeart size={22} />
            {wishlist.length > 0 && (
              <div className="w-5 h-5 bg-pink-500 text-white rounded-full text-xs flex items-center justify-center absolute -top-1 -right-1">
                {wishlist.length}
              </div>
            )}
          </Link>
        )}

    
        {user && !user.isAdmin && (
          <Link
            to="/cart"
            className="relative rounded-xl p-2 flex justify-center items-center hover:text-red-400 transition"
          >
            <CiShoppingCart size={28} />
            {cartlength > 0 && (
              <div className="animate-bounce w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center absolute -top-1 -right-1">
                {cartlength}
              </div>
            )}
          </Link>
        )}

        
        <button
          onClick={toggleTheme}
          className={`px-3 py-2 rounded-lg border transition ${
            darkMode
              ? "border-gray-400 hover:bg-gray-700 text-gray-100"
              : "border-gray-300 hover:bg-gray-100 text-gray-800"
          }`}
        >
          {darkMode ? <BsSunFill /> : <BsMoonFill />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
