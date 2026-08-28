import { useEffect } from "react";
import Header from "../components/layout/header.jsx";
import Hero from "../components/layout/hero.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import Metadata from "../components/layout/metadata.jsx";
import { getProducts } from "../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Cozy Corner" description="Home page" keywords="home, page" />
      <Header />
      <Hero />
      {loading ? (
        <p className="px-6 py-16 text-center text-mist-70">Loading products...</p>
      ) : error ? (
        <p className="px-6 py-16 text-center text-red-300">{error}</p>
      ) : (
        <ProductCard products={products} />
      )}
      <Footer />
    </div>
  );
};

export default Home;
