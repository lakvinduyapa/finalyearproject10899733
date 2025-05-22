import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderStatsAction } from "../../../redux/slices/orders/orderSlice";

export default function OrdersStats() {
  const dispatch = useDispatch();

  const { stats, statsLoading, statsError } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderStatsAction());
  }, [dispatch]);

  const orderStats = stats?.orderstats?.[0] || {};
  const todaySales = stats?.saleToday?.[0]?.totalSales || 0;

  return (
    <div className="mt-5">
      {statsLoading ? (
        <p>Loading statistics...</p>
      ) : statsError ? (
        <p className="text-red-500">{statsError}</p>
      ) : (
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Sales */}
          <div className="relative overflow-hidden rounded-lg bg-green-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-white p-3">
                💰
              </div>
              <p className="ml-16 truncate text-sm font-medium text-white">Total Sales</p>
            </dt>
            <dd className="ml-16 text-2xl font-semibold text-white">
              Rs. {orderStats?.totalSales?.toFixed(2) || 0}
            </dd>
          </div>

          {/* Average Sale */}
          <div className="relative overflow-hidden rounded-lg bg-blue-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-white p-3">
                📊
              </div>
              <p className="ml-16 truncate text-sm font-medium text-white">Average Sale</p>
            </dt>
            <dd className="ml-16 text-2xl font-semibold text-white">
              Rs. {orderStats?.averageSale?.toFixed(2) || 0}
            </dd>
          </div>

          {/* Minimum Sale */}
          <div className="relative overflow-hidden rounded-lg bg-pink-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-white p-3">
                🧾
              </div>
              <p className="ml-16 truncate text-sm font-medium text-white">Min Sale</p>
            </dt>
            <dd className="ml-16 text-2xl font-semibold text-white">
              Rs. {orderStats?.minimumSale?.toFixed(2) || 0}
            </dd>
          </div>

          {/* Today's Sales */}
          <div className="relative overflow-hidden rounded-lg bg-yellow-600 px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="absolute rounded-md bg-white p-3">
                📅
              </div>
              <p className="ml-16 truncate text-sm font-medium text-white">Sales Today</p>
            </dt>
            <dd className="ml-16 text-2xl font-semibold text-white">
              Rs. {todaySales?.toFixed(2)}
            </dd>
          </div>
        </dl>
      )}
    </div>
  );
}
