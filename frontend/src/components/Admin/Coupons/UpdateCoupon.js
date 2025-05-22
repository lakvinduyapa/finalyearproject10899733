import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCouponAction,
  updateCouponAction,
  resetCouponSuccess,
} from "../../../redux/slices/coupons/couponsSlices";
import { useParams, useNavigate } from "react-router-dom";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function UpdateCoupon() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { coupon, loading, error, isUpdated } = useSelector((state) => state.coupons);

  const [formData, setFormData] = useState({
    code: "",
    startDate: "",
    endDate: "",
    discount: "",
  });

  useEffect(() => {
    if (id) dispatch(fetchCouponAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (coupon) {
      setFormData({
        code: coupon.code || "",
        startDate: coupon.startDate?.split("T")[0] || "",
        endDate: coupon.endDate?.split("T")[0] || "",
        discount: coupon.discount || "",
      });
    }
  }, [coupon]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCouponAction({ id, ...formData }));
  };

  useEffect(() => {
    if (isUpdated) {
      setTimeout(() => {
        dispatch(resetCouponSuccess());
        navigate("/admin/manage-coupon");
      }, 2000);
    }
  }, [isUpdated, dispatch, navigate]);

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Coupon</h2>
      {loading && <LoadingComponent />}
      {error && <ErrorMsg message={error.message} />}
      {isUpdated && <SuccessMsg message="Coupon updated successfully!" />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {["code", "startDate", "endDate", "discount"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field.includes("Date") ? "date" : field === "discount" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
          Update Coupon
        </button>
      </form>
    </div>
  );
}
