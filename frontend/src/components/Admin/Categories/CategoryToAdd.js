import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../../redux/slices/categories/categoriesSlice";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function CategoryToAdd() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    file: null, 
  });

  const { loading, error, isAdded } = useSelector((state) => state.categories);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("file", formData.file); 
    dispatch(createCategoryAction(data));
    setFormData({ name: "", file: null });
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Category</h2>

      {error && <ErrorMsg message={error.message} />}
      {isAdded && <SuccessMsg message="Category added successfully!" />}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="file" 
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Submitting..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
