import { Link } from "react-router-dom";
import Metadata from "../components/layout/metadata.jsx";

const Cart = () => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="Cart" description="Your shopping cart" />
      <div className="w-full max-w-lg rounded-lg bg-[#15201c] p-8 text-center">
        <h1 className="font-display text-3xl text-mist">Your Cart</h1>
        <p className="mt-3 text-mist-70">
          Cart is empty for now. Add products from the shop to continue.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-block rounded-md bg-leaf px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
        >
          Browse Shop
        </Link>
      </div>
    </section>
  );
};

export default Cart;
