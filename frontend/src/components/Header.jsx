import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className= "bg-[#F8F5EF] text-[#292522] p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
            <h1 className= "text-2xl font-bold">
                <Link to="/">Cozy Corner</Link>
            </h1>
            <nav>
                <ul className= "flex gap-4">
                    <li><Link to="/">Home</Link></li> 
                    <li><Link to="/products">Shop</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/wishlist">Wishlist</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </nav>
    </header>
  );
};

export default Header;