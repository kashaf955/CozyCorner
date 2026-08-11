import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0a100e] px-6 py-10 text-mist-70 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-display text-lg text-mist">Cozy Corner</p>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <Link to="/products" className="transition hover:text-white">
            Shop
          </Link>
          <Link to="/cart" className="transition hover:text-white">
            Cart
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
