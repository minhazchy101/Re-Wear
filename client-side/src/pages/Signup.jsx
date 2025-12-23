import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Signup() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors , isSubmitting},
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const {axios,navigate, setUser } = useAppContext()
  const onSubmit = async (data) => {
    console.log("Signup Data:", data);
    try {
      const res = await axios.post('/signup', data)
      if (res.data.success) {
        reset()
      setUser(res.data.user)
       toast.success(res.data.message)
       navigate('/');scrollTo(0,0)
      }
      else{
     return toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
    // 🔗 connect signup API here
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 bg-light-bg py-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-sm p-8"
      >
        {/* Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-primary">
            Re<span className="text-gray-900">Wear</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Give more. Waste less.
          </p>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Join ReWear and start giving today
        </p>

        {/* Name */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="relative mt-2">
            <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Your full name"
              className={`w-full pl-10 pr-3 py-3 rounded-lg border outline-none
              ${errors.name
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-emerald-300"}
              focus:ring-2`}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-2">
            <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full pl-10 pr-3 py-3 rounded-lg border outline-none
              ${errors.email
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-emerald-300"}
              focus:ring-2`}
              {...register("email", {
                required: "Email is required",
              })}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">
            Contact Number
          </label>
          <div className="relative mt-2">
            <FiPhone className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone number"
              className={`w-full pl-10 pr-3 py-3 rounded-lg border outline-none
              ${errors.contact
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-emerald-300"}
              focus:ring-2`}
              {...register("contact", {
                required: "Contact number is required",
                minLength: {
                  value: 10,
                  message: "Invalid contact number",
                },
              })}
            />
          </div>
          {errors.contact && (
            <p className="text-sm text-red-500 mt-1">
              {errors.contact.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mt-5">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-2">
            <FiLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full pl-10 pr-10 py-3 rounded-lg border outline-none
              ${errors.password
                ? "border-red-400 focus:ring-red-300"
                : "border-gray-200 focus:ring-emerald-300"}
              focus:ring-2`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button 
          type="submit"
         value={isSubmitting}
          className={`mt-8 w-full py-3 rounded-lg bg-primary text-white font-medium
          hover:bg-emerald-700 transition1`}
        
        
        >
          Create Account
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary hover:underline font-medium"
          >
            Signin
          </Link>
        </p>
      </form>
    </main>
  );
}
