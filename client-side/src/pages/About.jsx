import React from "react";
import { FaRecycle, FaHandsHelping, FaTshirt, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <div className=" min-h-screen px-6 md:px-16 lg:px-24 py-10">
      {/* Hero Section */}
      <section className="bg-white my-10  text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          About
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg">
          ReWear is a modern platform to post, find, sell, or donate clothes.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16  max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Every year, millions of wearable clothes go unused while others
              struggle to find affordable options. ReWear bridges this gap by
              connecting people who want to share, sell, or donate clothes with
              those who need them.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <FaRecycle className="text-primary text-3xl mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800">Sustainability</h4>
              <p className="text-sm text-gray-600 mt-1">
                Reduce clothing waste
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <FaHandsHelping className="text-primary text-3xl mx-auto mb-3" />
              <h4 className="font-semibold text-gray-800">Community</h4>
              <p className="text-sm text-gray-600 mt-1">
                Help & support others
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10">
            How ReWear Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border bg-gray-50">
              <FaTshirt className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800">
                Post Clothes
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Upload clothes you no longer need and choose to donate or sell.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-gray-50">
              <FaUsers className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800">
                Discover Clothes
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Browse clothes shared by others based on your needs.
              </p>
            </div>

            <div className="p-6 rounded-xl border bg-gray-50">
              <FaHandsHelping className="text-primary text-4xl mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800">
                Connect Directly
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Contact the owner and complete the exchange easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default About;
