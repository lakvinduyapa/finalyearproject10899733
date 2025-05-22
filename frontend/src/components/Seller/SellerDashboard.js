import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, Outlet } from "react-router-dom";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  ScaleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const SellerDashboard = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const ordersLinks = [
    {
      name: "dashboard",
      href: "",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      ),
    },
    {
      name: "manage_orders",
      href: "manage-orders",
      icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    // {
    //   name: "customers",
    //   href: "customers",
    //   icon: () => (
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
    //       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    //     </svg>
    //   ),
    // },
  ];

  const productsLinks = [
    { name: "add_product", href: "add-product", icon: () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75" />
        </svg>
      )
    },
    { name: "manage_stock", href: "manage-products", icon: ScaleIcon },
  ];

  const postLinks = [
    { name: "add_post", href: "create-post", icon: PencilSquareIcon },
  ];

  const allLinks = [...ordersLinks, ...productsLinks, ...postLinks];

  return (
    <div className="min-h-full">
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#FFB1E1] pt-5 pb-4">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button onClick={() => setSidebarOpen(false)} className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <nav className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto">
                  <div className="space-y-1 px-2">
                    {allLinks.map((item) => (
                      <Link key={item.name} to={item.href} className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-black hover:bg-cyan-600 hover:text-white">
                        <item.icon className="mr-4 h-6 w-6 text-black" aria-hidden="true" />
                        {t(item.name)}
                      </Link>
                    ))}
                  </div>
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:top-24 lg:bottom-0 lg:flex lg:w-64 lg:flex-col bg-[#FFB1E1] pb-4">
        <nav className="mt-5 pt-4 flex flex-1 flex-col divide-y divide-gray-200 overflow-y-auto">
          {[ordersLinks, productsLinks, postLinks].map((section, i) => (
            <div key={i} className="mt-4 px-2 space-y-1">
              {section.map((item) => (
                <Link key={item.name} to={item.href} className="flex items-center text-sm text-black px-2 py-2 hover:bg-cyan-600 hover:text-white rounded-md">
                  <item.icon className="mr-4 h-6 w-6 text-black" />
                  {t(item.name)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <div className="flex h-16 border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8 items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3CenterLeftIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <main className="flex-1 pb-8">
          <div className="bg-white shadow px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold text-gray-900 ${fontSizeClass}`}>
                  {t("welcome_seller")}
                </h1>
                <p className={`text-sm text-gray-500 ${fontSizeClass}`}>
                  {t("manage_dashboard")}
                </p>
              </div>
              <div className={`text-sm text-gray-500 ${fontSizeClass}`}>
                {t("role")}: Seller<br />
                {t("email")}: seller@example.com
              </div>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
