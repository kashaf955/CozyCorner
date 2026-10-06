import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import Loader from "../../components/layout/loader.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import {
  getAdminProducts,
  getProductReviews,
  deleteReview,
  clearErrors,
} from "../../actions/adminAction.js";
import { DELETE_REVIEW_RESET } from "../../constants/adminConstants.js";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products } = useSelector((state) => state.adminProducts);
  const { reviews, loading, error } = useSelector((state) => state.productReviews);
  const {
    isDeleted,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.reviewAdmin);

  const [productId, setProductId] = useState("");

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error || deleteError) {
      alert.error(error || deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Review deleted");
      dispatch({ type: DELETE_REVIEW_RESET });
      if (productId) dispatch(getProductReviews(productId));
    }
  }, [error, deleteError, isDeleted, alert, dispatch, productId]);

  const handleLoad = (e) => {
    e.preventDefault();
    if (!productId) {
      alert.error("Select a product");
      return;
    }
    dispatch(getProductReviews(productId));
  };

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]";

  return (
    <div>
      <Metadata title="Admin Reviews" />
      <h1 className="font-display text-3xl text-mist">Reviews</h1>
      <p className="mt-2 text-sm text-mist-70">
        Load reviews for a product and remove inappropriate ones.
      </p>

      <form
        onSubmit={handleLoad}
        className="mt-8 flex flex-col gap-3 rounded-lg border border-white/10 bg-[#15201c] p-4 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label className="mb-1.5 block text-sm text-mist-70">Product</label>
          <select
            className={fieldClass}
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select product</option>
            {(products || []).map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-leaf px-5 py-3 text-sm font-semibold text-white hover:bg-[#4a7d63]"
        >
          Load reviews
        </button>
      </form>

      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full text-left text-sm text-mist">
            <thead className="bg-[#15201c] text-mist-70">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Rating</th>
                <th className="px-4 py-3">Comment</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(reviews || []).length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-mist-70">
                    {productId
                      ? "No reviews for this product."
                      : "Select a product to view reviews."}
                  </td>
                </tr>
              ) : (
                reviews.map((rev) => (
                  <tr key={rev._id} className="border-t border-white/10">
                    <td className="px-4 py-3">{rev.name}</td>
                    <td className="px-4 py-3">{rev.rating}</td>
                    <td className="max-w-xs px-4 py-3 text-mist-70">
                      {rev.comment || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        disabled={deleteLoading}
                        className="text-red-300 hover:underline disabled:opacity-50"
                        onClick={() => {
                          if (window.confirm("Delete this review?")) {
                            dispatch(deleteReview(rev._id, productId));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
