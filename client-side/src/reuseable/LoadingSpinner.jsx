import React from "react";

const LoadingSpinner = ({
  size = "w-8 h-8",
  color = "text-primary",
  className = ""
}) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}
      />
    </div>
  );
};

export default LoadingSpinner;
