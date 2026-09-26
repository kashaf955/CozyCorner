import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import api from "../api.js";

const OrdersContent = () => {
  const alert = useAlert();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const loadOrders = async () => {
      try {
        const { data } = await api.get("/order/me");
        if (active) setOrders(data.orders || []);
      } catch (err) {
        alert.error(err.response?.data?.message || "Failed to load orders");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadOrders();
    return () => {
      active = false;
    };
  }, [alert]);

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="My Orders" />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl text-mist md:text-4xl">My Orders</h1>
        <p className="mt-2 text-mist-70">Orders placed with your account.</p>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader />
          </div>
        ) : orders.length === 0 ? (
          <div className="mt-10 rounded-lg bg-[#15201c] p-8 text-center">
            <p className="text-mist-70">You have no orders yet.</p>
            <Link
              to="/products"
              className="mt-6 inline-block rounded-md bg-leaf px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((order) => (
              <li
                key={order._id}
                className="rounded-lg border border-white/10 bg-[#15201c] px-5 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm text-mist">
                    Order <span className="text-white/50">#{order._id.slice(-8)}</span>
                  </p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-mist">
                    {order.orderStatus}
                  </span>
                </div>
                <p className="mt-2 text-sm text-mist-70">
                  Total: ${Number(order.totalPrice || 0).toFixed(2)}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

const Orders = () => (
  <ProtectedRoute>
    <OrdersContent />
  </ProtectedRoute>
);

export default Orders;
