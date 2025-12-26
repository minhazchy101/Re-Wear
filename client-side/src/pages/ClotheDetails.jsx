import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import {
  FiHeart,
  FiMapPin,
  FiTag,
  FiUser,
  FiPhone,
  FiMail,
  FiBox,
  FiShoppingBag,
} from 'react-icons/fi'
import toast from 'react-hot-toast'

const ClotheDetails = () => {
  const { id } = useParams()
  const { clothes, user, axios } = useAppContext()

  const clothe = clothes.find(item =>  item._id === id)
  const [thumbnail, setThumbnail] = React.useState(clothe?.images?.[0])

  const [likes, setLikes] = useState( clothe.likes || []);

  const [animating, setAnimating] = useState(false);

 
  const isLiked = user ? likes.includes(user._id) : false;

  const handleLike = async () => {
    if (!user) {
      toast.error("Login to like items!");
      return;
    }

    try {
      const res = await axios.get(`/like/${ clothe._id}`);
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


  if (!clothe) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">

        {/* IMAGE GALLERY */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {clothe.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setThumbnail(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition
                ${thumbnail === img ? 'border-primary' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={thumbnail}
              alt={clothe.title}
              className="w-full h-[520px] object-cover"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col">

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">
            {clothe.title}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-center gap-4">
            {clothe.isFree ? (
              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                Free
              </span>
            ) : (
              <p className="text-4xl font-extrabold text-primary">
                {clothe.price} {clothe.currency}
              </p>
            )}

            <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              {clothe.condition}
            </span>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {clothe.description}
          </p>

          {/* META GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <Info icon={<FiBox />} label="Category" value={clothe.category} />
            <Info icon={<FiTag />} label="Size" value={clothe.size} />
            <Info icon={<FiMapPin />} label="Location" value={clothe.location} />
            <Info icon={<FiBox />} label="Status" value={clothe.status} />
          </div>

          {/* SELLER CARD */}
          <div className="mt-10 p-6 rounded-2xl  bg-white">
            <p className="text-xs text-gray-500 mb-3">Seller information</p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <FiUser className="text-gray-600" />
              </div>

              <div>
                <p className="font-semibold text-gray-800">
                  {clothe.giverName}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FiMail />
                  {clothe.giverEmail}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-gray-700">
              <FiPhone />
              <span className="font-medium">+{clothe.contactNumber}</span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-10">
            
                        <div className="flex-1 py-3 rounded-xl text-gray-700 font-medium flex items-center justify-center gap-2 transition">
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
            {/* <button className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <FiHeart />
              {clothe.likes.length} Likes
            </button> */}

            {/* <button className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
               <FiPhone />
              Contact Seller
            </button> */}
            <button className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
             <FiShoppingBag />
              Select
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

const Info = ({ icon, label, value }) => (
  <div className="p-4 rounded-xl bg-gray-50 flex items-center gap-3 shadow-2xl">
    <div className="text-gray-500 text-md">{icon}</div>
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  </div>
)

export default ClotheDetails
