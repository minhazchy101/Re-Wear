import React from "react";
import { useAppContext } from "../context/AppContext";
import ClothesCard from "../reuseable/clothesCard";
import { Link } from "react-router-dom";

const RecentlyAdded = () => {
  const { clothes } = useAppContext();

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Recently Added
      </h1>

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
