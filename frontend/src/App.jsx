import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import Header from "./components/layout/header.jsx";
import Footer from "./components/layout/footer.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/login.jsx";
import SignUp from "./views/SignUp.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Product from "./views/Product.jsx";
import Profile from "./views/profile.jsx";
import UpdateProfile from "./views/UpdateProfile.jsx";
import UpdatePassword from "./views/UpdatePassword.jsx";
import ForgotPassword from "./views/ForgotPassword.jsx";
import ResetPassword from "./views/ResetPassword.jsx";
import Cart from "./views/Cart.jsx";
import Orders from "./views/Orders.jsx";

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
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
