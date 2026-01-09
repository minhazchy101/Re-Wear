import React from "react";
import { useAppContext } from "../context/AppContext";
import ClothesCard from "../reuseable/ClothesCard";
import { Link } from "react-router-dom";

const RecentlyAdded = () => {
  const { clothes } = useAppContext();

  return (
    <section className="section py-16">
      
      <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight
      bg-linear-to-r from-primary to-primary-dull bg-clip-text text-transparent
      ">
                        <span className="text-black">New</span> ARRIVALS
                    </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {clothes?.slice(0, 8).map((item) => (
          <ClothesCard
            key={item._id}
            item={item}
            className="transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300"
          />
        ))}
      </div>

      {clothes?.length > 0 && (
        <div className="flex justify-center mt-10">
          <Link to={"/allClothes"} className="px-8 py-3 rounded-full btn-primary">
            View All
          </Link>
        </div>
      )}
    </section>
  );
};

export default RecentlyAdded;
