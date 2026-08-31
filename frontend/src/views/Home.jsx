import { useEffect } from "react";
import Header from "../components/layout/header.jsx";
import Hero from "../components/layout/hero.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Loader from "../components/layout/loader.jsx";
import { getProducts } from "../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'
const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Cozy Corner" description="Home page" keywords="home, page" />
      <Header />
      <Hero />
      {loading ? (
        <Loader />
      ) : error ? (
        alert.error(error)
      ) : (
        <ProductCard products={products} />
      )}
      <Footer />
    </div>
  );
};

export default Home;
