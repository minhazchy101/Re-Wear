import React from 'react'
import aboutImg from "../../assets/heroImg.png";
const Mission = () => {
  return (
    <div className="section flex flex-col md:flex-row-reverse justify-between items-center pb-16 py-30 md:py-0  md:bg-[radial-gradient(circle_at_bottom_right,#059669,transparent_45%)]">
      <div className="space-y-4 flex-1">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold md:font-bold">Our Mission</h1>
           <p className="text-lg md:text-xl text-gray-900 max-w-2xl mx-auto">
            Every year, millions of wearable clothes go unused while others struggle to find affordable options. ReWear bridges this gap by connecting people who want to share, sell, or donate clothes with those who need them.
          </p>
      </div>
      <div className="flex-1">
        <img src={aboutImg} alt="aboutImg"  className="w-full"/>
      </div>


      </div> 
  )
}

export default Mission
