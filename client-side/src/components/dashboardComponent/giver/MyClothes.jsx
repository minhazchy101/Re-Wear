import React from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import PageHeader from "../reuse/PageHeader";

const MyClothes = () => {
  const { clothesPost, handleDelete, navigate } = useAppContext();

  return (
    <div className="min-h-screen bg-light-bg py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

  <PageHeader
        title="My Clothes"
        subtitle="Manage all your posted clothes and track their status"
        items={clothesPost}
        tag="Posted"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-medium tracking-wider select-none">
            <tr>
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left hidden md:table-cell">Title</th>
              <th className="py-4 px-6 text-left hidden md:table-cell">ID</th>
              <th className="py-4 px-6 text-left hidden md:table-cell">Info</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800 text-sm">
            {clothesPost?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:shadow-md hover:bg-gray-50`}
              >
                {/* Image */}
                <td className="py-4 px-6">
                  <div
                   onClick={() => navigate(`/clothe-details/${item._id}`)}
                    className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer transition-transform hover:scale-105"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Title */}
                <td className="py-4 px-6 font-semibold hidden md:table-cell">{item.title}</td>

                {/* ID */}
                <td className="py-4 px-6 hidden md:table-cell font-mono text-xs text-gray-400 truncate max-w-[150px]">
                  {item._id}
                </td>

                {/* Info */}
                <td className="py-4 px-6 hidden md:table-cell">
                  <div className="flex flex-col gap-1 text-gray-600 text-sm">
                    <span>Category: {item.category}</span>
                    <span>Size: {item.size}</span>
                    <span>Condition: {item.condition}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-6 font-semibold text-primary">
                  {item.isFree ? "Free" : `${item.price} ${item.currency || ""}`}
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Purchased"
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-700"
                    } select-none transition-colors duration-300`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-center flex flex-col justify-center gap-2 md:gap-3">

                  <button
                    onClick={() => {
                      navigate(`dashboard/edit-clothe/${item._id}`);
                      scrollTo(0, 0);
                    }}
                    className="btn-primary px-4 py-1.5  text-xs w-24 flex gap-1 items-center"
                    aria-label={`Edit ${item.title}`}
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn-error px-4 py-1.5  text-xs w-24 flex gap-1 items-center"
                    aria-label={`Delete ${item.title}`}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty state */}
            {clothesPost?.length === 0 && (
              <tr>
                <td colSpan={7} className="py-16 text-center text-gray-400 font-medium">
                  No clothes found. Add your first item!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
     </div>
  );
};

export default MyClothes;
