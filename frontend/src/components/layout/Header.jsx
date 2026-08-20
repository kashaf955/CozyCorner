import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `text-sm tracking-wide transition-colors duration-300 ${
    isActive ? "text-white" : "text-white/75 hover:text-white"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-md px-3 py-3 text-base tracking-wide transition-colors ${
    isActive ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5 hover:text-white"
  }`;

const iconBtnClass =
  "relative inline-flex h-10 w-10 items-center justify-center rounded-md text-white/85 transition duration-300 hover:bg-white/15 hover:text-white";

const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
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

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    className="h-6 w-6"
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8 md:py-5">
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl"
        >
          Cozy Corner
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
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

          <div className="flex items-center gap-1 border-l border-white/20 pl-6">
            <Link to="/products" className={iconBtnClass} aria-label="Search products">
              <SearchIcon />
            </Link>
            <Link to="/cart" className={iconBtnClass} aria-label="Cart">
              <CartIcon />
            </Link>
            <Link to="/login" className={iconBtnClass} aria-label="Profile">
              <ProfileIcon />
            </Link>
          </div>
        </nav>

        {/* Mobile: search + cart + hamburger */}
        <div className="flex items-center gap-1 md:hidden">
          <Link to="/products" className={iconBtnClass} aria-label="Search products">
            <SearchIcon />
          </Link>
          <Link to="/cart" className={iconBtnClass} aria-label="Cart">
            <CartIcon />
          </Link>
          <button
            type="button"
            className={iconBtnClass}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0f1714]/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto max-w-6xl px-5 py-4">
            <ul className="flex flex-col gap-1">
              <li>
                <NavLink to="/" className={mobileLinkClass} end onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/products" className={mobileLinkClass} onClick={closeMenu}>
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className={mobileLinkClass} onClick={closeMenu}>
                  Login / Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
