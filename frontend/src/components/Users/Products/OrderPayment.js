import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddShippingAddress from "../Forms/AddShippingAddress";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { useTranslation } from "react-i18next";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";

export default function OrderPayment() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.users.userAuth.userInfo);
  const profile = useSelector((state) => state.users.profile);
  const shippingAddress = profile?.user?.ShippingAddress;

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState(null);

  useEffect(() => {
    if (!profile?.user?.ShippingAddress) {
      dispatch(getUserProfileAction());
    }
  }, [dispatch, profile?.user?.ShippingAddress]);

  const calculateSubtotal = () =>
    cartItems.reduce((acc, item) => acc + item.qty * item.discountedPrice, 0);

  const calculateDiscountedTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = appliedCoupon?.discount || 0;
    return Math.round(subtotal * ((100 - discount) / 100));
  };

  const applyCouponHandler = async () => {
    setCouponError(null);
    try {
      const { data } = await axios.get(`${baseURL}/coupons/validate/code?code=${couponCode}`);
      setAppliedCoupon(data.coupon);
    } catch (error) {
      setCouponError(error?.response?.data?.message || t("invalid_coupon"));
      setAppliedCoupon(null);
    }
  };

  const createOrderSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(
        `${baseURL}/orders`,
        {
          orderItems: cartItems,
          shippingAddress,
          totalPrice: calculateDiscountedTotal(),
          appliedCoupon: appliedCoupon?.code || null,
        },
        config
      );

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Order creation or Stripe checkout failed:", error);
    }
  };

  return (
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            {/* Shipping Section */}
            <div>
              <div className="mt-10 border-t border-gray-200 pt-10">
                <AddShippingAddress userInfo={userInfo} />
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className={`text-lg font-medium text-gray-900 ${fontSizeClass}`}>{t("order_summary")}</h2>
              <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                <ul role="list" className="divide-y divide-gray-200">
                  {cartItems.map((product) => (
                    <li key={product._id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <p className={`text-xl text-gray-700 font-semibold ${fontSizeClass}`}>
                              {product.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between pt-2">
                          <p className={`text-base font-medium text-gray-900 text-right w-full ${fontSizeClass}`}>
                            Rs. {product.discountedPrice} x {product.qty}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Coupon Code */}
                <div className="px-4 sm:px-6 py-6 border-t border-gray-200">
                  <label htmlFor="coupon" className={`block text-sm font-medium text-gray-700 mb-2 ${fontSizeClass}`}>
                    {t("have_coupon")}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={t("enter_coupon")}
                      className="flex-1 border px-3 py-2 rounded-md text-sm"
                    />
                    <button
                      onClick={applyCouponHandler}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    >
                      {t("apply")}
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="mt-2 text-green-600 text-sm">
                      {t("coupon_applied", { code: appliedCoupon.code, discount: appliedCoupon.discount })}
                    </p>
                  )}
                  {couponError && (
                    <p className="mt-2 text-red-600 text-sm">{couponError}</p>
                  )}
                </div>

                {/* Summary */}
                <dl className="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className={`text-sm ${fontSizeClass}`}>{t("taxes")}</dt>
                    <dd className={`text-sm font-medium text-gray-900 ${fontSizeClass}`}>Rs. 0.00</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className={`text-sm ${fontSizeClass}`}>{t("subtotal")}</dt>
                    <dd className={`text-sm font-medium text-gray-900 ${fontSizeClass}`}>Rs. {calculateSubtotal()}</dd>
                  </div>
                  {appliedCoupon && (
                    <div className="flex items-center justify-between">
                      <dt className={`text-sm ${fontSizeClass}`}>{t("discount", { percent: appliedCoupon.discount })}</dt>
                      <dd className={`text-sm font-medium text-green-700 ${fontSizeClass}`}>
                        - Rs. {calculateSubtotal() - calculateDiscountedTotal()}
                      </dd>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className={`text-base font-medium ${fontSizeClass}`}>{t("total")}</dt>
                    <dd className={`text-base font-medium text-gray-900 ${fontSizeClass}`}>
                      Rs. {calculateDiscountedTotal()}
                    </dd>
                  </div>
                </dl>

                {/* Confirm Button */}
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <button
                    onClick={createOrderSubmitHandler}
                    className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    {t("confirm_payment")} - Rs. {calculateDiscountedTotal()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
