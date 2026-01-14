// import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext.jsx";
// import { CartContext } from "../Context/CartContext.jsx";
// import { UserContext } from "../Context/UserContext.jsx";
// import { ThemeContext } from "../Context/ThemeContext.jsx";
// import { WishlistContext } from "../Context/WishlistContext.jsx";
// import { useNavigate } from "react-router-dom";
// import QuickViewModal from "./QuickViewModal";
// import ImageSkeleton from "./ImageSkeleton";
// import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
// import toast from "react-hot-toast";

// const Card = ({ product }) => {
//   const [qty, setQty] = useState(0);
//   const [isEditing, setIsEditing] = useState(false);
//   const [form, setForm] = useState({ ...product });
//   const [open, setOpen] = useState(false);
//   const [imgLoaded, setImgLoaded] = useState(false);

//   const { deleteProduct, updateProduct, reduceStock } = useContext(ProductContext);
//   const { addtoCart, removeFromCart, Cart } = useContext(CartContext);
//   const { user } = useContext(UserContext);
//   const { darkMode } = useContext(ThemeContext);
//   const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const item = Cart.find((x) => x.id === product.id);
//     setQty(item?.quantity || 0);
//   }, [Cart, product.id]);

//   const handleInput = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

//   const handleUpdate = () => {
//     updateProduct(product.id, form);
//     setIsEditing(false);
//   };

//   const handleAddToCart = () => {
//     if (!user) {
//       toast.error("Please login");
//       navigate("/login");
//       return;
//     }
//     if (product.stock === 0) {
//       toast.error("Out of Stock");
//       return;
//     }
//     addtoCart(product);
//     reduceStock(product.id);
//     toast.success("Added to cart!");
//   };

//   const handleRemoveFromCart = () => removeFromCart(product);

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: product.title,
//         text: product.description,
//         url: window.location.href,
//       });
//     } else toast.error("Sharing not supported");
//   };

//   return (
//     <>
//       <div
//         className={`rounded-2xl p-4 border shadow-lg transition-all duration-300
//           ${
//             darkMode
//               ? "bg-gray-800 text-gray-100 border-gray-700 hover:shadow-2xl"
//               : "bg-white text-gray-900 border-gray-200 hover:shadow-2xl"
//           }`}
//       >
       
//         <div className="relative overflow-hidden rounded-xl">
//           {!imgLoaded && <ImageSkeleton />}
//           <img
//             src={product.image}
//             alt={product.title}
//             onLoad={() => setImgLoaded(true)}
//             onClick={() => setOpen(true)}
//             className={`w-full h-52 object-cover cursor-pointer transition-transform duration-500 hover:scale-105 rounded-xl ${imgLoaded ? "block" : "hidden"}`}
//           />

         
//           <button
//             onClick={handleShare}
//             className={`absolute top-3 left-3 p-2 rounded-full shadow hover:scale-110 transition
//               ${darkMode ? "bg-gray-700/80 text-gray-100" : "bg-white text-gray-800"}`}
//           >
//             <FaShareAlt />
//           </button>

//           {!user?.isAdmin && (
//             <button
//               onClick={() => toggleWishlist(product)}
//               className={`absolute top-3 right-3 p-2 rounded-full shadow hover:scale-110 transition
//                 ${darkMode ? "bg-gray-700/80 text-gray-100" : "bg-white text-gray-800"}`}
//             >
//               {isWishlisted(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
//             </button>
//           )}
//         </div>

        
//         {isEditing ? (
//           <div className="flex flex-col gap-2 mt-3">
//             <input name="title" value={form.title} onChange={handleInput} className="border p-2 rounded" placeholder="Title" />
//             <input name="price" value={form.price} onChange={handleInput} className="border p-2 rounded" placeholder="Price" />
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleInput}
//               className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
//             >
//               <option value="">Select Category</option>
//               <option value="COFFEE">COFFEE</option>
//               <option value="FRENCH TOAST">FRENCH TOAST</option>
//               <option value="SANDWICH">SANDWICH</option>
//               <option value="FRAPPE">FRAPPE</option>
//               <option value="CROISSANTS">CROISSANTS</option>
//               <option value="COOKIES">COOKIES</option>
//             </select>
//             <input name="image" value={form.image} onChange={handleInput} className="border p-2 rounded" placeholder="Image URL" />
//             <textarea name="description" value={form.description} onChange={handleInput} className="border p-2 rounded" placeholder="Description" />
//             <div className="flex gap-2">
//               <button onClick={handleUpdate} className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700 transition">
//                 Save
//               </button>
//               <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 transition">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-lg font-bold mt-3 text-center">{product.title}</h2>
//             <p className="text-green-500 font-semibold text-center">₹ {product.price}</p>
//             <p className="text-sm text-center opacity-80">{product.category}</p>

//             {user?.isAdmin && <p className="text-sm mt-2 text-center opacity-90">{product.description}</p>}

//             {!user?.isAdmin && qty > 0 && (
//               <div className="flex justify-center gap-4 mt-3">
//                 <button onClick={handleRemoveFromCart} className="bg-gray-300 px-2 rounded hover:bg-gray-400 transition">-</button>
//                 <span>{qty}</span>
//                 <button onClick={handleAddToCart} className="bg-amber-400 px-2 rounded hover:bg-amber-500 transition">+</button>
//               </div>
//             )}

//             {!user?.isAdmin && product.stock > 0 && qty === 0 && (
//               <button onClick={handleAddToCart} className="w-full bg-amber-400 mt-3 py-2 rounded hover:bg-amber-500 transition">
//                 Add to Cart
//               </button>
//             )}

//             {user?.isAdmin && (
//               <div className="flex gap-2 mt-3">
//                 <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition">Edit</button>
//                 <button
//                   onClick={() => window.confirm("Delete product?") && deleteProduct(product.id)}
//                   className="bg-red-600 text-white py-2 rounded w-full hover:bg-red-700 transition"
//                 >
//                   Delete
//                 </button>
//               </div>
//             )}

//             {!user?.isAdmin && (
//               <button onClick={() => setOpen(true)} className="w-full mt-2 border border-dashed py-2 rounded-lg hover:border-amber-400 transition">
//                 👀 Quick View
//               </button>
//             )}
//           </>
//         )}
//       </div>

//       <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
//     </>
//   );
// };

// export default Card;


import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { CartContext } from "../Context/CartContext.jsx";
import { UserContext } from "../Context/UserContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { WishlistContext } from "../Context/WishlistContext.jsx";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "./QuickViewModal";
import ImageSkeleton from "./ImageSkeleton";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Card = ({ product }) => {
  const [qty, setQty] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...product });
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { deleteProduct, updateProduct, reduceStock } = useContext(ProductContext);
  const { addtoCart, removeFromCart, Cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext);

  const navigate = useNavigate();

  useEffect(() => {
    const item = Cart.find((x) => x.id === product.id);
    setQty(item?.quantity || 0);
  }, [Cart, product.id]);

  const handleInput = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = () => {
    updateProduct(product.id, form);
    setIsEditing(false);
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login");
      navigate("/login");
      return;
    }
    if (product.stock === 0) {
      toast.error("Out of Stock");
      return;
    }
    addtoCart(product);
    reduceStock(product.id);
    setQty((prev) => prev + 1);
    toast.success("Added to cart!");
  };

  const handleRemoveFromCart = () => {
    if (qty > 0) {
      removeFromCart(product);
      setQty((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else toast.error("Sharing not supported");
  };

  return (
    <>
      <div
        className={`rounded-2xl p-4 border shadow-lg transition-all duration-300
          ${
            darkMode
              ? "bg-gray-800 text-gray-100 border-gray-700 hover:shadow-2xl"
              : "bg-white text-gray-900 border-gray-200 hover:shadow-2xl"
          }`}
      >
        <div className="relative overflow-hidden rounded-xl">
          {!imgLoaded && <ImageSkeleton />}
          <img
            src={product.image}
            alt={product.title}
            onLoad={() => setImgLoaded(true)}
            onClick={() => setOpen(true)}
            className={`w-full h-52 object-cover cursor-pointer transition-transform duration-500 hover:scale-105 rounded-xl ${
              imgLoaded ? "block" : "hidden"
            }`}
          />

          <button
            onClick={handleShare}
            className={`absolute top-3 left-3 p-2 rounded-full shadow hover:scale-110 transition
              ${darkMode ? "bg-gray-700/80 text-gray-100" : "bg-white text-gray-800"}`}
          >
            <FaShareAlt />
          </button>

          {!user?.isAdmin && (
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 rounded-full shadow hover:scale-110 transition
                ${darkMode ? "bg-gray-700/80 text-gray-100" : "bg-white text-gray-800"}`}
            >
              {isWishlisted(product.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 mt-3">
            <input name="title" value={form.title} onChange={handleInput} className="border p-2 rounded" placeholder="Title" />
            <input name="price" value={form.price} onChange={handleInput} className="border p-2 rounded" placeholder="Price" />
            <select
              name="category"
              value={form.category}
              onChange={handleInput}
              className={`border p-2 rounded ${darkMode ? "bg-gray-700 text-gray-100 border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
            >
              <option value="">Select Category</option>
              <option value="COFFEE">COFFEE</option>
              <option value="FRENCH TOAST">FRENCH TOAST</option>
              <option value="SANDWICH">SANDWICH</option>
              <option value="FRAPPE">FRAPPE</option>
              <option value="CROISSANTS">CROISSANTS</option>
              <option value="COOKIES">COOKIES</option>
            </select>
            <input name="image" value={form.image} onChange={handleInput} className="border p-2 rounded" placeholder="Image URL" />
            <textarea name="description" value={form.description} onChange={handleInput} className="border p-2 rounded" placeholder="Description" />
            <div className="flex gap-2">
              <button onClick={handleUpdate} className="bg-green-600 text-white py-2 rounded w-full hover:bg-green-700 transition">
                Save
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white py-2 rounded w-full hover:bg-gray-600 transition">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-bold mt-3 text-center">{product.title}</h2>
            <p className="text-green-500 font-semibold text-center">₹ {product.price}</p>
            <p className="text-sm text-center opacity-80">{product.category}</p>

            {user?.isAdmin && <p className="text-sm mt-2 text-center opacity-90">{product.description}</p>}

           
            {!user?.isAdmin && (
              <div className="flex justify-center mt-3">
                {qty === 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-amber-400 py-2 rounded hover:bg-amber-500 transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleRemoveFromCart}
                      className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
                    >
                      -
                    </button>
                    <span className="px-2 py-1">{qty}</span>
                    <button
                      onClick={handleAddToCart}
                      className="bg-amber-400 px-3 py-1 rounded hover:bg-amber-500 transition"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            )}

            {user?.isAdmin && (
              <div className="flex gap-2 mt-3">
                <button onClick={() => setIsEditing(true)} className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700 transition">Edit</button>
                <button
                  onClick={() => window.confirm("Delete product?") && deleteProduct(product.id)}
                  className="bg-red-600 text-white py-2 rounded w-full hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            )}

            {!user?.isAdmin && (
              <button onClick={() => setOpen(true)} className="w-full mt-2 border border-dashed py-2 rounded-lg hover:border-amber-400 transition">
                👀 Quick View
              </button>
            )}
          </>
        )}
      </div>

      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Card;
