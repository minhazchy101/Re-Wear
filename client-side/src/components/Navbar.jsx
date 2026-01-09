import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiLogOut,
  FiGrid,
} from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import Logo from "../reuseable/Logo";


const Navbar = () => {
  const { user, logout, navigate } = useAppContext();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const mobileRef = useRef(null);

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setIsMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Clothes", path: "/allClothes" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${isScrolled ? "bg-light-bg/20 backdrop-blur-md shadow-xl border-b border-light-bg" : "bg-transparent"}`}
    >
      <div className="h-16 section flex items-center justify-between">
        {/* Logo */}
       <Logo/>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              
              className={({ isActive }) =>
                `relative font-medium transition hover:scale-105
                ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"}
                after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary
                after:transition-all after:duration-300 ease-in-out
                ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {/* <FiSearch className="text-xl cursor-pointer hover:text-primary" /> */}

          {!user ? (
            <NavLink
              to="/signin"
              
              className="btn-primary py-1 px-6"
            >
              Sign In
            </NavLink>
          ) : (
            <div className="flex flex-row-reverse items-center gap-4">
               <button
                    onClick={logout}
                    className="btn-primary py-1 px-6"
                  >
                    Sign Out
                  </button>
            <div className="relative group">
              <FiUser
              onClick={()=>{navigate("/dashboard");scrollTo(0,0)}}
              className="text-2xl cursor-pointer text-primary transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-full" />
              <ul className="
                absolute right-2 top-3 mt-3 w-40 bg-white border rounded-lg shadow-lg
                opacity-0 scale-95 pointer-events-none
                group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
                transition-all
              ">
                <li>
                  <NavLink
                    to="/profile"
                    
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Dashboard
                  </NavLink>
                </li>
                
              </ul>
            </div>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-2xl text-primary"
        >
          {isMobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* ---------------- Mobile Dropdown ---------------- */}
      <div
        ref={mobileRef}
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-lg
        transition-all duration-300 origin-top
        ${isMobileOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
      >
        <div
        onClick={() => setIsMobileOpen(false)}
        className="flex flex-col items-center gap-5 py-6">
          {navLinks.map((link) => (
            <NavLink
             
              key={link.name}
              to={link.path}
           
              className="text-lg font-medium"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="w-4/5 h-px bg-gray-200" />

          {user ? (
            <> 
             <NavLink
                    to="/profile"
                    
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Dashboard
                  </NavLink>
              <button
                onClick={logout}
                className="px-8 py-2 btn-primary"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/signin"
             
              className="px-8 py-2 btn-primary"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
