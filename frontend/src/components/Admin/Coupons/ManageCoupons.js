import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCouponsAction, deleteCouponAction } from "../../../redux/slices/coupons/couponsSlices";
import { Link } from "react-router-dom";

export default function ManageCoupons() {
  const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector((state) => state.coupons);

  useEffect(() => {
    dispatch(fetchCouponsAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCouponAction(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Coupons</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Discount (%)</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons?.map((coupon) => (
              <tr key={coupon._id} className="text-center border-t">
                <td className="px-4 py-2 border">{coupon.code}</td>
                <td className="px-4 py-2 border">{coupon.startDate?.split("T")[0]}</td>
                <td className="px-4 py-2 border">{coupon.endDate?.split("T")[0]}</td>
                <td className="px-4 py-2 border">{coupon.discount}</td>
                <td className="px-4 py-2 border space-x-4">
                  <Link to={`/admin/manage-coupon/edit/${coupon._id}`} className="text-blue-600 hover:underline text-sm">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons?.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
