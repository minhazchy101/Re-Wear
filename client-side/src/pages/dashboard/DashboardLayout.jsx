import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingBag,
  FaList,
} from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Logo from "../../reuseable/Logo";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, axios, setUser, navigate } = useAppContext();

 
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `
    relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
    transition-all duration-200
    ${
      isActive
        ? "bg-primary/10 text-primary before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-primary before:rounded-r"
        : "text-gray-600 hover:bg-gray-100"
    }
  `;

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
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* ===== Desktop Sidebar ===== */}
      <aside className="fixed md:static z-40 h-full hidden md:flex w-64 bg-white border-r shadow-sm flex-col">
        <SidebarContent
          user={user}
          navLinkClass={navLinkClass}
          logout={logout}
        />
      </aside>

      {/* ===== Mobile Overlay ===== */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ===== Mobile Sidebar ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-2xl
          transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <Logo/>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-600 hover:text-primary"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <SidebarContent
          user={user}
          navLinkClass={navLinkClass}
          logout={logout}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </aside>

      {/* ===== Main Area ===== */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white px-6 py-4 shadow-sm flex items-center gap-4">
          <button
            className="md:hidden text-gray-600 hover:text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars size={22} />
          </button>

          <h2 className="text-lg font-semibold text-gray-800">
            Dashboard
            <span className="ml-2 text-sm text-gray-500 capitalize">
              ({user?.role})
            </span>
          </h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

/* ================= Sidebar Content ================= */

const SidebarContent = ({
  user,
  navLinkClass,
  logout,
  onNavigate = () => {},
}) => {
  return (
    <nav className="px-4 py-6 flex flex-col h-screen">
      {/* Top Section */}
      <div>
        <div className="flex justify-center mb-8">
         <Logo/>
        </div>

        {user?.role === "sharer" && (
          <div className="space-y-2">
            <NavLink
             end
              to="/dashboard"
              className={navLinkClass}
              onClick={onNavigate}
            >
              <FaPlusCircle className="text-lg opacity-80" />
              Add Clothes
            </NavLink>

            <NavLink
              to="/dashboard/workflow"
              className={navLinkClass}
              onClick={onNavigate}
            >
              <FaShoppingBag className="text-lg opacity-80" />
              Clothes Workflow
            </NavLink>

            <NavLink
              to="/dashboard/my-clothes"
              className={navLinkClass}
              onClick={onNavigate}
            >
              <FaList className="text-lg opacity-80" />
              My Clothes
            </NavLink>
          </div>
        )}

        {user?.role === "finder" && (
          <div className="space-y-2">
            <NavLink
             end
              to="/dashboard"
              className={navLinkClass}
              onClick={onNavigate}
            >
              <FaShoppingBag className="text-lg opacity-80" />
               Selected Clothes
            </NavLink>

            <NavLink
              to="/dashboard/purchasing"
              className={navLinkClass}
              onClick={onNavigate}
            >
              <FaBoxOpen className="text-lg opacity-80" />
              Purchasing Clothes
            </NavLink>
          </div>
        )}
      </div>

      {/* Bottom Section (Logout) */}
      <div className="mt-auto pt-6 border-t">
        <button
          onClick={logout}
          className="
            w-full flex items-center gap-3 px-4 py-3 rounded-lg
            btn-error
          "
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
};
