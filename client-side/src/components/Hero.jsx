import { FiHeart, FiUsers, FiRepeat } from "react-icons/fi";
import hero from "../../assets/he.png";

const Hero = () => {
  return (
   <section
      className="relative h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-light-bg/10"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Give Clothes a <span className="text-primary">Second Life</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-800">
          ReWear connects people who want to donate or sell unused clothes at a
          low price with those who need them. Build trust through genuine
          reviews and make fashion more sustainable—together.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-3 btn-primary rounded-full">
            Donate Clothes
          </button>
          <button className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition font-medium">
            Find Clothes
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
