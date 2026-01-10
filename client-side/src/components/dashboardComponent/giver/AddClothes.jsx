import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const AddClothes = () => {
  const { axios, navigate, fetchUser, fetchAllClothes } = useAppContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      category: "men",
      size: "M",
      condition: "New with tags",
      isFree: true,
      price: 0,
      currency: "BDT",
      customCurrency: "",
    },
  });

  const isFree = watch("isFree");
  const currency = watch("currency");

  const [files, setFiles] = useState([null, null, null]);

  useEffect(() => {
    if (isFree) {
      setValue("price", 0);
    }
  }, [isFree, setValue]);

  const onSubmit = async (data) => {
    if (!files.some((file) => file !== null)) {
      return toast.error("Please upload at least 1 image");
    }
    try {
      const clothesData = {
        ...data,
        price: Number(data.price),
      };
      const formData = new FormData();
      formData.append("clothesData", JSON.stringify(clothesData));

      files.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });

      const res = await axios.post("/add-clothes", formData);
      if (res.data.success) {
        await fetchUser();
        await fetchAllClothes();
        toast.success(res.data.message);
        reset();
        navigate("/dashboard/my-clothes");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add Clothes Donation
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* IMAGES */}
          <div className="md:col-span-2 ">
            <label className="font-medium text-gray-700 mb-2 block">
              Images
            </label>
            <div className="flex gap-4 flex-wrap justify-around items-center">
              {files.map((file, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="group cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    id={`image${index}`}
                    onChange={(e) => {
                      const updated = [...files];
                      updated[index] = e.target.files[0];
                      setFiles(updated);
                    }}
                  />
                  <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-lg">
                    {!file && (
                      <div className="flex flex-col items-center text-gray-400 transition-all duration-300 group-hover:text-primary">
                        <FiUpload size={24} />
                        <span className="text-xs mt-1">Upload</span>
                      </div>
                    )}
                    {file && (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-1 block">
              Title
            </label>
            <input
              {...register("title", { required: true })}
              className={inputClass}
              placeholder="e.g. Denim Jacket"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Title is required</p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className={inputClass}
              placeholder="Describe the item..."
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                Description is required
              </p>
            )}
          </div>

          {/* CATEGORY */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-2 block">
              Category
            </label>
            <div className="flex flex-wrap gap-3">
              {["kids", "women", "men"].map((cat) => (
                <label key={cat} className="cursor-pointer">
                  <input
                    type="radio"
                    value={cat}
                    {...register("category", { required: true })}
                    className="hidden peer"
                  />
                  <div className="px-4 py-2 rounded-full border border-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary transition-all duration-300">
                    {cat}
                  </div>
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          {/* SIZE */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Size</label>
            <select
              {...register("size", { required: true })}
              className={inputClass}
            >
              {["S", "M", "L", "XL", "XXL", "XXXL", "4XL"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
            {errors.size && (
              <p className="text-red-500 text-sm mt-1">Size is required</p>
            )}
          </div>

          {/* CONDITION */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Condition
            </label>
            <select
              {...register("condition", { required: true })}
              className={inputClass}
            >
              {[
                "New with tags",
                "New without tags",
                "Gently used",
                "Used",
                "Well worn",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            {errors.condition && (
              <p className="text-red-500 text-sm mt-1">Condition is required</p>
            )}
          </div>

          {/* PRICING */}

          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-2 block">
              Pricing
            </label>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <input
                type="checkbox"
                {...register("isFree")}
                className="accent-primary scale-110"
              />
              This item is free
            </div>

            {!isFree && (
              <div className="flex flex-wrap gap-2">
                <input
                  type="number"
                  placeholder="Enter price"
                  className={inputClass + " flex-1"}
                  {...register("price", {
                    valueAsNumber: true,
                    validate: (value) =>
                      value > 0 || "Price is required when item is not free",
                  })}
                />

                <select
                  {...register("currency", { required: !isFree })}
                  className={inputClass + " w-28"}
                >
                  {["BDT", "PKR", "USD", "SAR", "OTHER"].map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {!isFree && currency === "OTHER" && (
              <div>
                <input
                  {...register("customCurrency", { required: true })}
                  className={inputClass + " mt-2 w-32"}
                  placeholder="Custom currency code"
                />

                {errors.customCurrency && (
                  <p className="text-red-500 text-sm mt-1">
                    Custom Currency is required
                  </p>
                )}
              </div>
            )}
            {!isFree && errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Location
            </label>
            <input
              {...register("location", { required: true })}
              className={inputClass}
              placeholder="City, area..."
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">Location is required</p>
            )}
          </div>

          {/* CONTACT NUMBER */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">
              Contact Number
            </label>
            <input
              type="number"
              {...register("contactNumber", { required: true })}
              className={inputClass}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                Contact Number is required
              </p>
            )}
          </div>
          {/* SUBMIT */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary px-8 py-2
      ${
        isSubmitting
          ? "opacity-80 cursor-not-allowed"
          : "hover:scale-[1.03] hover:shadow-lg active:scale-95"
      }
    `}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Posting...
                </span>
              ) : (
                "Post Item"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClothes;
