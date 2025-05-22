import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { fetchOrdersAction } from "../../../redux/slices/orders/orderSlice";

export default function OrdersList() {
  const dispatch = useDispatch();
  const { allOrders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  // Get 5 most recent orders sorted by createdAt
  const recentOrders = [...allOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Order statistics */}
      <OrdersStats />

      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-6">
        Recent Orders
      </h3>

      <div className="-mx-4 mt-3 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <p className="p-4 text-gray-700">Loading...</p>
        ) : error ? (
          <p className="p-4 text-red-600">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Order ID
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  Payment Method
                </th>
                <th className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                  Order Date
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Delivery Date
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {order.orderNumber}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {order.paymentMethod || "Not Specified"}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {order.deliveredAt
                      ? new Date(order.deliveredAt).toLocaleDateString()
                      : "Not Delivered"}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">{order.status}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">Rs. {order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
