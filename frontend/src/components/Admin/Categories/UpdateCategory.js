import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchCategoryAction,
  updateCategoryAction,
} from "../../../redux/slices/categories/categoriesSlice";
import { resetSuccessAction } from "../../../redux/slices/globalActions/globalActions";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function UpdateCategory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { category, loading, error, isUpdated } = useSelector(
    (state) => state.categories
  );

  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchCategoryAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (category?.category?.name) {
      setName(category.category.name);
    }
  }, [category]);

  // Reset success flag after update
  useEffect(() => {
    if (isUpdated) {
      const timer = setTimeout(() => {
        dispatch(resetSuccessAction());
        navigate("/admin/manage-category");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isUpdated, dispatch, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAction({ id, name }));
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Category</h2>

      {error && <ErrorMsg message={error.message} />}
      {isUpdated && <SuccessMsg message="Good job! Category updated successfully!" />}
      {loading && <LoadingComponent />}

      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block mb-2 font-medium">Category Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Category
        </button>
      </form>
    </div>
  );
}
