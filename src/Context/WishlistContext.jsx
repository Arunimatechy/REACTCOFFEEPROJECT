
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  const storageKey = user ? `wishlist_${user.id}` : null;

  useEffect(() => {
    if (storageKey) {
      const stored = JSON.parse(localStorage.getItem(storageKey)) || [];
      setWishlist(stored);
    } else {
      setWishlist([]);
    }
  }, [storageKey]);

  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, storageKey]);

  const toggleWishlist = (product) => {
    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }

    if (user.isAdmin) return;

    const exists = wishlist.some((item) => item.id === product.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast("Removed from wishlist");
    } else {
      setWishlist([...wishlist, product]);
      toast.success("Added to wishlist");
    }
  };

  const isWishlisted = (id) =>
    wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
