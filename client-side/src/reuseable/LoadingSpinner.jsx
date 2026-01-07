import React from "react";

const LoadingSpinner = ({ size = "w-8 h-8", color = "text-primary" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-t-transparent ${color} ${size}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
