import { Menu } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrdersAction } from "../../../redux/slices/orders/orderSlice";
import UpdateOrders from "./UpdateOrders";

export default function ManageOrders() {
  const dispatch = useDispatch();
  const { loading, error, allOrders } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  const filteredOrders = allOrders?.filter((order) =>
    order?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Manage Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Search by Order ID, check status, and update orders below.
          </p>

          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
        </div>

        <section className="mt-10">
          <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-gray-600">No orders found for your search.</p>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order?.orderNumber}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time>{new Date(order.createdAt).toLocaleDateString()}</time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-900">
                          Rs. {order.totalPrice}
                        </dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <Menu.Button className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <EllipsisVerticalIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                    </Menu>

                    <div>
                      <dt className="font-medium text-gray-900">Payment Method</dt>
                      <dd className="mt-1 font-medium text-gray-900">
                        {order?.paymentMethod || "Not Specified"}
                      </dd>
                    </div>
                  </div>

                  <ul role="list" className="divide-y divide-gray-200">
                    {order?.orderItems?.map((product, index) => {
                      console.log("🧩 Order Product Item:", product);
                      const imageSrc =
                        product?.image || // direct image
                        product?.product?.images?.[0] || // populated ref
                        product?.images?.[0] || // fallback
                        "https://via.placeholder.com/150";

                      return (
                        <li key={index} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                              <img
                                src={imageSrc}
                                alt={product?.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{product?.name}</h5>
                                <p className="mt-2 sm:mt-0">Rs. {product?.price}</p>
                              </div>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                Qty: {product?.qty}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 sm:flex sm:justify-between sm:items-center">
                            <div className="flex items-center">
                              <CheckCircleIcon
                                className="h-5 w-5 text-yellow-500"
                                aria-hidden="true"
                              />
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                Status: {order.status}
                              </p>
                            </div>

                            <div className="flex items-center mt-2 sm:mt-0">
                              <svg
                                className="h-5 w-5 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                Payment Status: {order.paymentStatus}
                              </p>
                            </div>

                            <UpdateOrders id={order._id} />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
