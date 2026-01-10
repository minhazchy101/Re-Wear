import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import PageHeader from "../reuse/PageHeader";

const PurchasedClothes = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();

  useEffect(() => {
    axios.get("/my-orders").then((res) => {
      setOrders(res.data.orders || []);
    });
  }, [axios]);

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-primary-dull text-primary",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-light-bg py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Header */}

         <PageHeader title={"My Orders"} subtitle={"Track your requested clothes"} items={orders} tag={"orders"}/>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Head */}
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Item</th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">
                    Order ID
                  </th>
                 
                  <th className="px-6 py-4 text-left hidden lg:table-cell">
                    Giver
                  </th>
                  <th className="px-6 py-4 text-left">
                    Contact & Location
                  </th>
                  <th className="px-6 py-4 text-left">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">
                    Requested
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-24 text-center text-gray-500"
                    >
                      You haven't requested any clothes yet.
                    </td>
                  </tr>
                )}

                {orders.map((order) => {
                  const clothe = order?.clotheId;

                  return (
                    <React.Fragment key={order?._id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        {/* Item */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={clothe?.images?.[0]}
                              alt={clothe?.title}
                              className="w-16 h-16 rounded-lg object-cover border"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate">
                                {clothe?.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                Size {clothe?.size} ·{" "}
                                {clothe?.isFree
                                  ? "Free"
                                  : `${clothe?.price} ${clothe?.currency}`}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Order ID */}
                        <td className="px-6 py-4 hidden md:table-cell font-mono text-sm text-gray-500">
                          {order?._id}
                        </td>

                        {/* Giver */}
                        <td className="px-6 py-4 hidden lg:table-cell text-sm">
                          <p className="font-medium text-gray-800">
                            {clothe?.giverName}
                          </p>
                          <p className="flex items-center text-gray-500">
                            <FiMail className="mr-1" />
                            {clothe?.giverEmail}
                          </p>
                          <p className="flex items-center text-gray-500">
                           <FiPhone className="mr-1" />
                            {clothe?.contactNumber}
                          </p>
                        </td>

                        {/* Contact & Location */}
                        <td className="px-6 py-4 text-sm text-gray-600 space-y-1">

                          <p className="flex items-center">
                            <FiMapPin className="mr-1" />
                            {clothe?.location}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              statusStyles[order?.status] ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {order?.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>

                      {/* Mobile Extra Info */}
                      <tr className="md:hidden bg-gray-50">
                        <td
                          colSpan="7"
                          className="px-6 pb-4 text-sm text-gray-600 space-y-1"
                        >
                          <p>
                            <span className="font-medium">Order ID:</span>{" "}
                            {order?._id}
                          </p>
                          <p>
                            <span className="font-medium">Giver:</span>{" "}
                            {clothe?.giverName}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {clothe?.giverEmail}
                          </p>
                          <p>
                            <span className="font-medium">Contact Number:</span>{" "}
                            {clothe?.contactNumber}
                          </p>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasedClothes;
