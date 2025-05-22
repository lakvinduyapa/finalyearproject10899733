import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UpdateOrders from "./UpdateOrders";
import baseURL from "../../../utils/baseURL";

export default function SellerOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { userInfo } = useSelector((state) => state.users.userAuth);

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        };
        const { data } = await axios.get(
          `${baseURL}/orders/seller/orders`,
          config
        );
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load seller orders"
        );
        setLoading(false);
      }
    };

    if (userInfo?.token) {
      fetchSellerOrders();
    }
  }, [userInfo]);

  const filteredOrders = orders?.filter((order) =>
    order?.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Seller Orders
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            These are orders that include your products.
          </p>

          {/* Search Bar */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by Order Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
        </div>

        <section className="mt-10">
          <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : filteredOrders?.length === 0 ? (
              <p className="text-gray-500">No matching orders found.</p>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="border-t border-b border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  {/* Order Header */}
                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Order Number
                        </dt>
                        <dd className="mt-1 text-gray-500">
                          {order.orderNumber}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Date</dt>
                        <dd className="mt-1 text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total</dt>
                        <dd className="mt-1 font-medium text-gray-900">
                          Rs. {order.totalPrice}
                        </dd>
                      </div>
                    </dl>
                    <div>
                      <dt className="font-medium text-gray-900">
                        Payment Method
                      </dt>
                      <dd className="mt-1 font-medium text-gray-900">
                        {order.paymentMethod || "Not Specified"}
                      </dd>
                    </div>
                  </div>

                  {/* Order Items */}
                  <ul className="divide-y divide-gray-200">
                    {order.orderItems.map((item, index) => (
                      <li key={index} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-200 sm:h-40 sm:w-40">
                            <img
                              src={item.product?.image || "/placeholder.png"}
                              alt={item.product?.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-6 flex-1 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>{item.product?.name}</h5>
                              <p className="mt-2 sm:mt-0">
                                Rs. {item.price}
                              </p>
                            </div>
                            <p className="hidden text-gray-500 sm:mt-2 sm:block">
                              Qty: {item.qty}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Status & Actions */}
                  <div className="p-4 sm:flex sm:justify-between sm:items-center">
                    <div className="flex items-center text-sm text-gray-500">
                      <p className="mr-4">Status: {order.status}</p>
                      <p>Payment: {order.paymentStatus}</p>
                    </div>
                    <UpdateOrders id={order._id} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
