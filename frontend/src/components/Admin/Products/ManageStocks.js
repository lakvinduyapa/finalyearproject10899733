import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction, deleteProductAction } from "../../../redux/slices/products/productSlices";
import { Link } from "react-router-dom";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";

export default function ManageStocks() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAction(id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Manage Products</h1>
          <p className="text-gray-500 text-sm">List and manage all your products</p>
        </div>
        <Link
          to="/admin/add-product"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          Add New Product
        </Link>
      </div>

      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorMsg message={error.message} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {products?.products?.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-2">
                    <img src={product.images?.[0]} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">
                    {product.totalQty} (Remaining: {product.quantityleft})
                  </td>
                  <td className="px-4 py-2">Rs. {product.price}</td>
                  <td className="px-4 py-2 text-right space-x-4">
                    <Link to={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:underline">
                      Edit
                    </Link>
                    <button onClick={() => deleteProductHandler(product._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products?.products?.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
