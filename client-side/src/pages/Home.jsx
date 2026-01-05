import React from 'react'
import CallToAction from '../components/CallToAction'

import Categories from '../components/Categories'
import Hero from '../components/Hero'
import RecentlyAdded from '../components/RecentlyAdded'
import HowWorks from '../components/HowWorks'

const Home = () => {
  return (
    <>
      <Hero/>
      <Categories/>
      <RecentlyAdded/>
      <HowWorks/>
      {/* <h1 className="title text-center">reWare</h1>
      <h1 className="sub-title text-center">reWare</h1>
      <h1 className="text text-center">reWare</h1> */}
    </>
  )
}

export default Home