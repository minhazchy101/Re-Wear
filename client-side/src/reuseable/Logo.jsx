import React from 'react'
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <>
       <NavLink to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-2xl font-bold text-primary hover:scale-110 transition-all duration-300 ease-in-out">
                Re<span className="text-gray-900">Wear</span>
              </NavLink>
    </>
  )
}

export default Logo
