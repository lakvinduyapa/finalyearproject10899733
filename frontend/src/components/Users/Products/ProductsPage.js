import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../../../redux/slices/products/productSlices";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const priceFilterFunction = (product) => {
    if (!priceRange) return true;
    const [min, max] = priceRange.split("-").map(Number);
    return product.price >= min && product.price <= max;
  };

  const filteredProducts = Array.isArray(products?.products)
    ? products.products
        .filter((product) => {
          const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
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
        <h1 className="text-2xl font-bold">All Products</h1>
        <input
          type="text"
          placeholder="Search Products..."
          className="border border-gray-300 px-4 py-2 rounded shadow-sm w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 border-r pr-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">By Category</h3>
            <ul className="space-y-1">
              <li
                onClick={() => setSelectedCategory("")}
                className={`cursor-pointer ${selectedCategory === "" ? "font-bold text-blue-600" : ""}`}
              >
                All
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

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">By Price</h3>
            <ul className="space-y-1">
              {[ 
                { label: "All", value: "" },
                { label: "Below Rs. 1000", value: "0-1000" },
                { label: "Rs. 1000 - 5000", value: "1000-5000" },
                { label: "Rs. 5000 - 10,000", value: "5000-10000" },
                { label: "Above Rs. 10,000", value: "10000-1000000" },
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

          {/* Sort Options */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="">-- Select --</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="ratingHigh">Rating: High to Low</option>
              <option value="ratingLow">Rating: Low to High</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="mb-6 flex justify-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setPriceRange("");
                setSortBy("");
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded shadow"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading...</p>
          ) : filteredProducts?.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow rounded p-4">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.images?.[0] || "/no-image.png"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">Rs. {product.price}</p>
                </Link>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
