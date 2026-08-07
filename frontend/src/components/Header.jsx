import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-sm tracking-wide transition-colors duration-300 ${
    isActive ? "text-white" : "text-white/75 hover:text-white"
  }`;

const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-8">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl"
        >
          Cozy Corner
        </Link>

        <nav>
          <ul className="flex items-center gap-5 md:gap-8">
            <li>
              <NavLink to="/" className={linkClass} end>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={linkClass}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={linkClass}>
                Cart
              </NavLink>
            </li>
            <li className="hidden sm:block">
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            </li>
            <li>
              <Link
                to="/register"
                className="rounded-md bg-white/15 px-3.5 py-2 text-sm text-white backdrop-blur-sm transition hover:bg-white/25"
              >
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
