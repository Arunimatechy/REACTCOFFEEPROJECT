

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { ProductContext } from "../Context/ProductContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const QuickViewModal = ({ product, open, onClose }) => {
  const { addtoCart } = useContext(CartContext);
  const { updateProduct } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

 
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open || !product) return null;

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (user.isAdmin) return;

    addtoCart(product);
    toast.success("Added to cart!");
    onClose();
  };

  const addReview = () => {
    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    const newReview = {
      user: user?.name || "User",
      rating: reviewRating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    updateProduct(product.id, {
      ...product,
      reviews: [...(product.reviews || []), newReview],
    });

    setComment("");
    setReviewRating(5);
    toast.success("Review submitted");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      
      <div
        className={`relative w-full max-w-md max-h-[85vh] overflow-y-auto p-6 rounded-2xl shadow-2xl
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
      >
       
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold opacity-70 hover:opacity-100"
        >
          ✕
        </button>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover rounded-xl mb-4"
        />

        <h2 className="text-2xl font-bold text-center">{product.title}</h2>

        <p className="text-green-600 font-semibold text-center mb-2">
          ₹ {product.price}
        </p>

        <p className="text-sm text-center opacity-80 mb-4">
          {product.description}
        </p>

        
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Customer Reviews</h3>

          {product.reviews?.length > 0 ? (
            product.reviews.map((r, i) => (
              <div
                key={i}
                className={`border-t pt-2 mt-2
                ${darkMode ? "border-gray-600" : "border-gray-300"}`}
              >
                <p className="font-semibold">{r.user}</p>
                <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
                <p className="text-sm">{r.comment}</p>
                <p className="text-xs opacity-60">{r.date}</p>
              </div>
            ))
          ) : (
            <p className="text-sm opacity-60">No reviews yet</p>
          )}
        </div>

        {user && !user.isAdmin && (
          <div className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a review..."
              className="border p-2 w-full rounded mb-2 text-black"
            />

            <select
              value={reviewRating}
              onChange={(e) => setReviewRating(Number(e.target.value))}
              className="border p-2 rounded mb-2 w-full text-black"
            >
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>

            <button
              onClick={addReview}
              className="bg-green-600 text-white w-full py-2 rounded mb-3"
            >
              Submit Review
            </button>
          </div>
        )}

       
        {!user?.isAdmin && (
          <button
            onClick={handleAddToCart}
            className={`w-full py-2 rounded-lg font-semibold mb-2
            ${darkMode
              ? "bg-amber-500 text-gray-900"
              : "bg-yellow-400 text-gray-900"}`}
          >
            Add to Cart
          </button>
        )}

        
        <button
          onClick={onClose}
          className={`sticky bottom-0 w-full py-2 rounded-lg border font-semibold mt-2
          ${darkMode
            ? "border-gray-600 text-gray-100 bg-gray-800"
            : "border-gray-300 text-gray-800 bg-white"}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuickViewModal;
