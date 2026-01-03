import React from "react";
import { FiMail, FiUser, FiBox, FiShoppingBag, FiSearch } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import ClothesCard from "../reuseable/clothesCard";
import { Link } from "react-router-dom";


const Profile = () => {
  const { user, clothesPost } = useAppContext();
console.log(clothesPost)
  return (
    <div className="min-h-screen p-6 flex flex-col items-center px-6 md:px-18 lg:px-32">
      {/* Profile Container */}
      <div className="w-full mt-20">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

  {/* LEFT : Avatar */}
  <div className="flex items-center gap-4">
    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-semibold text-white">
      {user?.name?.charAt(0)}
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <FiUser className="text-gray-500" />
        {user.name}
      </h3>

      <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
        <FiMail />
        {user.email}
      </p>
    </div>
  </div>

  {/* CENTER : Stats */}
  <div className="flex items-center gap-8 text-center">
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400 flex items-center justify-center gap-1">
     <FiUser/>   Role
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">
        
        {user.role.toUpperCase()}
      </p>
    </div>

    <div>
      <p className="text-xs uppercase tracking-wide text-gray-400 flex items-center justify-center gap-1">
        <FiBox />
      {user.role === "sharer"
          ? "Clothes Post"
          : "Order Items"}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">
        {user.role === "sharer"
          ? user?.clothesPost.length
          : user?.orderItems.length }
      </p>
    </div>
    {user?.role === "finder" &&
     <div>
      <p className="text-xs uppercase tracking-wide text-gray-400 flex items-center justify-center gap-1">
        <FiShoppingBag />
     Select Items
      </p>
      <p className="mt-1 text-sm font-medium text-gray-800">
        {user?.selectItems.length }
      </p>
    </div> 
    }
  </div>

  {/* RIGHT : Action */}
  <Link to="/dashboard" className="btn-primary px-6 py-2">
    Dashboard
  </Link>

</div>


        {/* Clothes Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {clothesPost.length > 0  ? (
            clothesPost.map((item) => (
              <ClothesCard item={item} key={item._id} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No clothes posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
