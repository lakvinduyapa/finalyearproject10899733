import { useSelector, useDispatch } from "react-redux";
import {
  changeQty,
  removeFromCart,
  clearCart,
} from "../../../redux/slices/cart/cartSlice";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  console.log("🛒 ShoppingCart Loaded");
  console.log("Cart Items from Redux:", cartItems);

  const changeOrderItemQtyHandler = (id, qty) => {
    dispatch(changeQty({ id, qty: Number(qty) }));
  };

  const removeOrderItemFromLocalStorageHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  const calculateTotalDiscountedPrice = () =>
    cartItems.reduce((acc, item) => acc + item.qty * item.discountedPrice, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:mb-4 sm:text-4xl">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="mt-8 grid lg:grid-cols-12 gap-x-12">
            <section className="lg:col-span-7">
              <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cartItems.map((product) => (
                  <li key={product._id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={product.imageSrc || "/placeholder.jpg"}
                        alt={product.name}
                        className="h-24 w-24 rounded-md object-cover sm:h-48 sm:w-48"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Rs. {product.discountedPrice} x {product.qty}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          <select
                            value={product.qty}
                            onChange={(e) =>
                              changeOrderItemQtyHandler(product._id, e.target.value)
                            }
                            className="border rounded px-2 py-1 text-sm"
                          >
                            {[...Array(Math.max(1, product.qtyLeft || 0)).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() =>
                              removeOrderItemFromLocalStorageHandler(product._id)
                            }
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lg:col-span-5 bg-gray-50 p-6 rounded-lg mt-6 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4 flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span className="font-semibold">
                  Rs. {calculateTotalDiscountedPrice()}
                </span>
              </div>

              <div className="mt-6">
                <Link
                  to="/order-payment"
                  className="block text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  Proceed to Checkout
                </Link>
              </div>

              {/* ✅ Clear Cart Button */}
              <div className="mt-4">
                <button
                  onClick={clearCartHandler}
                  className="w-full text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
