import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomerDetails from "./CustomerDetails";
// import ShippingAddressDetails from "./ShippingAddressDetails";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";

export default function CustomerProfile() {
  const dispatch = useDispatch();

  const { profile, loading, error } = useSelector((state) => state.users);
  const user = profile?.user;
  const orders = user?.orders || [];

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Profile</h1>

      {/* User Details */}
      <CustomerDetails
        email={user?.email}
        dateJoined={new Date(user?.createdAt).toDateString()}
        fullName={`${user?.firstname} ${user?.lastname}`}
      />

      {/* Shipping Address
      <ShippingAddressDetails shippingAddress={user?.ShippingAddress} /> */}

      {/* Orders */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">You have not placed any orders yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-t">
            {orders.map((order) => (
              <li key={order._id} className="py-6">
                <div className="flex justify-between flex-wrap mb-2">
                  {/* Left: Order ID */}
                  <div className="text-sm text-gray-600 mb-1">
                    Order ID:{" "}
                    <span className="font-medium text-gray-800">{order._id}</span>
                  </div>

                  {/* Right: Total + Status */}
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">
                      Total: <span className="text-gray-900">Rs. {order.totalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Status:{" "}
                      <span
                        className={`font-semibold capitalize ${
                          order.status === "delivered"
                            ? "text-green-600"
                            : order.status === "shipped"
                            ? "text-purple-600"
                            : order.status === "processing"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.orderItems.map((item) => (
                    <div
                      key={item._id}
                      className="border p-3 rounded-lg flex gap-3 items-center bg-white shadow-sm"
                    >
                      <img
                        src={item.product?.images?.[0] || "https://via.placeholder.com/100"}
                        alt={item.product?.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {item.product?.name}
                        </span>
                        <span className="text-sm">Qty: {item.qty}</span>
                        <span className="text-sm">Rs. {item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
