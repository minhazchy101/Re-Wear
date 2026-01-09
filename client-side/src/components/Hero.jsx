import { FiHeart, FiUsers, FiRepeat } from "react-icons/fi";
import hero from "../../assets/heroBG_md.png";
import hero_sm from "../../assets/hero_sm.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full">
      {/* Hero Images */}
      <div className="w-full h-screen relative overflow-hidden">
        {/* Desktop */}
        <img
          src={hero}
          alt="Hero Background"
          className="hidden lg:block w-full h-full object-cover"
        />
        {/* Mobile */}
        <img
          src={hero_sm}
          alt="Hero Background"
          className="block lg:hidden w-full h-full object-cover"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-center section max-w-1/2">
          <h1 className="text-3xl md:text-6xl font-bold text-primary mb-4">
            Re<span className="text-gray-900">Wear</span>
          </h1>
          <p className="text-base md:text-lg text-gray-800 mb-6 max-w-lg">
            Post clothes you no longer need, or discover clothes you can use — free or for sale, all in one place.
           
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3 btn-primary rounded-full w-fit"
            >
              Share Clothes
            </Link>
            <Link
              to="/allClothes"
              className="px-6 py-3 btn-secondary rounded-full w-fit hidden md:block"
            >
              Find Clothes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
