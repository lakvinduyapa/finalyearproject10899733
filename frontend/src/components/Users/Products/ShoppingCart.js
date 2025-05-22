import { useSelector, useDispatch } from "react-redux";
import {
  changeQty,
  removeFromCart,
  clearCart,
} from "../../../redux/slices/cart/cartSlice";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSize = isTamil ? "text-sm" : "text-base";

  const cartItems = useSelector((state) => state.cart?.cartItems || []);

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
        <h1 className={`text-3xl font-bold tracking-tight text-gray-900 sm:mb-4 sm:text-4xl ${fontSize}`}>
          {t("shopping_cart")}
        </h1>

        {cartItems.length === 0 ? (
          <p className={`mt-4 ${fontSize}`}>{t("cart_empty")}</p>
        ) : (
          <div className="mt-8 grid lg:grid-cols-12 gap-x-12">
            {/* Cart Items */}
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
                          <h3 className={`text-sm font-medium text-gray-700 ${fontSize}`}>
                            {product.name}
                          </h3>
                          <p className={`text-sm text-gray-500 ${fontSize}`}>
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

            {/* Order Summary */}
            <section className="lg:col-span-5 bg-gray-50 p-6 rounded-lg mt-6 lg:mt-0">
              <h2 className={`text-lg font-medium text-gray-900 ${fontSize}`}>
                {t("order_summary")}
              </h2>
              <div className="mt-4 flex justify-between">
                <span className={`text-gray-700 ${fontSize}`}>{t("subtotal")}</span>
                <span className={`font-semibold ${fontSize}`}>
                  Rs. {calculateTotalDiscountedPrice()}
                </span>
              </div>

              <div className="mt-6">
                <Link
                  to="/order-payment"
                  className={`block text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 ${fontSize}`}
                >
                  {t("proceed_checkout")}
                </Link>
              </div>

              <div className="mt-4">
                <button
                  onClick={clearCartHandler}
                  className={`w-full text-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 ${fontSize}`}
                >
                  {t("clear_cart")}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

