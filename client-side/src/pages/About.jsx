import { FiHeart, FiUsers, FiRepeat } from "react-icons/fi";


const About = () => {
  return (
    <section className="section py-16">
      <div className="text-center space-y-2 sm:space-y-4 md:scroll-p-6 pb-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold md:font-bold">About <span className="text-primary">Re</span>Wear</h1>
           <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            A platform to post, find, sell, or donate clothes.
          </p>
      </div>
   
    

      {/* OUR STORY */}
      <div className=" flex flex-col items-center text-center w-full mx-auto py-12 bg-light-bg rounded-lg">
        <span className="bg-primary-dull/60 px-3 py-1 rounded-md text-white text-sm tracking-wide uppercase mb-4">
          Our Story
        </span>

        <h3 className="text-2xl md:text-4xl font-bold mb-6">
          Simple ideas create meaningful products
        </h3>

        <p className="text-gray-700 leading-relaxed text-lg max-w-6xl mx-auto">
          The idea came to me while talking with my sisters. They shared real-world
          problems about donating clothes or selling them at low prices. That
          conversation sparked the thought to create ReWear, and I decided to
          build it to solve these everyday challenges.
        </p>
      </div>

      {/* OUR MISSION */}
<div className=" py-16 grid md:grid-cols-3 gap-10 text-center">
  
  {/* PROBLEM */}
  <div className="group p-8 rounded-2xl bg-gray-50 
                  transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:shadow-xl hover:bg-primary/90">
    <FiRepeat className="text-4xl text-primary mb-4 mx-auto transition-colors duration-300 group-hover:text-white" />
    <h4 className="text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-white">
      The Problem
    </h4>
    <p className="text-gray-600 transition-colors duration-300 group-hover:text-white/90">
      Many people struggle to donate or resell clothes without losing value
      or convenience.
    </p>
  </div>

  {/* SOLUTION */}
  <div className="group p-8 rounded-2xl bg-gray-50 
                  transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:shadow-xl hover:bg-primary/90">
    <FiHeart className="text-4xl text-primary mb-4 mx-auto transition-colors duration-300 group-hover:text-white" />
    <h4 className="text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-white">
      The Solution
    </h4>
    <p className="text-gray-600 transition-colors duration-300 group-hover:text-white/90">
      ReWear combines engaging fashion content with e-commerce to make
      reselling and discovery simple and intuitive.
    </p>
  </div>

  {/* IMPACT */}
  <div className="group p-8 rounded-2xl bg-gray-50 
                  transition-all duration-300 ease-out
                  hover:-translate-y-2 hover:shadow-xl hover:bg-primary/90">
    <FiUsers className="text-4xl text-primary mb-4 mx-auto transition-colors duration-300 group-hover:text-white" />
    <h4 className="text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-white">
      The Impact
    </h4>
    <p className="text-gray-600 transition-colors duration-300 group-hover:text-white/90">
      Extending the lifecycle of clothing while encouraging more mindful
      and sustainable fashion choices.
    </p>
  </div>

</div>


    </section>
  );
};

export default About;
