import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, axios, setUser, navigate } = useAppContext();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-md font-medium transition-all duration-300
     ${
       isActive
         ? "bg-primary text-white shadow-lg"
         : "text-gray-600 hover:bg-primary hover:text-white"
     }`;

  const logout = async () => {
    try {
      const res = await axios.get("/logout");
      if (res.data.success) {
        setUser(null);
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
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white border-r shadow-lg flex-col transition-all duration-300">
        <SidebarContent user={user} navLinkClass={navLinkClass} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar */}
          <aside className="relative w-64 h-full bg-white shadow-xl z-50 transform transition-transform duration-300">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h1 className="text-2xl font-bold text-primary">
                Re<span className="text-gray-900">Wear</span>
              </h1>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600 hover:text-primary transition-colors duration-300"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <SidebarContent
              user={user}
              navLinkClass={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-6 py-4 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-primary transition-colors duration-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBars size={22} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800">
              Welcome{" "}
              <span className="text-primary capitalize">{user?.role}</span>
            </h2>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary-dull text-light-bg hover:bg-primary hover:text-white shadow-md transition-all duration-300"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 flex-1 overflow-y-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

/* Sidebar Content Component */
const SidebarContent = ({ user, navLinkClass, onClick }) => {
  return (
    <nav className="px-4 py-6 space-y-6">
      <div className="flex justify-center mb-6">
        <NavLink
          to="/"
          className="text-3xl font-extrabold text-primary hover:text-primary-darker transition-colors duration-300"
        >
          Re<span className="text-gray-900">Wear</span>
        </NavLink>
      </div>

      {user?.role === "sharer" && (
        <div className="space-y-3">
          <NavLink to="/dashboard" className={navLinkClass} onClick={onClick}>
            <FaPlusCircle className="text-xl" />
            Add Clothes
          </NavLink>

          <NavLink
            to="/dashboard/workflow"
            className={navLinkClass}
            onClick={onClick}
          >
            <FaShoppingBag className="text-xl" />
            Clothes Workflow
          </NavLink>
        </div>
      )}

      {user?.role === "finder" && (
        <div className="space-y-3">
          <NavLink to="/dashboard" className={navLinkClass} onClick={onClick}>
            <FaShoppingBag className="text-xl" />
            Clothes Selected
          </NavLink>

          <NavLink
            to="/dashboard/purchasing"
            className={navLinkClass}
            onClick={onClick}
          >
            <FaBoxOpen className="text-xl" />
            Purchasing Clothes
          </NavLink>
        </div>
      )}
    </nav>
  );
};
