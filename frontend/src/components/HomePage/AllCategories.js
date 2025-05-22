import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AllCategories = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  if (loading) return <p className="text-center py-10">{t("loading")}</p>;
  if (error) return <p className="text-center text-red-600 py-10">{error}</p>;

  return (
    <>
      {/* Header */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">
              {t("total_categories")} [{categories?.length || 0}]
            </span>
          </h2>
          <p className="mt-2 text-gray-600">
            {t("browse_categories")}
          </p>
        </div>
      </div>

      {/* Responsive Grid */}
      <div className="mt-6 mb-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="relative flex flex-col overflow-hidden rounded-lg shadow hover:opacity-90 transition-all bg-white"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-80 w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-2">
                <p className="text-center text-white font-semibold text-lg">
                  {category.name} ({category.products?.length || 0})
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCategories;
