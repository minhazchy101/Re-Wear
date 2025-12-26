import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const Workflow = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    axios.get("/my-orders-request").then((res) => {
      setOrders(res.data.orders);
    });
  }, [axios]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">My Workflow</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3 px-4 text-left">Item Image</th>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Finder Info</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Request Date</th>
                <th className="py-3 px-4 text-left">Contact & Location</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-100 transition-colors duration-200"
                >
                  {/* Item Image */}
                  <td className="py-3 px-4 flex items-center space-x-3">
                    <img
                      src={order.clotheId.images[0]}
                      alt={order.clotheId.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                    <span className="font-medium text-gray-800">{order.clotheId.title}</span>
                  </td>

                  {/* Order ID */}
                  <td className="py-3 px-4 text-gray-600">{order._id}</td>

                  {/* Finder Info */}
                  <td className="py-3 px-4 hidden md:table-cell space-y-1">
                    <p className="font-medium">{order.takerId.name}</p>
                    <p className="flex items-center text-gray-600 text-sm">
                      <FiMail className="w-4 h-4 mr-1" /> {order.takerId.email}
                    </p>
                  </td>

                  {/* Request Date */}
                  <td className="py-3 px-4 hidden md:table-cell text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Contact & Location */}
                  <td className="py-3 px-4 space-y-1 text-gray-600 text-sm">
                    <p className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-1" /> {order.takerId.contact}
                    </p>
                    <p className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-1" /> {order.clotheId.location}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 space-x-2">
                    {order.status === "Pending" && (
                      <>
                        <button className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dull transition">
                          Confirm
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                          Decline
                        </button>
                      </>
                    )}
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

export default Workflow;
