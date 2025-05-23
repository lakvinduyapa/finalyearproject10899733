import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";

export default function UpdateProduct() {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    totalQty: "",
  });

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Dispatch updateProductAction here with formData and productId
    console.log("Updated product:", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mb-2 border p-2" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full mb-2 border p-2" />
        <select name="category" value={formData.category} onChange={handleChange} className="w-full mb-2 border p-2">
          <option value="">-- Select Category --</option>
          {categories?.map((cat) => (
            <option key={cat._id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
        <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} className="w-full mb-2 border p-2" />
        <input name="totalQty" placeholder="Total Quantity" type="number" value={formData.totalQty} onChange={handleChange} className="w-full mb-4 border p-2" />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
