import React from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../reuseable/LoadingSpinner";
import Swal from "sweetalert2";
import PageHeader from "../reuse/PageHeader";

const Selected = () => {
  const {
    axios,
    navigate,
    removeSelectItem,
    selectItems,
    loading,
  } = useAppContext();

  const items = selectItems;

  const orderAdd = async (id, giverId) => {
    try {
      const toastId = toast.loading("Placing order...");
      const res = await axios.post("/add-order", { id, giverId });

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/purchasing");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRemove = (id) => {
    Swal.fire({
      title: "Remove this item?",
      text: "This item will be removed from your selected list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeSelectItem(id);
      }
    });
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" size="w-12 h-12" />;
  }

  return (
    <div className="min-h-screen py-6 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">


     
      {/* Page Header */}
      <PageHeader title={"Selected Items"} subtitle={"Review and manage your selected clothes before ordering"} items={items} tag={"selected"}/>


        {items.length === 0 ? (
                <div>
                  <h1
                    className="py-24 text-center text-gray-500"
                  >
                    No selected items found.
                  </h1>
                </div>
              ) : 
         ( <div className="bg-white rounded-2xl shadow-sm border border-gray-100 
                overflow-hidden max-w-5xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left hidden md:table-cell">
                  Giver
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left hidden sm:table-cell">
                  Status
                </th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100">

              {items.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="hover:bg-gray-50 transition-colors">
                    {/* Item */}
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        <img
                          src={item.images?.[0]}
                          alt={item.title}
                          className="w-16 h-16 rounded-lg object-cover border cursor-pointer"
                          onClick={() =>
                            navigate(`/clothe-details/${item._id}`)
                          }
                        />

                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {item.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            Size {item.size}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">
                            {item.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Giver */}
                    <td className="px-6 py-4 hidden md:table-cell text-sm">
                      <p className="font-medium text-gray-800">
                        {item.giverName}
                      </p>
                      <p className="text-gray-500">
                        {item.giverEmail}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {item.contactNumber}
                      </p>
                    </td>

                    {/* Price */}
                    <td className="px-2 sm:px-4 md:px-6  py-4 font-semibold text-primary">
                      {item.isFree
                        ? "Free"
                        : `${item.currency} ${item.price}`}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-dull text-white">
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 flex flex-col gap-3">
                      <button
                        onClick={() =>
                          orderAdd(item._id, item.giverId)
                        }
                        className="btn-primary px-4 py-1.5  text-sm w-20"
                      >
                        Order
                      </button>

                      <button
                        onClick={() => handleRemove(item._id)}
                        className="btn-error text-sm w-20 px-4 py-1.5"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>

                  {/* Mobile Extra Info */}
                  <tr className="md:hidden bg-gray-50">
                    <td colSpan="5" className="px-6 pb-4 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Giver:</span>{" "}
                        {item.giverName}
                      </p>
                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {item.giverEmail}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {item.contactNumber}
                      </p>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>)
       }
    </div>
     </div>
  );
};

export default Selected;
