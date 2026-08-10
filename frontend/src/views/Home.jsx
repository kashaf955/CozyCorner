import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Hero from "../components/hero.jsx";
import Footer from "../components/footer.jsx";
import ProductCard from "../components/ProductCard.jsx";
import api from "../api.js";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
