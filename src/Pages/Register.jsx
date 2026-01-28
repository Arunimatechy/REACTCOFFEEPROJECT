import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUsers } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [emailError, setEmailError] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setEmailError("");
    setForm((prev) => ({ ...prev, [name]: value || "" })); // fallback to "" for safety
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Fill all fields");
      return;
    }

    const res = registerUsers(form);

    if (!res.success) {
      setEmailError(res.message);
      return;
    }

    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4
        ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-100"
        }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-md shadow-xl
          ${darkMode
            ? "bg-gray-800/80 text-gray-100 border border-gray-700"
            : "bg-white/80 text-gray-900 border border-gray-200"
          }`}
      >
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-sm mb-6 opacity-70">
          Join us and start ordering delicious food
        </p>

     
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your name"
            value={form.username || ""} 
            onChange={handleInput}
            className={`w-full p-3 rounded-lg outline-none transition
              ${darkMode
                ? "bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-amber-400"
                : "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
          />
        </div>

    
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email || ""} 
            onChange={handleInput}
            className={`w-full p-3 rounded-lg outline-none transition
              ${emailError
                ? "border-red-500 focus:ring-red-500"
                : darkMode
                ? "bg-gray-700 border border-gray-600 focus:ring-amber-400"
                : "bg-gray-100 border border-gray-300 focus:ring-indigo-500"
              }`}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        
        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password || ""} 
            onChange={handleInput}
            className={`w-full p-3 rounded-lg outline-none transition
              ${darkMode
                ? "bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-amber-400"
                : "bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500"
              }`}
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold tracking-wide transition-all
            ${darkMode
              ? "bg-amber-500 text-gray-900 hover:bg-amber-400"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          Register
        </button>

        <p className="text-center text-sm mt-6 opacity-70">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline hover:text-indigo-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
