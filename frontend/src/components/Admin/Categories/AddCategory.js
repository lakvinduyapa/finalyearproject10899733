import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../../redux/slices/categories/categoriesSlice";
import ErrorComponent from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { Link } from "react-router-dom";

export default function AddCategory() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    file: null,
  });

  const { error, isAdded, loading } = useSelector((state) => state.categories);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("file", formData.file); // IMPORTANT: match multer field name

    dispatch(createCategoryAction(data));
  };

  useEffect(() => {
    if (isAdded) {
      setFormData({ name: "", file: null });
    }
  }, [isAdded]);

  return (
    <>
      {error && <ErrorComponent message={error?.message} />}
      {isAdded && <SuccessMsg message="Category added successfully" />}
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <svg className="mx-auto h-10 text-blue-600 w-auto" xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653..." />
          </svg>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Add Product Category
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleOnSubmit} encType="multipart/form-data">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleOnChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Images</label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleOnChange}
                  className="mt-1 block w-full text-sm text-gray-500"
                  required
                />
              </div>
              <div>
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add Category
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
