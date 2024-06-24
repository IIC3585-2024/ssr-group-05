import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="p-8 bg-white shadow-md rounded-lg animate-pulse">
      <div className="h-8 bg-gray-300 rounded mb-4 w-3/4"></div>
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <div className="flex flex-col sm:mr-6">
          <div className="bg-gray-300 rounded-lg w-48 h-72"></div>
          <div className="mt-4">
            <div className="h-6 bg-gray-300 rounded mb-2 w-40"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-32"></div>
            <div className="h-6 bg-gray-300 rounded mb-2 w-36"></div>
          </div>
        </div>
        <div className="flex flex-col mt-4 sm:mt-0">
          <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-1/2"></div>
          <div className="flex flex-wrap mb-4">
            <div className="h-8 bg-gray-300 rounded mb-2 w-20 mr-2"></div>
            <div className="h-8 bg-gray-300 rounded mb-2 w-24 mr-2"></div>
            <div className="h-8 bg-gray-300 rounded mb-2 w-16 mr-2"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded mb-4 w-2/3"></div>
        </div>
      </div>
      <div className="h-8 bg-gray-300 rounded mb-4 w-1/2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
      <div className="h-6 bg-gray-300 rounded mb-2 w-full"></div>
    </div>
  );
};
