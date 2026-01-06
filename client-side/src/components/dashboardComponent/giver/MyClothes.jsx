import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const MyClothes = () => {
  const { clothesPost, handleDelete, navigate } = useAppContext();

  return (
    <div className=" bg-gray-50 min-h-screen pt-10">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Clothes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-primary text-white uppercase text-sm font-medium tracking-wide">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Title</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Id</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Info</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {clothesPost?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-50 transition duration-300`}
              >
                {/* Image */}
                <td className="py-3 px-4">
                  <div
                    onClick={() => navigate(`/clothe-details/${item._id}`)}
                    className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-pointer"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Title (tablet+) */}
                <td className="py-3 px-4 font-medium hidden md:table-cell">{item.title}</td>

                {/* ID */}
                <td className="py-3 px-4 hidden md:table-cell">{item._id}</td>

                {/* Info (tablet+) */}
                <td className="py-3 px-4 hidden md:table-cell">
                  <div className="flex flex-col gap-1">
                    <span>Category: {item.category}</span>
                    <span>Size: {item.size}</span>
                    <span>Condition: {item.condition}</span>
                  </div>
                </td>

                {/* Price */}
                <td className="py-3 px-4">
                  {item.isFree ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span className="text-gray-800 font-semibold">
                      {item.price} {item.currency || ''}
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Purchased'
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center flex flex-col justify-center gap-2">
                  <button
                    onClick={() => {
                      navigate(`dashboard/edit-clothe/${item._id}`);
                      scrollTo(0, 0);
                    }}
                    className="flex items-center gap-1 bg-primary hover:bg-primary-dull text-white px-3 py-1 rounded-lg transition-all duration-300"
                  >
                    <FiEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-all duration-300"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty state */}
        {clothesPost?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No clothes found. Add your first item!
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClothes;
