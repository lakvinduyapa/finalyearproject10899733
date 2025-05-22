import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/cart/cartSlice";

export default function ThanksForOrdering() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${baseURL}/orders/stripe-success/${sessionId}`);
        setOrder(data.order);
        dispatch(clearCart()); // ✅ Clear cart after successful payment
      } catch (err) {
        console.error("Error fetching order", err);
      }
    };

    if (sessionId) fetchOrder();
  }, [sessionId, dispatch]);

  if (!order) return <div className="p-10 text-center">Loading your order...</div>;

  const { _id, orderItems, shippingAddress, totalPrice } = order;

  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-sm font-medium text-indigo-600">Payment successful</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </p>
          <p className="mt-2 text-base text-gray-500">
            We appreciate your order. It's now being processed.
          </p>

          <dl className="mt-6 text-sm font-medium">
            <dt className="text-gray-900">Order ID</dt>
            <dd className="mt-1 text-indigo-600">{_id}</dd>
          </dl>
        </div>

        <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
          {orderItems.map((item) => (
            <li key={item._id} className="flex space-x-6 py-6">
              <img
                src={item.product?.images?.[0] || "https://via.placeholder.com/100"}
                alt={item.product?.name || "Product"}
                className="h-24 w-24 flex-none rounded-md bg-gray-100 object-cover object-center"
              />
              <div className="flex-auto space-y-1">
                <h3 className="text-gray-900">{item.product?.name}</h3>
                <p>Qty: {item.qty}</p>
              </div>
              <p className="flex-none font-medium text-gray-900">
                Rs. {item.product?.discountedPrice || item.product?.price}
              </p>
            </li>
          ))}
        </ul>

        <dl className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
          <div className="flex justify-between">
            <dt>Total</dt>
            <dd className="text-gray-900">Rs. {totalPrice}</dd>
          </div>
        </dl>

        <dl className="mt-10 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
          <div>
            <dt className="font-medium text-gray-900">Shipping Address</dt>
            <dd className="mt-2">
              <address className="not-italic space-y-1">
                <p>{shippingAddress?.addressline1}</p>
                <p>{shippingAddress?.city}</p>
                <p>{shippingAddress?.country}</p>
              </address>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Payment Info</dt>
            <dd className="mt-2">
              <p>Paid via Stripe</p>
            </dd>
          </div>
        </dl>

        <div className="mt-16 border-t border-gray-200 py-6 text-right">
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
