import React from "react";
import { FiMail, FiPhone, FiUser, FiBox } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import ClothesCard from "../reuseable/clothesCard";


const Profile = () => {
  const { user } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center px-6 md:px-18 lg:px-32">
      {/* Profile Container */}
      <div className="w-full rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl border-2 mt-20">
       <div className="flex flex-col lg:flex-row gap-8 items-center">

  {/* LEFT : Avatar & Basic Info */}
  <div className="w-full lg:w-1/4 bg-primary-dull/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300">
    
    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-5xl font-bold text-white mb-4">
      {user.name[0]}
    </div>

    <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
    <p className="text-sm text-primary capitalize mt-1">{user.role}</p>

  </div>

  {/* RIGHT : Info Cards */}
  <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2  gap-6">

    {[
      { icon: <FiMail />, label: "Email", value: user.email },
      { icon: <FiPhone />, label: "Contact", value: user.contact },
      { icon: <FiUser />, label: "Role", value: user.role },
      { icon: <FiBox />, label: "Clothes Posted", value: user.clothesPost.length },
    ].map((info, idx) => (
      <div
        key={idx}
        className="group flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <div className="p-3 rounded-xl bg-primary-dull/20 text-primary text-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {info.icon}
        </div>

        <div>
          <p className="text-sm text-gray-500">{info.label}</p>
          <p className="text-gray-800 font-medium capitalize">{info.value}</p>
        </div>
      </div>
    ))}

  </div>
</div>

        {/* Clothes Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {user.clothesPost.length > 0 ? (
            user.clothesPost.map((item) => (
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
