import { FiHeart, FiUsers, FiRepeat } from "react-icons/fi";
import hero from "../../assets/he.png";
import { Link } from "react-router-dom";

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
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
      <span className="text-primary">ReWear</span> Where Clothes Find New Owners</h1>

        <p className="mt-6 text-based md:text-lg text-gray-800">
          Post clothes you no longer need, or discover clothes you can use — free or for sale, all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to={"/dashboard"} className="px-8 py-3 btn-primary rounded-full">
            Donate Clothes
          </Link>
          <Link to={"/allClothes"} className="px-8 py-3 rounded-full border border-white hover:bg-white hover:text-black transition font-medium">
            Find Clothes
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;
