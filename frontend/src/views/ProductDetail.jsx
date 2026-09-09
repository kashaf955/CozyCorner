import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductImageCarousel from "../components/layout/ProductImageCarousel.jsx";
import RenderStars from "../components/layout/RenderStars.jsx";
import ReviewCard from "../components/layout/reviewCard.jsx";
import api from "../api.js";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    product = {},
    loading,
    error,
  } = useSelector((state) => state.productDetails);
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const submitReview = async () => {
    if (!rating || rating < 1 || rating > 5) {
      alert.error("Please select a rating between 1 and 5");
      return;
    }
    if (!comment.trim()) {
      alert.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);
      await api.put("/review", {
        rating: Number(rating),
        comment: comment.trim(),
        productId: id,
      });
      alert.success("Review submitted successfully");
      setShowReviewModal(false);
      setRating(0);
      setComment("");
      dispatch(getProductDetails(id));
    } catch (err) {
      const message = err.response?.data?.message || "Failed to submit review";
      if (err.response?.status === 401) {
        alert.error("Please login to write a review");
        navigate("/login");
      } else {
        alert.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1714]">
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  const currentRating = product.ratings ?? product.rating ?? 0;
  const reviewCount =
    product.numOfReviews ??
    (Array.isArray(product.reviews) ? product.reviews.length : 0);
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata
        title={product.name}
        description={product.description}
        keywords={product.category}
      />
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="w-full">
            <ProductImageCarousel
              images={product.images}
              productName={product.name}
            />
          </div>
          <div className="flex flex-col justify-center gap-4 text-mist">
            <h2 className="font-display text-3xl">{product.name}</h2>
            <p className="text-mist-70">Product #: {product._id}</p>
            <div className="flex items-center gap-1 text-sm">
              <RenderStars rating={currentRating} />
            </div>
            <p className="text-sm text-mist-70">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </p>
            <h1 className="text-4xl font-bold text-mist-70">
              ${Number(product.price || 0).toFixed(2)}
            </h1>
            <p className="text-sm text-mist-70">Stock: {product.stock}</p>
            <div className="flex w-full max-w-xs items-center gap-2 rounded-md bg-mist-900 p-2 text-mist-70">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="text-mist-70 hover:text-mist-100"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-full text-center text-mist-70"
              />
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock || q + 1, q + 1))
                }
                disabled={quantity >= product.stock}
                className="text-mist-70 hover:text-mist-100"
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="w-full max-w-xs rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
            >
              Add to Cart
            </button>
            <p>
              status:{" "}
              <b>
                {product.stock <= 0
                  ? "Out of Stock"
                  : product.stock < 10
                    ? "Hurry up! Only " + product.stock + " left"
                    : "In Stock " + product.stock}
              </b>
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-mist-70">Description</h2>
            <p className="text-mist-70">{product.description}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-mist-70">Reviews</h2>
            <button
              type="button"
              className="rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <p className="text-mist-70">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="flex w-full max-w-md flex-col gap-4 rounded-md bg-[#15201c] p-6 text-mist">
            <h3 className="text-xl font-semibold">Submit Review</h3>

            <label className="flex flex-col gap-1 text-sm text-mist-70">
              Rating (1–5)
              <input
                type="number"
                min={1}
                max={5}
                value={rating || ""}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rounded-md border border-white/15 bg-[#0f1714] px-3 py-2 text-mist"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-mist-70">
              Comment
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="rounded-md border border-white/15 bg-[#0f1714] px-3 py-2 text-mist"
                placeholder="Share your experience..."
              />
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={submitReview}
                className="rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setShowReviewModal(false);
                  setRating(0);
                  setComment("");
                }}
                className="rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-mist transition hover:bg-white/5"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
