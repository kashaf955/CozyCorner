import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../components/layout/metadata.jsx";
import ProtectedRoute from "../components/layout/ProtectedRoute.jsx";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import { getOrderDetails, clearErrors } from "../actions/orderAction.js";

const OrderDetailsContent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  if (loading || !order?._id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1714] pt-24">
        <Loader />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title={`Order ${order._id}`} />
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl text-mist">Order Details</h1>
          <Link to="/orders" className="text-sm text-mist underline underline-offset-4">
            Back to orders
          </Link>
        </div>
        <div className="rounded-lg bg-[#15201c] p-6 text-sm text-mist-70">
          <p>
            Order ID: <span className="text-mist">{order._id}</span>
          </p>
          <p className="mt-2">
            Status:{" "}
            <span className="capitalize text-mist">{order.orderStatus}</span>
          </p>
          <p className="mt-2">
            Placed:{" "}
            {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
          </p>
        </div>
        <div className="rounded-lg bg-[#15201c] p-6">
          <h2 className="text-lg text-mist">Shipping</h2>
          <p className="mt-2 text-sm text-mist-70">
            {order.shippingInfo?.address}, {order.shippingInfo?.city},{" "}
            {order.shippingInfo?.state}, {order.shippingInfo?.country} —{" "}
            {order.shippingInfo?.pinCode}
          </p>
          <p className="mt-1 text-sm text-mist-70">
            Phone: {order.shippingInfo?.phoneNo}
          </p>
        </div>
        <div className="rounded-lg bg-[#15201c] p-6">
          <h2 className="text-lg text-mist">Items</h2>
          <ul className="mt-4 space-y-3">
            {(order.orderItems || []).map((item) => (
              <li key={item.product} className="flex items-center gap-3 text-sm text-mist">
                <img src={item.image} alt="" className="h-12 w-12 rounded object-cover" />
                <span className="flex-1">{item.name}</span>
                <span>
                  {item.quantity} × ${item.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-4 text-mist">
            Total: <span className="font-semibold">${Number(order.totalPrice || 0).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const OrderDetails = () => (
  <ProtectedRoute>
    <OrderDetailsContent />
  </ProtectedRoute>
);

export default OrderDetails;
