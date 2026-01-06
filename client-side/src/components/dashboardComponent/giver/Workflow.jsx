import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaCheck, FaTimes } from "react-icons/fa";

const Workflow = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    axios.get("/my-orders-request").then((res) => {
      setOrders(res.data.orders);
    });
  }, [axios]);

const declineOrder = async (id) => {
  if (!window.confirm("Decline this request? This action cannot be undone.")) return;

  try {
    await axios.get(`/decline-order/${id}`);
    setOrders((prev) => prev.filter((o) => o._id !== id));
  } catch (error) {
    console.log(error.message);
  }
};
const deleteHistory = async (id) => {
  if (!confirm("Remove this from your history?")) return;
  await axios.delete(`/delete-order-history/${id}`);
  setOrders((prev) => prev.filter(o => o._id !== id));
};


  const confirmOrder = async (id) => {
    try {
      const res = await axios.put(`/confirm-order/${id}`, { status: "Confirmed" });
      console.log(res.data);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "Confirmed" } : o))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // Helper function for status badge
  const renderStatus = (status) => {
    const statusClasses = {
      Pending: "bg-yellow-100 text-yellow-800",
      Confirmed: "bg-green-100 text-green-800",
      Declined: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="pt-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary">My Workflow</h1>

      {orders?.length === 0 ? (
        <p className="text-gray-500 text-center">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Order ID</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Product Info</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Finder Info</th>
                <th className="py-3 px-4 text-left hidden lg:table-cell">Request Date</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {orders?.map((order) => (
                <tr
                  key={order?._id}
                  className="border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* Product */}
                  <td className="py-3 px-4 flex flex-col items-center space-y-3">
                    <img
                      src={order?.clotheId?.images[0]}
                      alt={order?.clotheId?.title}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                     <span className="text-xs font-medium text-gray-500 text-center hidden md:block">{order?.clotheId?.title}</span>
                    
                  </td>

                  {/* Order ID */}
                  <td className="py-3 px-4 hidden sm:table-cell text-gray-600">{order?._id}</td>

                  {/* Product Info */}
                  <td className="py-3 px-4 hidden md:table-cell space-y-1">
                    <p className="text-gray-600">Size: {order?.clotheId?.size}</p>
                    <p className="text-gray-600">
                      Price: {order?.clotheId?.isFree ? "FREE" : `${order?.clotheId?.price} ${order?.clotheId?.currency}`}
                    </p>
                  </td>

                  {/* Finder Info */}
                  <td className="py-3 px-4 hidden md:table-cell space-y-1">
                    <p className="font-medium">{order?.takerId?.name}</p>
                    <p className="flex items-center text-gray-600 text-sm">
                      <FiMail className="w-4 h-4 mr-1" /> {order?.takerId?.email}
                    </p>
                  </td>

                  {/* Request Date */}
                  <td className="py-3 px-4 hidden lg:table-cell text-gray-600">
                    {new Date(order?.createdAt).toLocaleDateString()}
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-4 space-y-1 text-gray-600 text-sm">
                    <p className="flex items-center">
                      <FiPhone className="w-4 h-4 mr-1" /> {order?.takerId?.contact}
                    </p>
                    <p className="flex items-center">
                      <FiMapPin className="w-4 h-4 mr-1" /> {order?.clotheId?.location}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">{renderStatus(order?.status)}</td>

                {/* Actions */}
<td className="py-3 px-4 flex space-x-2">
  {order?.status === "Pending" ? (
    <>
      <button
        onClick={() => confirmOrder(order?._id)}
        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition disabled:opacity-50"
      >
        <FaCheck /> Confirm
      </button>
      <button
        onClick={() => declineOrder(order?._id)}
        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
      >
        <FaTimes /> Decline
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => deleteHistory(order?._id)}
        className="flex items-center gap-1 text-xs  bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
      >
        Delete History
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
