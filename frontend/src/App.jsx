import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import Login from "./views/login.jsx";
import SignUp from "./views/SignUp.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Product from "./views/Product.jsx";
import SearchBar from "./components/layout/SearchBar.jsx";
import store from "./store.js";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction.js";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import Profile from "./views/profile.jsx";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<SearchBar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
