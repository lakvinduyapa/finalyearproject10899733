import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLatestProductsAction } from "../../redux/slices/products/productSlices";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomeProductTrending = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const { latestProducts, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchLatestProductsAction());
  }, [dispatch]);

  return (
    <section aria-labelledby="trending-heading">
      <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8 lg:pt-32 ">
        <div className="md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-bold tracking-tight text-gray-900">
            {t("latest_products")}
          </h2>
          <Link
            to="/products"
            className="hidden text-medium font-semibold text-pink-600 hover:text-pink-500 sm:block">
            {t("shop_collection")}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {loading ? (
            <p className={fontSizeClass}>{t("loading")}</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            latestProducts?.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product.images?.[0] || "/no-image.png"}
                    alt={product.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className={`mt-4 font-medium text-gray-700 ${fontSizeClass}`}>
                  {product.name}
                </h3>
                <p className={`mt-1 font-medium text-gray-900 ${fontSizeClass}`}>
                  Rs. {product.price}
                </p>
              </Link>
            ))
          )}
        </div>

        <div className="mt-8 text-sm md:hidden text-center">
          <Link
            to="/products"
            className="font-medium text-pink-600 hover:text-pink-500">
            {t("shop_collection")}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeProductTrending;
