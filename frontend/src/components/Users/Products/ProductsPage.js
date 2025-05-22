import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../redux/slices/products/productSlices";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { addToCart } from "../../../redux/slices/cart/cartSlice";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSize = isTamil ? "text-sm" : "text-base";

  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const priceFilterFunction = (product) => {
    if (!priceRange) return true;
    const [min, max] = priceRange.split("-").map(Number);
    return product.price >= min && product.price <= max;
  };

  const filteredProducts = Array.isArray(products?.products)
    ? products.products
        .filter((product) => {
          const matchesSearch = product.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory
            ? product.category === selectedCategory
            : true;
          const matchesPrice = priceFilterFunction(product);
          return matchesSearch && matchesCategory && matchesPrice;
        })
        .sort((a, b) => {
          if (sortBy === "priceLow") return a.price - b.price;
          if (sortBy === "priceHigh") return b.price - a.price;
          if (sortBy === "ratingHigh") return (b.rating || 0) - (a.rating || 0);
          if (sortBy === "ratingLow") return (a.rating || 0) - (b.rating || 0);
          return 0;
        })
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between mb-6 items-center">
        <h1 className={`text-2xl font-bold ${fontSize}`}>{t("all_products")}</h1>
        <input
          type="text"
          placeholder={t("search_placeholder")}
          className="border border-gray-300 px-4 py-2 rounded shadow-sm w-64 max-sm:w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mobile Filter Toggle */}
      <div className="sm:hidden mb-4">
        <button
          className="bg-gray-200 px-4 py-2 rounded shadow"
          onClick={() => setShowMobileFilters(true)}
        >
          {t("show_filters")}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden sm:block w-64 border-r pr-4">
          <Filters />
        </aside>

        {/* Mobile Sidebar */}
        {showMobileFilters && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 flex">
            <div className="bg-white w-64 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-bold ${fontSize}`}>{t("filters")}</h2>
                <button onClick={() => setShowMobileFilters(false)}>❌</button>
              </div>
              <Filters />
            </div>
            <div
              className="flex-1"
              onClick={() => setShowMobileFilters(false)}
            ></div>
          </div>
        )}

        {/* Products */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p>{t("loading")}...</p>
          ) : filteredProducts.length === 0 ? (
            <p>{t("no_products")}</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow rounded p-4">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.images?.[0] || "/no-image.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className={`mt-2 font-semibold text-lg ${fontSize}`}>{product.name}</h3>
                  <p className={`text-gray-600 ${fontSize}`}>Rs. {product.price}</p>
                </Link>
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        _id: product._id,
                        name: product.name,
                        imageSrc: product.images?.[0],
                        discountedPrice: product.price,
                        qtyLeft: product.quantityleft,
                      })
                    )
                  }
                  className="mt-2 bg-[#FC6DC5] text-black font-semibold px-3 py-1 rounded hover:bg-blue-700"
                >
                  {t("add_to_cart")}
                </button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );

  function Filters() {
    return (
      <>
        <div className="mb-6">
          <h3 className={`font-semibold mb-2 text-[#FC6DC5] ${fontSize}`}>{t("by_category")}</h3>
          <ul className="space-y-1">
            <li
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer ${selectedCategory === "" ? "font-bold text-blue-600" : ""}`}
            >
              {t("all")}
            </li>
            {categories?.map((cat) => (
              <li
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`cursor-pointer ${selectedCategory === cat.name ? "font-bold text-blue-600" : ""}`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className={`font-semibold mb-2 text-[#FC6DC5] ${fontSize}`}>{t("by_price")}</h3>
          <ul className="space-y-1">
            {[
              { label: t("all"), value: "" },
              { label: t("price_below_1000"), value: "0-1000" },
              { label: t("price_1000_5000"), value: "1000-5000" },
              { label: t("price_5000_10000"), value: "5000-10000" },
              { label: t("price_above_10000"), value: "10000-1000000" },
            ].map((range) => (
              <li
                key={range.value}
                onClick={() => setPriceRange(range.value)}
                className={`cursor-pointer ${priceRange === range.value ? "font-bold text-blue-600" : ""}`}
              >
                {range.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className={`font-semibold mb-2 text-[#FC6DC5] ${fontSize}`}>{t("sort_by")}</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="">{t("select_sort")}</option>
            <option value="priceLow">{t("sort_price_low")}</option>
            <option value="priceHigh">{t("sort_price_high")}</option>
            <option value="ratingHigh">{t("sort_rating_high")}</option>
            <option value="ratingLow">{t("sort_rating_low")}</option>
          </select>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setPriceRange("");
              setSortBy("");
            }}
            className="px-4 py-2 bg-[#FC6DC5] hover:bg-[#FFB1E1] text-sm font-semibold rounded shadow"
          >
            {t("clear_filters")}
          </button>
        </div>
      </>
    );
  }
}
