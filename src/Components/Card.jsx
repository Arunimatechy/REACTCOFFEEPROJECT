
// import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext";
// import { CartContext } from "../Context/CartContext";
// import { UserContext } from "../Context/UserContext";
// import { ThemeContext } from "../Context/ThemeContext";
// import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
// import ImageSkeleton from "../Components/ImageSkeleton";
// import StarRating from "../Components/StarRating";

// const Card = ({ product }) => {
//   const [qty, setQty] = useState(0);
//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [size, setSize] = useState("M");

//   const [form, setForm] = useState({
//     ...product,
//     price: Number(product.price) || 0,
//     rating: Number(product.rating) || 0,
//   });

//   const { deleteProduct, updateProduct } = useContext(ProductContext);
//   const { addToCart, removeFromCart, cart } = useContext(CartContext);
//   const { user } = useContext(UserContext);
//   const { darkMode } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const item = cart.find((i) => i.id === product.id);
//     setQty(item?.quantity || 0);
//   }, [cart, product.id]);

//   const handleAdd = () => {
//     if (!user) {
//       toast.error("Please login to order ☕");
//       navigate("/login");
//       return;
//     }
//     addToCart({ ...product, size });
//   };

//   const handleInput = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({
//       ...p,
//       [name]: name === "price" || name === "rating" ? Number(value) : value,
//     }));
//   };

//   const handleUpdate = () => {
//     updateProduct(form);
//     setIsEditing(false);
//     toast.success("Product updated");
//   };

//   return (
//     <div
//       className={`group rounded-3xl overflow-hidden border transition-transform duration-300
//       hover:shadow-2xl hover:scale-105 cursor-pointer
//       ${
//         darkMode
//           ? "bg-gradient-to-br from-gray-800 via-gray-900 to-black border-gray-700 text-[#f5ede6]"
//           : "bg-gradient-to-br from-[#fffaf6] via-[#f3e7d6] to-[#f1e2d6] border-[#e7d6c9] text-[#2b1e16]"
//       }`}
//     >
//       {/* IMAGE */}
//       <div className="relative h-56 overflow-hidden">
//         {!imgLoaded && <ImageSkeleton />}
//         <img
//           src={product.image}
//           alt={product.title}
//           onLoad={() => setImgLoaded(true)}
//           className={`w-full h-full object-cover transition duration-500 ${
//             imgLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
//           }`}
//         />

     
//         <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
//           ⏱️ 5–7 mins
//         </span>
//       </div>

      
//       <div className="p-5 space-y-3">
//         {!isEditing ? (
//           <>
            
//             <h2 className="text-xl font-bold text-center">{product.title}</h2>

            
//             <div className="flex justify-center">
//               <StarRating rating={product.rating || 4.5} size={16} />
//             </div>

            
//             <p className="text-sm text-center text-[#6b4b3a]">
//               {product.description}
//             </p>

            
//             <div className="flex justify-center gap-2 pt-2">
//               {["S", "M", "L"].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => setSize(s)}
//                   className={`px-4 py-1 rounded-full text-sm font-semibold
//                     ${
//                       size === s
//                         ? "bg-[#c08552] text-white"
//                         : "bg-[#f1e2d6] text-[#6b4b3a]"
//                     }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>

            
//             <p className="text-2xl font-extrabold text-center text-[#c08552]">
//               ₹ {product.price}
//             </p>

            
//             {!user?.isAdmin && (
//               <div className="pt-3 flex justify-center">
//                 {qty === 0 ? (
//                   <button
//                     onClick={handleAdd}
//                     className="bg-gradient-to-r from-[#c08552] to-[#a66a3c] text-white px-6 py-2 rounded-xl font-semibold shadow"
//                   >
//                     Add to Order ☕
//                   </button>
//                 ) : (
//                   <div className="flex items-center gap-4 bg-black/20 px-4 py-2 rounded-xl">
//                     <button
//                       onClick={() => removeFromCart(product)}
//                       className="px-3 py-1 bg-[#6b4b3a] text-white rounded"
//                     >
//                       −
//                     </button>
//                     <span className="font-bold">{qty}</span>
//                     <button
//                       onClick={handleAdd}
//                       className="px-3 py-1 bg-[#c08552] text-white rounded"
//                     >
//                       +
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </>
//         ) : (
          
//           <div className="flex flex-col gap-3">
//             <input
//               name="title"
//               value={form.title}
//               onChange={handleInput}
//               className="border p-2 rounded"
//               placeholder="Title"
//             />
//             <select
//               name="category"
//               value={form.category || ""}
//               onChange={handleInput}
//               className="border p-2 rounded"
//             >
//               <option value="">Select Category</option>
//               <option value="COFFEE">☕ Coffee</option>
//               <option value="FRENCH_TOAST">🍞 French Toast</option>
//               <option value="SANDWICH">🥪 Sandwich</option>
//               <option value="FRAPPE">🧋 Frappe</option>
//               <option value="CROISSANTS">🥐 Croissants</option>
//               <option value="COOKIES">🍪 Cookies</option>
//             </select>
//             <input
//               name="price"
//               type="number"
//               value={form.price}
//               onChange={handleInput}
//               className="border p-2 rounded"
//               placeholder="Price"
//             />
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleInput}
//               className="border p-2 rounded"
//               placeholder="Description"
//             />
//             <div className="flex items-center gap-2">
//               <label className="font-medium">Rating:</label>
//               <input
//                 type="range"
//                 min="0"
//                 max="5"
//                 step="0.5"
//                 name="rating"
//                 value={form.rating || 0}
//                 onChange={handleInput}
//                 className="flex-1"
//               />
//               <span>{form.rating}</span>
//             </div>
//             <div className="flex justify-between gap-2 pt-2">
//               <button
//                 onClick={handleUpdate}
//                 className="flex-1 bg-green-600 text-white py-2 rounded-lg"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 bg-gray-400 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

        
//         {!isEditing && user?.isAdmin && (
//           <div className="flex gap-2 pt-3">
//             <button
//               onClick={() => setIsEditing(true)}
//               className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() =>
//                 window.confirm("Delete product?") && deleteProduct(product.id)
//               }
//               className="flex-1 bg-red-600 text-white py-2 rounded-lg"
//             >
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Card;
 

import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import { CartContext } from "../Context/CartContext";
import { UserContext } from "../Context/UserContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageSkeleton from "../Components/ImageSkeleton";
import StarRating from "../Components/StarRating";

const Card = ({ product }) => {
  const [qty, setQty] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState("M");

  const [form, setForm] = useState({
    ...product,
    price: Number(product.price) || 0,
    rating: Number(product.rating) || 4.5,
    sizes: product.sizes || ["S", "M", "L"],
    prepTime: product.prepTime || "5–7 mins",
    shortDesc: product.shortDesc || "",
  });

  const { deleteProduct, updateProduct } = useContext(ProductContext);
  const { addToCart, removeFromCart, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const item = cart.find((i) => i.id === product.id);
    setQty(item?.quantity || 0);
  }, [cart, product.id]);

  const handleAdd = () => {
    if (!user) {
      toast.error("Please login to order ☕");
      navigate("/login");
      return;
    }
    addToCart({ ...product, size });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({
      ...p,
      [name]:
        name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const toggleSize = (s) => {
    setForm((p) => ({
      ...p,
      sizes: p.sizes.includes(s)
        ? p.sizes.filter((x) => x !== s)
        : [...p.sizes, s],
    }));
  };

  const handleUpdate = () => {
    updateProduct(form);
    setIsEditing(false);
    toast.success("Product updated ✅");
  };

  return (
    <div
      className={`rounded-3xl overflow-hidden border transition hover:scale-105
      ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-[#fffaf6] border-[#e7d6c9] text-[#2b1e16]"
      }`}
    >
      {/* IMAGE */}
      <div className="relative h-56">
        {!imgLoaded && <ImageSkeleton />}
        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImgLoaded(true)}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          ⏱️ {product.prepTime}
        </span>
      </div>

      <div className="p-5 space-y-3">
        {!isEditing ? (
          <>
            <h2 className="text-xl font-bold text-center">
              {product.title}
            </h2>

            <p className="text-xs text-center opacity-70">
              {product.category}
            </p>

            <div className="flex justify-center">
              <StarRating rating={product.rating} size={16} />
            </div>

            <p className="text-sm text-center opacity-80">
              {product.shortDesc || product.description}
            </p>

            {/* SIZE */}
            <div className="flex justify-center gap-2">
              {product.sizes?.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-1 rounded-full text-sm
                    ${
                      size === s
                        ? "bg-[#c08552] text-white"
                        : "bg-[#f1e2d6]"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-2xl font-bold text-center text-[#c08552]">
              ₹ {product.price}
            </p>

            {!user?.isAdmin && (
              <div className="flex justify-center">
                {qty === 0 ? (
                  <button
                    onClick={handleAdd}
                    className="bg-[#c08552] text-white px-6 py-2 rounded-xl"
                  >
                    Add to Order ☕
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <button onClick={() => removeFromCart(product)}>−</button>
                    <span>{qty}</span>
                    <button onClick={handleAdd}>+</button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* ================= EDIT MODE ================= */
          <div className="flex flex-col gap-3">
            <input
              name="title"
              value={form.title}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Title"
            />

            <input
              name="image"
              value={form.image}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Image URL"
            />

            <input
              name="shortDesc"
              value={form.shortDesc}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Short description"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Full description"
            />

            <input
              name="prepTime"
              value={form.prepTime}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Prep time"
            />

            <select
              name="category"
              value={form.category}
              onChange={handleInput}
              className="border p-2 rounded"
            >
              <option value="">Select Category</option>
              <option value="COFFEE">☕ Coffee</option>
              <option value="FRAPPE">🧋 Frappe</option>
              <option value="COOKIES">🍪 Cookies</option>
              <option value="SANDWICH">🥪 Sandwich</option>
              <option value="FRENCH_TOAST">🍞 French Toast</option>
              <option value="CROISSANTS">🥐 Croissants</option>
            </select>

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleInput}
              className="border p-2 rounded"
              placeholder="Price"
            />

            {/* SIZES */}
            <div className="flex gap-3">
              {["S", "M", "L"].map((s) => (
                <label key={s} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.sizes.includes(s)}
                    onChange={() => toggleSize(s)}
                  />
                  {s}
                </label>
              ))}
            </div>

            {/* RATING */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                name="rating"
                value={form.rating}
                onChange={handleInput}
              />
              <span>{form.rating}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-600 text-white py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isEditing && user?.isAdmin && (
          <div className="flex gap-2 pt-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-600 text-white py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() =>
                window.confirm("Delete product?") &&
                deleteProduct(product.id)
              }
              className="flex-1 bg-red-600 text-white py-2 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
