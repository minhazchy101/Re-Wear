import React from 'react'
import CallToAction from '../components/CallToAction'

import Categories from '../components/Categories'
import Hero from '../components/Hero'
import RecentlyAdded from '../components/RecentlyAdded'
import HIW from '../components/HIW'
import Mission from '../components/Mission'


const Home = () => {
  return (
    <div >
      <Hero/>
      <Categories/>
      <RecentlyAdded/>
      <HIW/>
      <Mission/>
      <CallToAction/>
     
    </div>
  )
}

export default Home