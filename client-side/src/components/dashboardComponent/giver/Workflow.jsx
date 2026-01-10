import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import Swal from "sweetalert2";
import LoadingSpinner from "../../../reuseable/LoadingSpinner";
import PageHeader from "../reuse/PageHeader";

const Workflow = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, navigate } = useAppContext();

  useEffect(() => {
    axios.get("/my-orders-request").then((res) => {
      setOrders(res.data.orders || []);
      setLoading(false);
    });
  }, [axios]);

 
  const confirmOrder = async (id) => {
    try {
      await axios.put(`/confirm-order/${id}`, { status: "Confirmed" });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "Confirmed" } : o
        )
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const declineOrder = async (id) => {
    const result = await Swal.fire({
      title: "Decline request?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Decline",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.get(`/decline-order/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteHistory = async (id) => {
    const result = await Swal.fire({
      title: "Delete history?",
      text: "This will permanently remove this record.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    await axios.delete(`/delete-order-history/${id}`);
    setOrders((prev) => prev.filter((o) => o._id !== id));
  };

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Confirmed: "bg-green-100 text-green-800",
    Declined: "bg-red-100 text-red-800",
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" size="w-12 h-12" />;
  }

  return (
    <div className="min-h-screen bg-light-bg py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Page Header */}
        <PageHeader
          title="My Workflow"
          subtitle="Manage incoming requests for your clothes"
          items={orders}
          tag="Requests"
        />

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Head */}
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Item</th>
                  <th className="px-6 py-4 text-left hidden sm:table-cell">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left hidden md:table-cell">
                    Finder
                  </th>
                  <th className="px-6 py-4 text-left hidden lg:table-cell">
                    Requested
                  </th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="py-24 text-center text-gray-500"
                    >
                      No requests yet.
                    </td>
                  </tr>
                )}

                {orders.map((order) => {
                  const clothe = order?.clotheId;
                  const taker = order?.takerId;

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
                              onClick={() =>
                              navigate(`/clothe-details/${order?._id}`)
                          }
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
                        <td className="px-6 py-4 hidden sm:table-cell font-mono text-sm text-gray-500">
                          {order?._id}
                        </td>

                        {/* Finder */}
                        <td className="px-6 py-4 hidden md:table-cell text-sm">
                          <p className="font-medium text-gray-800">
                            {taker?.name}
                          </p>
                          <p className="flex items-center text-gray-500">
                            <FiMail className="mr-1" />
                            {taker?.email}
                          </p>
                          <p className="flex items-center text-gray-500">
                            <FiPhone className="mr-1" />
                            {taker?.contact}
                          </p>
                          <p className="flex items-center text-gray-500">
                            <FiMapPin className="mr-1" />
                            {clothe?.location}
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 hidden lg:table-cell text-sm text-gray-500">
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </td>


                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles[order?.status]
                              }`}
                          >
                            {order?.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-3">
                          {order?.status === "Pending" ? (
                            <>
                              <button
                                onClick={() =>
                                  confirmOrder(order?._id)
                                }
                               className="btn-primary px-4 py-1.5  text-sm w-20"
                              >
                               Confirm
                              </button>
                              <button
                                onClick={() =>
                                  declineOrder(order?._id)
                                }
                                className="btn-error px-4 py-1.5 text-sm w-20"
                              >
                             Decline
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() =>
                                deleteHistory(order?._id)
                              }
                              className="btn-error px-4 py-1.5 text-xs w-20"
                            >
                              Delete History
                            </button>
                          )}
                          </div>
                        </td>
                      </tr>

                      {/* Mobile Extra Info */}
                      <tr className="md:hidden bg-gray-50">
                        <td
                          colSpan="8"
                          className="px-6 pb-4 text-sm text-gray-600 space-y-1"
                        >
                          <p>
                            <span className="font-medium">Finder:</span>{" "}
                            {taker?.name}
                          </p>
                          <p>
                            <span className="font-medium">Email:</span>{" "}
                            {taker?.email}
                          </p>
                          <p>
                            <span className="font-medium">Order ID:</span>{" "}
                            {order?._id}
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

export default Workflow;
