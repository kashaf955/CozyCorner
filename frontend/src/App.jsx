import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import Header from "./components/layout/Header.jsx";
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
import Shipping from "./views/Shipping.jsx";
import ConfirmOrder from "./views/ConfirmOrder.jsx";
import Orders from "./views/Orders.jsx";
import OrderDetails from "./views/OrderDetails.jsx";
import AdminLayout from "./views/admin/AdminLayout.jsx";
import Dashboard from "./views/admin/Dashboard.jsx";
import ProductList from "./views/admin/ProductList.jsx";
import NewProduct from "./views/admin/NewProduct.jsx";
import OrderList from "./views/admin/OrderList.jsx";
import UserList from "./views/admin/UserList.jsx";

const AppRoutes = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
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
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetails />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/new" element={<NewProduct />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="users" element={<UserList />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
