import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CustomerDetails from "./CustomerDetails";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";

export default function CustomerProfile() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSize = isTamil ? "text-base" : "text-lg";

  const { profile, loading, error } = useSelector((state) => state.users);
  const user = profile?.user;
  const orders = user?.orders || [];

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  if (loading) return <div className="p-10 text-center">{t("loading_profile")}</div>;
  if (error) return <div className="p-10 text-center text-red-500">{t("error")}: {error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">{t("customer_profile")}</h1>

      <CustomerDetails
        email={user?.email}
        dateJoined={new Date(user?.createdAt).toDateString()}
        fullName={`${user?.firstname} ${user?.lastname}`}
      />

      <div className="mt-10">
        <h2 className={`font-semibold mb-4 ${fontSize}`}>{t("your_orders")}</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">{t("no_orders_yet")}</p>
        ) : (
          <ul className="divide-y divide-gray-200 border-t">
            {orders.map((order) => (
              <li key={order._id} className="py-6">
                <div className="flex justify-between flex-wrap mb-2">
                  <div className="text-sm text-gray-600 mb-1">
                    {t("order_id")}:{" "}
                    <span className="font-medium text-gray-800">{order._id}</span>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">
                      {t("total")}: <span className="text-gray-900">Rs. {order.totalPrice}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {t("status")}:{" "}
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
                        {t(order.status)}
                      </span>
                    </div>
                  </div>
                </div>

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
                        <span className="text-sm">{t("qty")}: {item.qty}</span>
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
