import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 0, size = 18 }) => {
  
  const safeRating = Math.min(Math.max(rating, 0), 5);

  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} size={size} />
      ))}

      {halfStar && <FaStarHalfAlt size={size} />}

      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} size={size} />
      ))}

      <span className="ml-2 text-sm text-gray-500">{safeRating} / 5</span>
    </div>
  );
};

export default StarRating;



