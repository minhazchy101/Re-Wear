import React from "react";
import { NavLink } from "react-router-dom";
import { FiSmile, FiUser, FiHeart} from "react-icons/fi";

const Categories = () => {
  const categories = [
    { text: "Kids",  gender: "Unisex", path: "kids", icon: FiSmile, bgColor: "#FEF6DA" },
    { text: "Man",  gender: "Male", path: "men", icon: FiUser, bgColor: "#E0F2FE" },
    { text: "Woman",  gender: "Female", path: "women", icon: FiHeart, bgColor: "#FCE7F3" },
    ];

  return (
    <section className="section py-16  bg-light-bg">

      <h2 className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight
      bg-linear-to-r from-primary to-primary-dull/40 bg-clip-text text-transparent
      ">
                        <span className="text-black">Scroll by</span> Categories
                    </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {categories.map((cat, index) => {
          const Icon = cat.icon; 

          return (
            <NavLink
              key={index}
              to={`/clothe-categories/${cat.path}`}
              onClick={() => scrollTo(0, 0)} 
              className="group rounded-xl p-6 flex flex-col items-center text-center
                         transition-transform transform hover:-translate-y-2 hover:scale-105
                         hover:shadow-xl duration-300"
              style={{ backgroundColor: cat.bgColor }}
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center
                              text-primary text-2xl mb-3 transition-transform transform
                              group-hover:rotate-12 group-hover:scale-110 duration-300">
                <Icon />
              </div>

              <h3 className="font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                {cat.text}
              </h3>

              <p className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors duration-300">
                Explore collection
              </p>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
