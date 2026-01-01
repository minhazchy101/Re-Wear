import React, { useState } from "react";
import {
  FiHeart,
  FiBox,
  FiMapPin,
  FiCheckCircle,
  FiTag,
} from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ClothesCard = ({ item }) => {
  const { user, axios, navigate, selectItem, handleDelete, removeSelectItem,selectItems } =
    useAppContext();

  const [likes, setLikes] = useState(item.likes || []);
  const [animating, setAnimating] = useState(false);

  const isLiked = user ? likes.includes(user._id) : false;
 const isSelected = selectItems?.some(
  (it) => it._id.toString() === item._id.toString()
);

 const handleLike = async () => {
    if (!user) return toast.error("Login to like items!");
    try {
      const res = await axios.get(`/like/${item._id}`);
      if (res.data.success) {
        setLikes(res.data.likes || []);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);
        toast.success(isLiked ? "Like removed" : "Liked!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to like item");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* IMAGE */}
      <div
        onClick={() => navigate(`/clothe-details/${item._id}`)}
        className="relative cursor-pointer group overflow-hidden"
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* PRICE BADGE */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold
            ${item.isFree ? "bg-green-500 text-white" : "bg-primary text-white"}`}
        >
          {item.isFree ? "Free" : `${item.price} ${item.currency}`}
        </span>

        {/* LIKE BUTTON + COUNT */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 px-2 py-1 rounded-xl shadow z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike();
            }}
            className={`p-2 rounded-full transition-all duration-300
              ${
                isLiked
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              }
              ${animating ? "scale-125" : "scale-100"}`}
          >
            <FiHeart size={14} />
          </button>

          <span className="text-xs font-medium text-primary whitespace-nowrap">
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </span>
        </div>

        {/* SELECTED OVERLAY */}
        {isSelected && (
          <div className="absolute inset-0 bg-primary-dull/30 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              Selected
            </span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {item.title}
        </h3>

        <div className="text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <FiCheckCircle /> Status: {item.status}
          </p>
          <p className="flex items-center gap-2">
            <FiBox /> Size: {item.size}
          </p>
          <p className="flex items-center gap-2">
            <FiTag /> Condition: {item.condition}
          </p>
          <p className="flex items-center gap-2">
            <FiMapPin /> {item.location}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={() => navigate(`/clothe-details/${item._id}`)}
            className="flex-1 btn-primary py-2 px-1"
          >
            Details
          </button>

          {user?._id === item.giverId ? (
            <>
              <button
                onClick={() =>
                  navigate(`dashboard/edit-clothe/${item._id}`)
                }
                className="flex-1 btn-primary py-2 px-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 bg-red-500 text-white rounded-xl py-2 text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </>
          ) : (
            <button
              onClick={() =>
                isSelected
                  ? removeSelectItem(item._id)
                  : selectItem(item._id)
              }
              className={`flex-1 btn-primary py-2 px-1
                ${
                  isSelected
                    ? "bg-primary-dull text-white"
                    : "bg-primary text-white hover:bg-primary-dull"
                }`}
            >
              {isSelected ? "Remove Item" : "Select Item"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClothesCard;
