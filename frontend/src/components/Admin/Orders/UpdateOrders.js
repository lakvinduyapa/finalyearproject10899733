import React from "react";
import { useDispatch } from "react-redux";
import { updateOrderAction } from "../../../redux/slices/orders/orderSlice";

const UpdateOrders = ({ id }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = React.useState("pending");

  const onChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    dispatch(updateOrderAction({ id, status: newStatus }));
  };

  return (
    <div className="mt-6 flex items-center space-x-4 text-sm font-medium">
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Update Order
        </label>
        <select
          id="status"
          name="status"
          onChange={onChange}
          value={status}
          className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
};

export default UpdateOrders;
