import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-3xl overflow-hidden border bg-white border-gray-200
      dark:bg-gray-800 dark:border-gray-700"
    >
      
      <div className="h-56 w-full bg-gray-200 dark:bg-gray-700" />

      
      <div className="p-5 space-y-4">
        
        <div className="h-5 w-3/4 mx-auto bg-gray-300 dark:bg-gray-600 rounded" />

        
        <div className="h-4 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded" />

        
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded" />
          <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded" />
        </div>

        
        <div className="h-6 w-24 mx-auto bg-gray-300 dark:bg-gray-600 rounded" />

        
        <div className="h-10 w-32 mx-auto bg-gray-300 dark:bg-gray-600 rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonCard;
