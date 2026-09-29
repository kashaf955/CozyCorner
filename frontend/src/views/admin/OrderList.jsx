import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";
import Loader from "../../components/layout/loader.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import {
  getAllOrders,
  updateOrder,
  deleteOrder,
  clearErrors,
} from "../../actions/orderAction.js";
import {
  UPDATE_ORDER_RESET,
  DELETE_ORDER_RESET,
} from "../../constants/orderConstants.js";

const OrderListContent = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { orders, loading, error, totalAmount } = useSelector((state) => state.allOrders);
  const { isUpdated, isDeleted, error: orderError } = useSelector((state) => state.order);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (error || orderError) {
      alert.error(error || orderError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order updated");
      dispatch({ type: UPDATE_ORDER_RESET });
      dispatch(getAllOrders());
    }
    if (isDeleted) {
      alert.success("Order deleted");
      dispatch({ type: DELETE_ORDER_RESET });
      dispatch(getAllOrders());
    }
  }, [error, orderError, isUpdated, isDeleted, alert, dispatch]);

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Admin Orders" />
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl text-mist">Orders</h1>
        <p className="mt-2 text-mist-70">
          Total revenue: ${Number(totalAmount || 0).toFixed(2)}
        </p>
        {loading ? (
          <div className="mt-12 flex justify-center"><Loader /></div>
        ) : (
          <ul className="mt-8 space-y-4">
            {(orders || []).map((order) => (
              <li key={order._id} className="rounded-lg border border-white/10 bg-[#15201c] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-mist">#{order._id.slice(-8)}</p>
                    <p className="text-sm text-mist-70">${Number(order.totalPrice).toFixed(2)} · {order.orderStatus}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      className="rounded border border-white/20 bg-[#0f1714] px-2 py-1 text-sm text-mist"
                      value={statusMap[order._id] || order.orderStatus}
                      onChange={(e) =>
                        setStatusMap((m) => ({ ...m, [order._id]: e.target.value }))
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      type="button"
                      className="rounded bg-leaf px-3 py-1 text-xs font-semibold text-white"
                      onClick={() =>
                        dispatch(
                          updateOrder(order._id, statusMap[order._id] || order.orderStatus)
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="text-xs text-red-300 hover:underline"
                      onClick={() => {
                        if (window.confirm("Delete order?")) dispatch(deleteOrder(order._id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Link to="/admin/dashboard" className="mt-6 inline-block text-sm text-mist underline">
          Back to dashboard
        </Link>
      </div>
    </section>
  );
};

const OrderList = () => (
  <ProtectedRoute isAdmin>
    <OrderListContent />
  </ProtectedRoute>
);

export default OrderList;
