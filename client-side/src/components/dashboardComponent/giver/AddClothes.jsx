import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";

const AddClothes = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "Men",
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

  const onSubmit = (data) => {
    data.images = files.filter(Boolean);
    console.log("FORM DATA:", data);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all bg-white";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Add Clothes Donation
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* IMAGES */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-2 block">Images</label>
            <div className="flex gap-4 flex-wrap">
              {files.map((file, index) => (
                <label key={index} htmlFor={`image${index}`} className="group cursor-pointer">
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
            <label className="font-medium text-gray-700 mb-1 block">Title</label>
            <input
              {...register("title", { required: true })}
              className={inputClass}
              placeholder="e.g. Denim Jacket"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-1 block">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows={4}
              className={inputClass}
              placeholder="Describe the item..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
          </div>

          {/* CATEGORY */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-2 block">Category</label>
            <div className="flex flex-wrap gap-3">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="cursor-pointer">
                  <input type="radio" value={cat} {...register("category")} className="hidden peer" />
                  <div className="px-4 py-2 rounded-full border border-gray-300 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary transition-all duration-300">
                    {cat}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Size</label>
            <select {...register("size")} className={inputClass}>
              {["S", "M", "L", "XL", "XXL", "XXXL", "4XL"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </div>

          {/* CONDITION */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Condition</label>
            <select {...register("condition")} className={inputClass}>
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
          </div>

          {/* PRICING */}
          <div className="md:col-span-2">
            <label className="font-medium text-gray-700 mb-2 block">Pricing</label>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <input type="checkbox" {...register("isFree")} className="accent-primary scale-110" />
              This item is free
            </div>

            {!isFree && (
              <div className="flex flex-wrap gap-2">
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className={inputClass + " flex-1"}
                  placeholder="Enter price"
                />
                <select {...register("currency")} className={inputClass + " w-28"}>
                  {["BDT", "PKR", "USD", "SAR", "OTHER"].map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {!isFree && currency === "OTHER" && (
              <input
                {...register("customCurrency")}
                className={inputClass + " mt-2 w-32"}
                placeholder="Custom currency code"
              />
            )}
          </div>

          {/* LOCATION */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Location</label>
            <input {...register("location")} className={inputClass} placeholder="City, area..." />
          </div>

          {/* CONTACT NUMBER */}
          <div>
            <label className="font-medium text-gray-700 mb-1 block">Contact Number</label>
            <input type="number" {...register("contactNumber")} className={inputClass} />
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-xl hover:scale-[1.03] hover:shadow-lg active:scale-95 transition-all duration-300"
            >
              Post Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClothes;
