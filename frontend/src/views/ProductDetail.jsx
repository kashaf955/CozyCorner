import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductImageCarousel from "../components/layout/ProductImageCarousel.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product = {}, loading, error } = useSelector((state) => state.productDetails);
  const alert = useAlert();

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

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata
        title={product.name}
        description={product.description}
        keywords={product.category}
      />
      <Header />
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="w-full">
            <ProductImageCarousel
              images={product.images}
              productName={product.name}
            />
          </div>
          <div className="flex flex-col gap-4 text-mist">
            <h1 className="font-display text-3xl">{product.name}</h1>
            <p className="text-xl text-mist-70">${Number(product.price).toFixed(2)}</p>
            <p className="text-mist-70">{product.description}</p>
            <p className="text-sm text-mist-70">Stock: {product.stock}</p>
            <button
              type="button"
              className="w-full max-w-xs rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
