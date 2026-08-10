import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-sm tracking-wide transition-colors duration-300 ${
    isActive ? "text-white" : "text-white/75 hover:text-white"
  }`;

const iconBtnClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-md text-white/85 transition duration-300 hover:bg-white/15 hover:text-white";

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M6 6h15l-1.5 9h-12z" />
    <path d="M6 6 5 3H2" />
    <circle cx="9" cy="20" r="1" />
    <circle cx="18" cy="20" r="1" />
  </svg>
);

const ProfileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5.5 19.5c1.8-3.2 4.2-4.5 6.5-4.5s4.7 1.3 6.5 4.5" />
  </svg>
);

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

        <nav className="flex items-center gap-4 md:gap-8">
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
          </ul>

          <div className="flex items-center gap-1 border-l border-white/20 pl-4 md:pl-6">
            <Link to="/cart" className={iconBtnClass} aria-label="Cart">
              <CartIcon />
            </Link>
            <Link to="/login" className={iconBtnClass} aria-label="Profile">
              <ProfileIcon />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
