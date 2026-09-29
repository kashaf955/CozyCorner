import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";
import Loader from "../../components/layout/loader.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import {
  getAdminProducts,
  deleteProduct,
  clearErrors,
} from "../../actions/adminAction.js";
import { DELETE_PRODUCT_RESET } from "../../constants/adminConstants.js";

const ProductListContent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.adminProducts);
  const { isDeleted, error: deleteError } = useSelector((state) => state.productAdmin);

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product deleted");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProducts());
    }
  }, [error, deleteError, isDeleted, alert, dispatch]);

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Admin Products" />
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-mist">Products</h1>
          <Link
            to="/admin/product/new"
            className="rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4a7d63]"
          >
            New Product
          </Link>
        </div>
        {loading ? (
          <div className="mt-12 flex justify-center"><Loader /></div>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-left text-sm text-mist">
              <thead className="bg-[#15201c] text-mist-70">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(products || []).map((p) => (
                  <tr key={p._id} className="border-t border-white/10">
                    <td className="px-4 py-3">{p.name}</td>
                    <td className="px-4 py-3">${Number(p.price).toFixed(2)}</td>
                    <td className="px-4 py-3">{p.stock}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="text-red-300 hover:underline"
                        onClick={() => {
                          if (window.confirm("Delete this product?")) {
                            dispatch(deleteProduct(p._id));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Link to="/admin/dashboard" className="mt-6 inline-block text-sm text-mist underline">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
};

const ProductList = () => (
  <ProtectedRoute isAdmin>
    <ProductListContent />
  </ProtectedRoute>
);

export default ProductList;
