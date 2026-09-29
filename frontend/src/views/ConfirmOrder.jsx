import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { createOrder, clearErrors } from "../actions/orderAction.js";
import { clearCart } from "../actions/cartAction.js";

const ConfirmForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { loading, error, success, order } = useSelector((state) => state.newOrder);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((itemsPrice * 0.05).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  useEffect(() => {
    if (!cartItems.length) navigate("/cart");
  }, [cartItems, navigate]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success && order?._id) {
      alert.success("Order placed successfully");
      dispatch(clearCart());
      navigate(`/order/${order._id}`);
    }
  }, [error, success, order, alert, dispatch, navigate]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        shippingInfo,
        orderItems: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          product: item.product,
        })),
        paymentInfo: {
          id: `cod_${Date.now()}`,
          status: "Succeeded",
        },
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Confirm Order" />
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg bg-[#15201c] p-6">
            <h2 className="font-display text-2xl text-mist">Shipping</h2>
            <p className="mt-3 text-sm text-mist-70">
              {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state},{" "}
              {shippingInfo.country} — {shippingInfo.pinCode}
            </p>
            <p className="mt-1 text-sm text-mist-70">Phone: {shippingInfo.phoneNo}</p>
          </div>
          <div className="rounded-lg bg-[#15201c] p-6">
            <h2 className="font-display text-2xl text-mist">Cart Items</h2>
            <ul className="mt-4 space-y-3">
              {cartItems.map((item) => (
                <li key={item.product} className="flex items-center gap-3 text-sm text-mist">
                  <img src={item.image} alt="" className="h-12 w-12 rounded object-cover" />
                  <Link to={`/product/${item.product}`} className="flex-1 hover:underline">
                    {item.name}
                  </Link>
                  <span>
                    {item.quantity} × ${item.price} = $
                    {(item.quantity * item.price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-fit rounded-lg bg-[#15201c] p-6">
          <h2 className="font-display text-2xl text-mist">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm text-mist-70">
            <div className="flex justify-between"><dt>Items</dt><dd>${itemsPrice.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt>Shipping</dt><dd>${shippingPrice.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt>Tax</dt><dd>${taxPrice.toFixed(2)}</dd></div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-mist">
              <dt>Total</dt>
              <dd className="font-semibold">${totalPrice.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-white/40">Payment: Cash on delivery (demo)</p>
          <button
            type="button"
            disabled={loading}
            onClick={placeOrder}
            className="mt-6 w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
};

const ConfirmOrder = () => (
  <ProtectedRoute>
    <ConfirmForm />
  </ProtectedRoute>
);

export default ConfirmOrder;
