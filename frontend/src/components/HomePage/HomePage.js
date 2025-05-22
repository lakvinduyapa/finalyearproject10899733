import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";

const Example = () => {
  const { t, i18n } = useTranslation();

  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";
  const headingSizeClass = isTamil ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl";

  const offers = [
    {
      name: t("offer_support_local"),
      description: t("offer_support_local_desc"),
      href: "#",
    },
    {
      name: t("offer_free_delivery"),
      description: t("offer_free_delivery_desc"),
      href: "#",
    },
    {
      name: t("offer_coupon"),
      description: t("offer_coupon_desc"),
      href: "#",
    },
  ];

  return (
    <div className="bg-white">
      <main>
        {/* Hero Section */}
        <div className="relative border-b border-gray-200">
          <div className="relative" style={{ backgroundColor: "#FFB1E1" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
              <div className="mx-auto max-w-2xl py-12 lg:max-w-none lg:py-24">
                <div className="lg:pr-16">
                  <h1 className={`font-bold tracking-tight text-gray-900 ${headingSizeClass}`}>
                    {t("hero_title")}
                  </h1>
                  <p className={`mt-4 ${fontSizeClass} text-gray-600`}>
                    {t("hero_description")}
                  </p>
                  <div className="mt-6">
                    <a
                      href="/products"
                      className="inline-block rounded-md border border-transparent bg-white py-3 px-8 font-bold text-black hover:bg-indigo-700"
                    >
                      {t("shop_now")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="h-48 w-full sm:h-64 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1593490755898-b6f1d8e637cb?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Offers Section */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl lg:px-8 py-3">
            <ul
              role="list"
              className="grid grid-cols-1 divide-y divide-gray-400 lg:grid-cols-3 lg:divide-y-0 lg:divide-x"
            >
              {offers.map((offer) => (
                <li key={offer.name} className="flex flex-col text-center px-4 py-6">
                  <a
                    href={offer.href}
                    className="flex-1 flex flex-col justify-center bg-white focus:z-10"
                  >
                    <p className={`text-medium text-gray-500 ${fontSizeClass}`}>{offer.name}</p>
                    <p className={`font-semibold text-gray-900 ${fontSizeClass}`}>
                      {offer.description}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* News Banner */}
        <div className="relative overflow-hidden bg-gray-200">
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-16 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none pb-6">
              <h2
                id="sale-heading"
                className={`font-bold tracking-tight text-gray-900 pb-2 ${headingSizeClass}`}
              >
                {t("sale_title")}
              </h2>
              <p className={`mx-auto mt-4 max-w-xl text-gray-600 ${fontSizeClass}`}>
                {t("sale_description")}
              </p>
              <a
                href="/newsfeed"
                className="mt-6 inline-block w-full rounded-md border border-transparent bg-[#FC6DC5] py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                {t("visit_newsfeed")}
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Product Sections */}
      <main>
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              {t("shop_by_category")}
            </h2>
            <Link
              to="/all-categories"
              className="hidden text-medium font-semibold text-pink-600 hover:text-pink-500 sm:block"
            >
              {t("browse_all_categories")} <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          <HomeCategories />
        </section>

        <HomeProductTrending />
      </main>
    </div>
  );
};

export default Example;
