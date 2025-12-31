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
const isSelected = selectItems?.some(selectedItem => selectedItem._id === item._id);

  const handleLike = async () => {
    if (!user) return toast.error("Login to like items!");
    try {
      const res = await axios.get(`/like/${item._id}`);
      if (res.data.success) {
        setLikes(res.data.likes || []);
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);
      }
    } catch {
      toast.error("Failed to like item");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* IMAGE */}
      <div
        onClick={() => navigate(`/clothe-details/${item._id}`)}
        className="relative cursor-pointer group"
      >
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* PRICE BADGE */}
        <span
          className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-semibold
            ${item.isFree ? "bg-green-500 text-white" : "bg-primary text-white"}`}
        >
          {item.isFree ? "Free" : `${item.price} ${item.currency}`}
        </span>

        {/* LIKE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLike();
          }}
          className={`absolute bottom-4 right-4 p-2 rounded-full shadow-lg transition
            ${
              isLiked
                ? "bg-primary text-white"
                : "bg-white text-primary hover:bg-primary hover:text-white"
            }
            ${animating && "scale-125"}`}
        >
          <FiHeart size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {item.title}
        </h3>

        <div className="text-sm text-gray-500 space-y-1">
          <p className="flex items-center gap-2">
            <FiCheckCircle /> {item.status}
          </p>
          <p className="flex items-center gap-2">
            <FiBox /> Size: {item.size}
          </p>
          <p className="flex items-center gap-2">
            <FiTag /> {item.condition}
          </p>
          <p className="flex items-center gap-2">
            <FiMapPin /> {item.location}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 pt-3">
          <button
            onClick={() => navigate(`/clothe-details/${item._id}`)}
            className="flex-1 bg-primary-dull text-primary rounded-xl py-2 text-sm font-medium hover:bg-primary/20"
          >
            Details
          </button>

          {user?._id === item.giverId ? (
            <>
              <button
                onClick={() =>
                  navigate(`dashboard/edit-clothe/${item._id}`)
                }
                className="flex-1 bg-primary text-white rounded-xl py-2 text-sm hover:bg-primary-dull"
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
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition
                ${
                  isSelected
                    ? "bg-primary-dull text-primary"
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
