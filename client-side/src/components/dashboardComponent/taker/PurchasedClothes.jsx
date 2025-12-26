import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const PurchasedClothes = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    axios.get("/my-orders").then((res) => {
      setOrders(res.data.orders);
    });
  }, [axios]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Orders</h2>

      {orders.length === 0 && (
        <p className="text-gray-500">You haven't requested any clothes yet.</p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Product Info</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">Giver Info</th>
              <th className="px-4 py-3 text-left">Contact & Location</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">
            {orders.map((order) => {
              const clothe = order.clotheId;
              return (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Product */}
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={clothe.images[0]}
                      alt={clothe.title}
                      className="w-14 h-14 object-cover rounded-lg shadow-sm"
                    />
                    <span className="font-medium text-gray-800">{clothe.title}</span>
                  </td>

                  {/* Order ID */}
                  <td className="px-4 py-3 font-mono text-sm text-gray-600">{order._id}</td>

                  {/* Product Info */}
                  <td className="px-4 py-3 hidden md:table-cell space-y-1">
                    <p className="text-gray-600">Size: {clothe.size}</p>
                    <p className="text-gray-600">Condition: {clothe.condition}</p>
                    <p className="text-gray-600">
                      Price: {clothe.isFree ? "FREE" : `${clothe.price} ${clothe.currency}`}
                    </p>
                  </td>

                  {/* Giver Info */}
                  <td className="px-4 py-3 hidden md:table-cell space-y-1">
                    <p className="font-medium text-gray-800">{clothe.giverName}</p>
                    <p className="flex items-center text-gray-600 text-sm">
                      <FiMail className="w-4 h-4 mr-1" /> {clothe.giverEmail}
                    </p>
                  </td>

                  {/* Contact */}
                  <td className="px-4 py-3 space-y-1 text-gray-600 text-sm">
                    <p className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-1" /> {clothe.contactNumber}
                    </p>
                    <p className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-1" /> {clothe.location}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Accepted"
                          ? "bg-primary text-white"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3">
                    <button
                      className="flex items-center bg-primary text-white px-3 py-1 rounded hover:bg-primary-dull transition-colors duration-300"
                      onClick={() => window.open(`tel:${clothe.contactNumber}`)}
                    >
                      <FiPhone className="w-4 h-4 mr-1" /> Contact
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasedClothes;
