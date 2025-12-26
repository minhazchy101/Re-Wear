import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { axios, user, setUser, navigate } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll effect (no height jump)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Clothes", path: "/allClothes" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const logout = async () => {
    try {
      const res = await axios.get("/logout");
      if (res.data.success) {
        setUser(null)
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300
      ${isScrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-transparent"}`}
    >
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          Re<span className="text-gray-900">Wear</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-md font-medium transition-colors
                 ${isScrolled ? "text-primary" : "text-primary/80"}
                 hover:text-primary
                 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full
                 after:bg-primary after:transition-transform after:duration-300
                 ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <FiSearch
            className={`text-xl cursor-pointer ${
              isScrolled ? "text-primary" : "text-primary-dull"
            }`}
          />

          {user ? (
            <button
  onClick={logout}
  className={`px-5 py-2 rounded-full text-md transition
    ${
      isScrolled
        ? "border border-primary text-primary hover:bg-primary/80 hover:text-white"
        : "bg-primary border border-primary text-white hover:bg-primary/80"
    }`}
>
  Logout
</button>

          ) : (
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `px-6 py-2 rounded-full text-sm font-medium transition
                ${isActive
                  ? "bg-primary/80 text-white"
                  : isScrolled
                  ? "border border-primary text-primary hover:bg-primary/80 hover:text-white"
                  : "bg-primary border border-primary text-white hover:bg-primary/80"}`
              }
            >
              Signin
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          <FiMenu className={isScrolled ? "text-primary" : "text-primary-dull"} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white flex flex-col items-center justify-center gap-6
        transition-transform duration-300 md:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-6 right-6 text-2xl"
          onClick={() => setIsMenuOpen(false)}
        >
          <FiX />
        </button>

        {navLinks.map(link => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `text-lg font-medium transition
              ${isActive ? "text-primary underline" : "text-gray-800"}`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {user ? (
          <button
            onClick={logout}
            className="mt-4 bg-primary text-white px-8 py-2.5 rounded-full"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/signin"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 bg-primary text-white px-8 py-2.5 rounded-full"
          >
            Signin
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
