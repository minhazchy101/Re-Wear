import React from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Selected = () => {
  const { user,axios } = useAppContext();
  const items = user?.selectItems || [];

  const orderAdd = async(id,giverId)=>{
    try {
      const res = await axios.post('/add-order', {id, giverId})
      if(res.data.success){
        toast.success(res.data.message)
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-light p-4 md:p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        Selected Items
      </h1>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          No selected items found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-primary-dull text-primary">
              <tr className="text-left text-sm">
                <th className="p-3">Item</th>
                <th className="p-3">Giver</th>
                <th className="p-3">Details</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y">
              {items.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition"
                >
                  {/* Item */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                    <span className="font-medium text-gray-800">
                      {item.title}
                    </span>
                  </td>

                  {/* Giver */}
                  <td className="p-3 text-sm">
                    <p className="font-medium">{item.giverName}</p>
                    <p className="text-gray-500">{item.giverEmail}</p>
                  </td>

                  {/* Details */}
                  <td className="p-3 text-sm text-gray-600">
                    <p>Size: {item.size}</p>
                    <p>Condition: {item.condition}</p>
                    <p className="truncate max-w-[180px]">
                      {item.location}
                    </p>
                  </td>

                  {/* Price */}
                  <td className="p-3 font-semibold text-primary">
                    {item.isFree
                      ? "Free"
                      : `${item.currency} ${item.price}`}
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-primary-dull text-primary">
                      {item.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 text-center space-x-2">
                    <button
                    onClick={()=>orderAdd(item._id, item.giverId)}
                    className="px-3 py-1 text-sm rounded-md bg-primary text-white hover:opacity-90">
                      Order
                    </button>
                    <button className="px-3 py-1 text-sm rounded-md bg-red-100 text-red-600 hover:bg-red-200">
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Selected;
