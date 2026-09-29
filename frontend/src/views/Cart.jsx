import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import {
  removeItemsFromCart,
  updateCartQuantity,
} from "../actions/cartAction.js";
import { useAlert } from "../context/AlertContext.jsx";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const checkoutHandler = () => {
    if (!isAuthenticated) {
      alert.info("Please login to checkout");
      navigate("/login");
      return;
    }
    navigate("/shipping");
  };

  if (!cartItems.length) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
        <Metadata title="Cart" />
        <div className="w-full max-w-lg rounded-lg bg-[#15201c] p-8 text-center">
          <h1 className="font-display text-3xl text-mist">Your Cart</h1>
          <p className="mt-3 text-mist-70">Your cart is empty.</p>
          <Link
            to="/products"
            className="mt-8 inline-block rounded-md bg-leaf px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
          >
            Browse Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Cart" />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl text-mist md:text-4xl">Your Cart</h1>
        <ul className="mt-8 space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.product}
              className="flex flex-col gap-4 rounded-lg border border-white/10 bg-[#15201c] p-4 sm:flex-row sm:items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link to={`/product/${item.product}`} className="text-mist hover:underline">
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-mist-70">${Number(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded border border-white/20 px-2 py-1 text-mist"
                  onClick={() =>
                    dispatch(
                      updateCartQuantity(
                        item.product,
                        Math.max(1, item.quantity - 1)
                      )
                    )
                  }
                >
                  -
                </button>
                <span className="w-8 text-center text-mist">{item.quantity}</span>
                <button
                  type="button"
                  className="rounded border border-white/20 px-2 py-1 text-mist"
                  onClick={() =>
                    dispatch(
                      updateCartQuantity(
                        item.product,
                        Math.min(item.stock || 99, item.quantity + 1)
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="text-sm text-red-300 hover:underline"
                onClick={() => dispatch(removeItemsFromCart(item.product))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-lg bg-[#15201c] p-6">
          <p className="text-mist">
            Subtotal ({cartItems.reduce((a, i) => a + i.quantity, 0)} items):{" "}
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </p>
          <button
            type="button"
            onClick={checkoutHandler}
            className="mt-4 w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] sm:w-auto"
          >
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
