import React, { useState } from "react";
import { FiHeart, FiEdit, FiMapPin, FiTag, FiUser, FiBox } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ClothesCard = ({ item }) => {
  const { user, axios } = useAppContext();
  const [likes, setLikes] = useState(item.likes || []);
  const [review, setReview] = useState("");
  const [animating, setAnimating] = useState(false);

 
  const isLiked = user ? likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!user) {
      toast.error("Login to like items!");
      return;
    }

    try {
      const res = await axios.get(`/like/${item._id}`);
      if (res.data.success) {
      
        setLikes(res.data.likes || []);
  
        setAnimating(true);
        setTimeout(() => setAnimating(false), 300);

        toast.success(isLiked ? "Like removed" : "Liked!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Like update failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to like item");
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]">
      {/* Image */}
      <div className="relative w-full h-64 group">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Like button */}
        <button
          onClick={handleLike}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all duration-300 ${
            isLiked ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"
          } ${animating ? "scale-125" : "scale-100"}`}
        >
          <FiHeart size={20} />
        </button>

        {/* Likes count */}
        <div className="absolute top-4 right-16 flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow text-sm font-medium text-gray-800">
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </div>

        {/* Category badge */}
        <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          {item.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Title & Edit */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 truncate">{item.title}</h2>
          {user?._id === item.giverId && (
            <button className="text-primary hover:text-primary-dull transition-colors duration-300">
              <FiEdit size={20} />
            </button>
          )}
        </div>

        {/* Size & Condition , Location */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1"><FiBox /> Size :  <span>{item.size}</span></div>
          <div className="flex items-center gap-1"><FiUser /> Condition : <span>{item.condition}</span></div>
          <div className="flex items-center gap-1"> <FiMapPin />Location :  <span>{item.location}</span></div>
        </div>

        {/* Price */}
        <div className="text-lg font-semibold text-gray-800">
          {item.isFree ? (
            <span className="text-primary">Free</span>
          ) : (
            <span>{item.price} {item.currency}</span>
          )}
        </div>


        {/* Review box */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write a review..."
          className="w-full mt-2 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 resize-none"
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};

export default ClothesCard;
