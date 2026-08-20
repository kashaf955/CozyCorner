import { useEffect, useState } from "react";
import Header from "../components/layout/header.jsx";
import Hero from "../components/layout/hero.jsx";
import Footer from "../components/layout/footer.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import api from "../api.js";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Header />
      <Hero />
      <ProductCard products={products} />
      <Footer />
    </div>
  );
};

export default Home;
