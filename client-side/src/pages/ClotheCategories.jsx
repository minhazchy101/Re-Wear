import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ClothesCard from "../reuseable/ClothesCard";

const ClotheCategories = () => {
  const { categories } = useParams();
  const { clothes } = useAppContext();

  // Filter clothes by category
  const clotheCategories = clothes.filter(
    (clothe) => clothe.category === categories
  );

  // Format category name for title
  const formattedCategory = categories.charAt(0).toUpperCase() + categories.slice(1);

  return (
    <section className="px-6 md:px-16 lg:px-24 py-16 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        {formattedCategory} Collection
      </h1>

      <p className="text-center text-gray-500 mb-10">
        {clotheCategories.length > 0
          ? `We found ${clotheCategories.length} items in the ${formattedCategory} category.`
          : `Sorry, there are no clothes available in the ${formattedCategory} category right now.`}
      </p>

      {clotheCategories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clotheCategories.map((item) => (
            <ClothesCard
              key={item._id}
              item={item}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ClotheCategories;
