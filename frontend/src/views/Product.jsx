import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";

const Product = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);
  const alert = useAlert();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, alert]);

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Products" description="Products" keywords="Products" />
      <Header />
      {loading ? <Loader /> : <ProductCard products={products} />}
      <Footer />
    </div>
  );
};

export default Product;
