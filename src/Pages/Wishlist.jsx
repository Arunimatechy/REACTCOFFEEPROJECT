import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { ThemeContext } from "../Context/ThemeContext";
import Card from "../Components/Card";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen p-6 transition-colors
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center opacity-70">No items in wishlist</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;




