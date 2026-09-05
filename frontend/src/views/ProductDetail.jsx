import { useEffect, useState  } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductImageCarousel from "../components/layout/ProductImageCarousel.jsx";
import RenderStars from "../components/layout/RenderStars.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product = {}, loading, error } = useSelector((state) => state.productDetails);
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, alert]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1714]">
        <Header />
        <Loader />
        <Footer />
      </div>
    );
  }

  const rating = product.ratings ?? product.rating ?? 0;
  const reviewCount =
    product.numOfReviews ??
    (Array.isArray(product.reviews) ? product.reviews.length : 0);

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
              <RenderStars rating={rating} />
            </div>
            <p className="text-sm text-mist-70">
              {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
            </p>
            <h1 className="text-4xl font-bold text-mist-70">${Number(product.price || 0).toFixed(2)}</h1>
            <p className="text-mist-70">{product.description}</p>
            <p className="text-sm text-mist-70">Stock: {product.stock}</p>
            <div className="flex items-center gap-2 w-full max-w-xs bg-mist-900 rounded-md p-2 text-mist-70"> 
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1} className="text-mist-70 hover:text-mist-100">-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full text-center text-mist-70" />
            <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stock} className="text-mist-70 hover:text-mist-100">+</button>
            </div>
            <button
              type="button"
              className="w-full max-w-xs rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
            >
              Add to Cart
            </button>
            <p>
              status: {}
              <b>{product.stock <= 0 ? "Out of Stock" : product.stock < 10 ? "Hurry up! Only " + product.stock + " left" : "In Stock " + product.stock}</b>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
