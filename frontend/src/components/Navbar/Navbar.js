import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import baseURL from "../../utils/baseURL";
import logo from "./logo3.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserAction } from "../../redux/slices/users/usersSlice";
import { clearCart } from "../../redux/slices/cart/cartSlice";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const dispatch = useDispatch();
  const categoriesToDisplay = [];
  const { userInfo } = useSelector((state) => state.users.userAuth);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLoggedIn = !!userInfo?.token;
  const isAdmin = userInfo?.userFound?.isAdmin;
  const isSeller = userInfo?.userFound?.isSeller;

  const logoutHandler = () => {
    dispatch(clearCart());
    dispatch(logoutUserAction());
  };

  return (
    <div className="bg-white">
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <Link to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    {t("home")}
                  </Link>
                  <Link to="/products" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    {t("products")}
                  </Link>
                  <Link to="/newsfeed" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    {t("newsfeed")}
                  </Link>
                  {isLoggedIn && (
                    <>
                      {isAdmin && (
                        <Link to="/admin" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                          {t("admin_dashboard")}
                        </Link>
                      )}
                      {!isAdmin && isSeller && (
                        <Link to="/seller" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                          {t("seller_dashboard")}
                        </Link>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/register" className="-m-2 block p-2 font-medium text-gray-900">
                        {t("create_account")}
                      </Link>
                      <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                        {t("sign_in")}
                      </Link>
                    </>
                  ) : (
                    <button onClick={logoutHandler} className="-m-2 block p-2 font-medium text-gray-900">
                      {t("logout")}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative z-10">
        <nav aria-label="Top">
          <div className="bg-[#FFB1E1]">
            <div className="relative mx-auto flex h-10 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
              <p className="absolute left-1/2 transform -translate-x-1/2 text-sm font-medium text-black">
                Use code FLASH2025 - to get 10% off on you Purchase
              </p>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {!isLoggedIn ? (
                  <>
                    <Link to="/register" className="text-sm font-medium text-black hover:text-gray-100">
                      {t("create_account")}
                    </Link>
                    <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                    <Link to="/login" className="text-sm font-medium text-black hover:text-gray-100">
                      {t("sign_in")}
                    </Link>
                  </>
                ) : (
                  <button onClick={logoutHandler} className="text-sm font-medium text-black hover:text-gray-100">
                    {t("logout")}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border-b border-gray-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex h-16 items-center justify-between">
                <div className="hidden lg:flex lg:items-center">
                  <Link to="/">
                    <span className="sr-only">Liya Savi</span>
                    <img className="h-[96px] w-auto" src={logo} alt="Liya Savi Logo" />
                  </Link>
                </div>

                <div className="hidden h-full lg:flex">
                  <Popover.Group className="ml-8">
                    <div className="flex h-full justify-center space-x-8">
                      <Link to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        {t("home")}
                      </Link>
                      <Link to="/products" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        {t("products")}
                      </Link>
                      <Link to="/newsfeed" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                        {t("newsfeed")}
                      </Link>
                      {isLoggedIn && (
                        <>
                          {isAdmin && (
                            <Link to="/admin" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                              {t("admin_dashboard")}
                            </Link>
                          )}
                          {!isAdmin && isSeller && (
                            <Link to="/seller" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                              {t("seller_dashboard")}
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </Popover.Group>
                </div>

                <div className="flex flex-1 items-center lg:hidden">
                  <button
                    type="button"
                    className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Link to="/" className="lg:hidden">
                  <img className="h-[96px] w-auto" src={logo} alt="Liya Savi Logo" />
                </Link>

                <div className="flex flex-1 items-center justify-end">
                  <div className="flex items-center lg:ml-8">
                    {/* Language Selector */}
                    <select
                      onChange={handleLanguageChange}
                      defaultValue={i18n.language}
                      className="border border-gray-300 rounded px-2 py-1 text-sm mr-4"
                    >
                      <option value="en">English</option>
                      <option value="si">සිංහල</option>
                      <option value="ta">தமிழ்</option>
                    </select>

                    <div className="flex space-x-8">
                      {isLoggedIn && (
                        <div className="flex">
                          <Link to="/customer-profile" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                    <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />
                    <div className="flow-root">
                      <Link to="/shopping-cart" className="group -m-2 flex items-center p-2">
                        <ShoppingCartIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cartItemCount}
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
