

// import React, { useContext, useEffect, useState } from "react";
// import { ProductContext } from "../Context/ProductContext.jsx";
// import { ThemeContext } from "../Context/ThemeContext.jsx";
// import Card from "../Components/Card.jsx";
// import SkeletonCard from "../Components/SkeletonCard.jsx";

// const ListPage = () => {
//   const { products } = useContext(ProductContext);
//   const { darkMode } = useContext(ThemeContext);

//   const [filtered, setFiltered] = useState([]);
//   const [category, setCategory] = useState("");
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setFiltered(products);
//       setLoading(false);
//     }, 600);
//     return () => clearTimeout(timer);
//   }, [products]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       let data = products;

//       if (query.trim()) {
//         data = data.filter((item) =>
//           item.title.toLowerCase().includes(query.toLowerCase())
//         );
//       }

//       if (category) {
//         data = data.filter((item) => item.category === category);
//       }

//       setFiltered(data);
//     }, 200);

//     return () => clearTimeout(timer);
//   }, [query, category, products]);

//   return (
//     <div
//       className={`min-h-screen px-4 md:px-8 py-6 transition-colors
//       ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
//     >
    
//       <div className="max-w-7xl mx-auto mb-8 text-center">
//         <h1
//           className={`text-4xl font-extrabold tracking-tight
//           ${darkMode ? "text-amber-400" : "text-cyan-900"}`}
//         >
//           Café Menu ☕
//         </h1>
//         <p className="opacity-70 mt-1">
//           Freshly brewed drinks & baked delights
//         </p>
//       </div>

      
//       <div
//         className={`max-w-7xl mx-auto mb-6 p-4 rounded-2xl flex flex-wrap gap-4 justify-between items-center shadow
//         ${
//           darkMode
//             ? "bg-gray-800/80 backdrop-blur border border-gray-700"
//             : "bg-white/80 backdrop-blur border border-gray-200"
//         }`}
//       >
       
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="🔍 Search menu..."
//           className={`px-4 py-2 rounded-lg w-full md:w-64 outline-none transition
//             ${
//               darkMode
//                 ? "bg-gray-700 text-white placeholder-gray-400"
//                 : "bg-gray-100"
//             }`}
//         />

        
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className={`px-4 py-2 rounded-lg outline-none transition
//             ${
//               darkMode
//                 ? "bg-gray-700 text-white"
//                 : "bg-gray-100"
//             }`}
//         >
//           <option value="">All Categories</option>
//           <option value="COFFEE">☕ Coffee</option>
//           <option value="FRENCH_TOAST">🍞 French Toast</option>
//           <option value="SANDWICH">🥪 Sandwich</option>
//           <option value="FRAPPE">🧋 Frappe</option>
//           <option value="CROISSANTS">🥐 Croissants</option>
//           <option value="COOKIES">🍪 Cookies</option>
//         </select>
//       </div>

   
//       <div className="max-w-7xl mx-auto">
//         {loading ? (
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(8)].map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : filtered.length === 0 ? (
//           <p className="text-center opacity-70 text-lg">
//             No items found 😕
//           </p>
//         ) : (
//           <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filtered.map((product) => (
//               <Card key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListPage;
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductContext.jsx";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import Card from "../Components/Card.jsx";
import SkeletonCard from "../Components/SkeletonCard.jsx";

const ListPage = () => {
  const { products } = useContext(ProductContext);
  const { darkMode } = useContext(ThemeContext);

  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Initial load with skeleton
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setFiltered(products);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [products]);

  // Filter by search and category
  useEffect(() => {
    const timer = setTimeout(() => {
      let data = products;

      if (query.trim()) {
        data = data.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (category) {
        data = data.filter((item) => item.category === category);
      }

      setFiltered(data);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, category, products]);

  return (
    <div
      className={`min-h-screen px-4 md:px-8 py-6 transition-colors ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1
          className={`text-4xl font-extrabold tracking-tight ${
            darkMode ? "text-amber-400" : "text-cyan-900"
          }`}
        >
          Café Menu ☕
        </h1>
        <p className="opacity-70 mt-1">Freshly brewed drinks & baked delights</p>
      </div>

      {/* Search & Filter */}
      <div
        className={`max-w-7xl mx-auto mb-6 p-4 rounded-2xl flex flex-wrap gap-4 justify-between items-center shadow ${
          darkMode
            ? "bg-gray-800/80 backdrop-blur border border-gray-700"
            : "bg-white/80 backdrop-blur border border-gray-200"
        }`}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Search menu..."
          className={`px-4 py-2 rounded-lg w-full md:w-64 outline-none transition ${
            darkMode
              ? "bg-gray-700 text-white placeholder-gray-400"
              : "bg-gray-100"
          }`}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`px-4 py-2 rounded-lg outline-none transition ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-100"
          }`}
        >
          <option value="">All Categories</option>
          <option value="Coffee">☕ Coffee</option>
          <option value="French Toast">🍞 French Toast</option>
          <option value="Sandwich">🥪 Sandwich</option>
          <option value="Frappe">🧋 Frappe</option>
          <option value="Croissants">🥐 Croissants</option>
          <option value="Cookies">🍪 Cookies</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center opacity-70 text-lg">No items found 😕</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListPage;
