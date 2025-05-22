import React, { useState } from "react";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

const AddShippingAddress = ({ userInfo }) => {
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
      window.location.reload(); // Reload to reflect saved state
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
            <label className="block text-sm font-medium text-gray-700">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressline1"
              value={formData.addressline1}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address Line 2
            </label>
            <input
              type="text"
              name="addressline2"
              value={formData.addressline2}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Province / State
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalcode"
              value={formData.postalcode}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={onChange}
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm sm:text-sm"
              required
            >
              <option value="">Select Country</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Nepal">Nepal</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Maldives">Maldives</option>
              <option value="Singapore">Singapore</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Add Shipping Address
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">Shipping details</h3>
          <p className="mt-1 text-sm text-gray-500">Double check your information.</p>
          <div>
            <p className="text-sm text-gray-500">Address Line 1: {shipping.addressline1}</p>
            <p className="text-sm text-gray-500">Address Line 2: {shipping.addressline2}</p>
            <p className="text-sm text-gray-500">City: {shipping.city}</p>
            <p className="text-sm text-gray-500">Province: {shipping.province}</p>
            <p className="text-sm text-gray-500">Postal Code: {shipping.postalcode}</p>
            <p className="text-sm text-gray-500">Country: {shipping.country}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AddShippingAddress;
