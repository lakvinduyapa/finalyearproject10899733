import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductAction,
  updateProductAction,
} from "../../../redux/slices/products/productSlices";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function UpdateProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error, isUpdated } = useSelector((state) => state.products);
  const currentProduct = product?.product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    totalQty: "",
  });

  useEffect(() => {
    if (id) dispatch(fetchProductAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || "",
        description: currentProduct.description || "",
        category: currentProduct.category || "",
        price: currentProduct.price || "",
        totalQty: currentProduct.totalQty || "",
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    if (isUpdated) {
      navigate("/admin/manage-products");
    }
  }, [isUpdated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAction({ id, ...formData }));
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>

      {error && <ErrorMsg message={error.message} />}
      {isUpdated && <SuccessMsg message="Product updated successfully!" />}
      {loading && <LoadingComponent />}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          name="totalQty"
          value={formData.totalQty}
          onChange={handleChange}
          placeholder="Total Quantity"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
