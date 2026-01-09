import React, { useState } from "react";
import post from "../../assets/HP.png";
import scroll from "../../assets/HS.png";
import order from "../../assets/HO.png";

const HIW = () => {
  const [active, setActive] = useState(0);

  const data = [
    {
      step: 1,
      title: "Post Your Clothes",
      subtitle: [
        "Upload photos of your clothes with details like size, condition, and price. Share them instantly for others to see.",
      ],
      img: post,
    },
    {
      step: 2,
      title: "Explore & Discover",
      subtitle: [
        "Browse through verified pre-loved fashion. Find items you like, save favorites, and compare easily.",
      ],
      img: scroll,
    },
    {
      step: 3,
      title: "Select & Contact",
      subtitle: [
        "Interested in an item? Contact the owner directly via the provided info to arrange pickup. Quick and simple.",
      ],
      img: order,
    },
  ];

  const current = data[active];

  return (
    <section className="section relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-white to-primary-dull/20" />

      {/* Glow orbs */}
      <div className="absolute  -top-40 -left-40 h-96 w-96 bg-primary/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 bg-primary-dull/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
        {/* LEFT — Steps */}
        <div className="flex-1">
          <h2
            className="text-2xl md:text-4xl font-extrabold mb-10 tracking-tight
      bg-linear-to-r from-primary to-primary-dull bg-clip-text text-transparent
      "
          >
            <span className="text-black"> How It</span> Works
          </h2>

          <ul className="space-y-6">
            {data.map((item, index) => (
              <li
                key={item.step}
                onClick={() => setActive(index)}
                className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300
              ${
                active === index
                  ? "border-primary bg-white/80 shadow-lg shadow-primary/20 scale-[1.02]"
                  : "border-primary/40 bg-white hover:-translate-y-1 hover:shadow-md"
              }
            `}
              >
                <div className="flex items-center gap-5">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-sm
                  ${
                    active === index
                      ? "bg-linear-to-br from-primary to-primary-dull text-white shadow-md"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
                  >
                    {item.step}
                  </span>

                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT — Content */}
        <div className="flex-1 flex flex-col items-start justify-center gap-2 md:gap-4 ">
          <div className="mb-4 h-36">
            <h3 className="text-lg md:text-4xl font-semibold tracking-tight mb-4 text-primary-dull">
              {current.title}
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm md:text-lg max-w-md">
              {current.subtitle}
            </p>
          </div>

          {/* Image Card */}
          <div className="relative w-fit">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/30 to-primary-dull/30 rounded-3xl" />

            <img
              src={current.img}
              alt={current.title}
              className="relative w-62 h-80  rounded-xl shadow-2xl border border-white/60 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HIW;
