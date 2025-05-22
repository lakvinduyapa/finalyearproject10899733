import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { useTranslation } from "react-i18next";

const AddShippingAddress = ({ userInfo }) => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const user = userInfo?.userFound;
  const shipping = user?.ShippingAddress || {};

  const shouldShowForm =
    !user?.hasShippingAddress ||
    !shipping.addressline1 ||
    !shipping.city ||
    !shipping.country;

  const [formData, setFormData] = useState({
    addressline1: shipping.addressline1 || "",
    addressline2: shipping.addressline2 || "",
    city: shipping.city || "",
    province: shipping.province || "",
    postalcode: shipping.postalcode || "",
    country: shipping.country || "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const res = await axios.put(
        `${baseURL}/users/update/shippingaddress`,
        formData,
        config
      );

      console.log("Shipping address saved:", res.data);
      window.location.reload();
    } catch (error) {
      console.error("Failed to save shipping address", error);
    }
  };

  return (
    <>
      {shouldShowForm ? (
        <form
          onSubmit={onSubmit}
          className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
        >
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">{t("address_line_1")}</label>
            <input
              type="text"
              name="addressline1"
              value={formData.addressline1}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">{t("address_line_2")}</label>
            <input
              type="text"
              name="addressline2"
              value={formData.addressline2}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("city")}</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("province")}</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("postal_code")}</label>
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("country")}</label>
            <select
              name="country"
              value={formData.country}
              onChange={onChange}
              className={`mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm ${fontSizeClass}`}
              required
            >
              <option value="">{t("select_country")}</option>
              {["Sri Lanka", "India", "Pakistan", "Bangladesh", "Nepal", "Bhutan", "Maldives", "Singapore", "Malaysia", "Thailand", "Indonesia", "United States", "United Kingdom", "Canada", "Australia"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {t("add_shipping_address")}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">{t("shipping_details")}</h3>
          <p className="mt-1 text-sm text-gray-500">{t("double_check")}</p>
          <div>
            <p className="text-sm text-gray-500">{t("address_line_1")}: {shipping.addressline1}</p>
            <p className="text-sm text-gray-500">{t("address_line_2")}: {shipping.addressline2}</p>
            <p className="text-sm text-gray-500">{t("city")}: {shipping.city}</p>
            <p className="text-sm text-gray-500">{t("province")}: {shipping.province}</p>
            <p className="text-sm text-gray-500">{t("postal_code")}: {shipping.postalcode}</p>
            <p className="text-sm text-gray-500">{t("country")}: {shipping.country}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddShippingAddress;
