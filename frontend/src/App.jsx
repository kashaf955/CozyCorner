import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home.jsx';
import Login from './views/login.jsx';
import SignUp from './views/SignUp.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import Product from './views/Product.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </Router>
    )
}
export default App;