
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Fill all fields");
    loginUser(form);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl transition-colors
          ${darkMode
            ? "bg-gray-800 border border-gray-700 text-gray-100"
            : "bg-white border border-gray-200 text-gray-900"
          }`}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-sm mb-6 opacity-70">
          Login to continue ordering
        </p>

     
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            onChange={handleInput}
            className={`w-full p-3 rounded-lg outline-none transition
              ${darkMode
                ? "bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-amber-400 text-white"
                : "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
              }`}
          />
        </div>

     
        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            onChange={handleInput}
            className={`w-full p-3 rounded-lg outline-none transition
              ${darkMode
                ? "bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-amber-400 text-white"
                : "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-900"
              }`}
          />
        </div>

    
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold tracking-wide transition
            ${darkMode
              ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          Login
        </button>

       
        <p className="text-center text-sm mt-6 opacity-70">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className={`font-semibold underline transition
              ${darkMode ? "text-amber-400 hover:text-amber-300" : "text-indigo-600 hover:text-indigo-500"}`}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
