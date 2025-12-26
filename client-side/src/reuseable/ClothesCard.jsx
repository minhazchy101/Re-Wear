import React, { useState } from "react";
import { FiHeart, FiEdit, FiMapPin, FiTag, FiUser, FiBox } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ClothesCard = ({ item }) => {
  const { user, axios, navigate,selectItem } = useAppContext();
  const [likes, setLikes] = useState(item.likes || []);

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
    <div
    className="max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.03]">
      {/* Image */}
      <div
      onClick={()=>{navigate(`/clothe-details/${item._id}`);scrollTo(0,0)}}
      className="relative w-72 cursor-pointer group">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-72 h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />

       

          {item.isFree ? (<div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
            Free
          </div>) : (<div className="absolute bottom-4 left-4 bg-primary/70 text-light-bg px-3 py-1 rounded-full text-xs font-semibold shadow">
            Price : {item.price} {item.currency}

          </div>)}

      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Title & Edit */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 truncate">{item.title}</h2>


            <div className="flex flex-row-reverse gap-3">
               {/* Like button */}
        <button
          onClick={handleLike}
          className={` cursor-pointer p-2 rounded-full shadow-lg transition-all duration-300 ${
            isLiked ? "bg-primary text-white" : "bg-white text-primary hover:bg-primary hover:text-white"
          } ${animating ? "scale-125" : "scale-100"}`}
        >
          <FiHeart size={20} />
        </button>

        {/* Likes count */}
        <div className=" flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow text-sm font-medium text-gray-800">
          {likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </div>
            </div>
          {/* edit */}
          {/* {user?._id === item.giverId && (
            <button className="text-primary hover:text-primary-dull transition-colors duration-300">
              <FiEdit size={20} />
            </button>
          )} */}
        </div>

        {/* Size & Condition , Location */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-1"><FiBox /> Size :  <span>{item.size}</span></div>
          <div className="flex items-center gap-1"><FiUser /> Condition : <span>{item.condition}</span></div>
          <div className="flex items-center gap-1"> <FiMapPin />Location :  <span>{item.location}</span></div>
        </div>
            <div className="flex justify-between gap-0.5">
        <button 
        onClick={()=>{navigate(`/clothe-details/${item._id}`);scrollTo(0,0)}}
        className="px-2 py-0.5 rounded-md text-white bg-primary hover:bg-primary-dull cursor-pointer text-sm">Details</button>
        <button 
        onClick={()=>selectItem(item._id)}
        className="px-2 py-0.5 rounded-md text-white bg-primary hover:bg-primary-dull cursor-pointer text-sm">Select Item</button>


            </div>
      </div>
    </div>
  );
};

export default ClothesCard;
