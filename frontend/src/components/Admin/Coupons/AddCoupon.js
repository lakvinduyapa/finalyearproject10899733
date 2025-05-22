import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCouponAction, resetCouponSuccess } from "../../../redux/slices/coupons/couponsSlices";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

export default function AddCoupon() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    code: "",
    startDate: "",
    endDate: "",
    discount: ""
  });

  const { loading, error, isAdded } = useSelector((state) => state.coupons);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCouponAction(formData));
  };

  useEffect(() => {
    if (isAdded) {
      setFormData({ code: "", startDate: "", endDate: "", discount: "" });
      dispatch(resetCouponSuccess());
    }
  }, [isAdded, dispatch]);

  return (
    <div className="max-w-md mx-auto py-10 ">
      <h2 className="text-2xl font-bold text-center mb-4">Create Coupon</h2>
      {error && <ErrorMsg message={error.message} />}
      {isAdded && <SuccessMsg message="Coupon created successfully" />}
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
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded">
          {loading ? "Creating..." : "Create Coupon"}
        </button>
      </form>
    </div>
  );
}
