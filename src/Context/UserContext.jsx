import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("users")) || []
  );

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const registerUsers = (data) => {
    const emailExists = users.some(u => u.email === data.email);

    if (emailExists) {
      return { success: false, message: "Email already exists" };
    }

    setUsers(prev => [
      ...prev,
      {
        ...data,
        id: Date.now(),
        isAdmin: false,
      }
    ]);

    toast.success("Registered successfully");
    return { success: true };
  };

  // LOGIN
  const loginUser = (data) => {
    const found = users.find(u => u.email === data.email);
    if (!found) return toast.error("User not found");
    if (found.password !== data.password)
      return toast.error("Wrong password");

    setUser(found);
    toast.success("Login success");
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    clearCart();
    navigate("/");
    toast.success("Logged out");
  };

  return (
    <UserContext.Provider
      value={{ user, users, registerUsers, loginUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
