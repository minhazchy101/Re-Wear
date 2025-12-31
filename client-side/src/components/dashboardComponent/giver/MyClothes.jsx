import React from 'react';
import { useAppContext } from '../../../context/AppContext';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const MyClothes = () => {
  const { clothesPost, handleDelete, navigate } = useAppContext();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Clothes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-primary text-white uppercase text-sm font-medium tracking-wide">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Id</th>
              <th className="py-3 px-6 text-left">Info</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {clothesPost?.map((item, index) => (
              <tr
                key={item._id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-50  transition duration-300`}
              >
                <td className="py-3 px-6">
                  <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 px-6 font-medium">{item.title}</td>
                <td className="py-3 px-6">{item._id}</td>
                <td className="py-3 px-6 text-center flex flex-col justify-center items-start gap-1">
                  <span>Category: {item.category}</span>
                  <span>Size: {item.size}</span>
                  <span>Condition: {item.condition}</span>
                </td>
                <td className="py-3 px-6">
                  {item.isFree ? (
                    <span className="text-green-600 font-semibold">Free</span>
                  ) : (
                    <span className="text-gray-800 font-semibold">
                      {item.price} {item.currency || ''}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6">
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
                <td className="py-3 px-6 text-center flex flex-col justify-center gap-2">
                  <button
                    onClick={() => navigate(`dashboard/edit-clothe/${item._id}`)}
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
