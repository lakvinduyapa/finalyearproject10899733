import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoriesAction,
  deleteCategoryAction,
} from "../../../redux/slices/categories/categoriesSlice";
import { Link } from "react-router-dom";

export default function ManageCategories() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Categories</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat._id} className="text-center border-t">
                <td className="px-4 py-2 border">
                  <img
                    src={cat?.image}
                    alt={cat.name}
                    className="h-16 w-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{cat.name}</td>
                <td className="px-4 py-2 border space-x-4">
                  <Link
                    to={`/admin/edit-category/${cat._id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories?.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
