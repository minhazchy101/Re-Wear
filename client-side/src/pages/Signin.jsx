import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function Signin() {
  const {axios, navigate,setUser} = useAppContext()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors ,  },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async(data) => {
    console.log("Signin Data:", data);
    // 🔗 connect API here
    try {
      const res = await axios.post('/signin', data)
      console.log(res.data)
      if(res.data.success){
        reset()
        setUser(res.data.user)
       toast.success(res.data.message)
       navigate('/');scrollTo(0,0)
      } else{
        toast.error(res.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 bg-light-bg py-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8"
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to continue
        </p>

        {/* Email */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
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
          className="mt-8 w-full py-3 rounded-lg bg-primary text-white font-medium
          hover:bg-emerald-700 transition"
        >
          Signin
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}

