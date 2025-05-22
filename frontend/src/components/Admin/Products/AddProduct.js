// Create Product Form for Admin Dashboard
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { createProductAction } from "../../../redux/slices/products/productSlices";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    totalQty: "",
    images: [],
  });

  const { name, description, category, price, totalQty, images } = formData;
  const { loading, error, isAdded } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", name);
    payload.append("description", description);
    payload.append("category", category);
    payload.append("price", price);
    payload.append("totalQty", totalQty);
    images.forEach((file) => payload.append("files", file));

    dispatch(createProductAction(payload));
  };

  return (
    <>
      {error && <ErrorMsg message={error?.message} />}
      {isAdded && <SuccessMsg message="Product Created Successfully" />}
      <div className="flex min-h-full flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create Product
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="text"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required>
                  <option value="">-- Select Category --</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price (LKR)</label>
                <input
                  name="price"
                  value={price}
                  onChange={handleChange}
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Total Quantity</label>
                <input
                  name="totalQty"
                  value={totalQty}
                  onChange={handleChange}
                  type="number"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={handleChange}
                  multiple
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  required
                />
              </div>

              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Add Product
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
