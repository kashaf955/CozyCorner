import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import Loader from "../../components/layout/loader.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import {
  getAdminProducts,
  deleteProduct,
  updateProduct,
  clearErrors,
} from "../../actions/adminAction.js";
import {
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../constants/adminConstants.js";

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, loading, error } = useSelector((state) => state.adminProducts);
  const {
    isDeleted,
    isUpdated,
    error: adminError,
  } = useSelector((state) => state.productAdmin);

  const [stockMap, setStockMap] = useState({});
  const [priceMap, setPriceMap] = useState({});

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products?.length) {
      const stocks = {};
      const prices = {};
      products.forEach((p) => {
        stocks[p._id] = p.stock ?? 0;
        prices[p._id] = p.price ?? 0;
      });
      setStockMap(stocks);
      setPriceMap(prices);
    }
  }, [products]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (adminError) {
      alert.error(adminError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product deleted");
      dispatch({ type: DELETE_PRODUCT_RESET });
      dispatch(getAdminProducts());
    }
    if (isUpdated) {
      alert.success("Product updated");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      dispatch(getAdminProducts());
    }
  }, [error, adminError, isDeleted, isUpdated, alert, dispatch]);

  const handleSave = (product) => {
    const stock = Number(stockMap[product._id]);
    const price = Number(priceMap[product._id]);
    if (!Number.isFinite(stock) || stock < 0) {
      alert.error("Enter a valid stock (0 or more)");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      alert.error("Enter a valid price");
      return;
    }
    dispatch(
      updateProduct(product._id, {
        name: product.name,
        description: product.description,
        category: product.category,
        stock,
        price,
      })
    );
  };

  return (
    <div>
      <Metadata title="Admin Products" />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl text-mist">Products</h1>
        <Link
          to="/admin/product/new"
          className="rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4a7d63]"
        >
          New Product
        </Link>
      </div>
      {loading ? (
        <div className="mt-12 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full text-left text-sm text-mist">
            <thead className="bg-[#15201c] text-mist-70">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(products || []).map((p) => (
                <tr key={p._id} className="border-t border-white/10">
                  <td className="px-4 py-3">{p.name}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={priceMap[p._id] ?? p.price ?? 0}
                      onChange={(e) =>
                        setPriceMap((m) => ({ ...m, [p._id]: e.target.value }))
                      }
                      className="w-24 rounded border border-white/20 bg-[#0f1714] px-2 py-1 text-mist outline-none focus:border-leaf"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={stockMap[p._id] ?? p.stock ?? 0}
                      onChange={(e) =>
                        setStockMap((m) => ({ ...m, [p._id]: e.target.value }))
                      }
                      className="w-20 rounded border border-white/20 bg-[#0f1714] px-2 py-1 text-mist outline-none focus:border-leaf"
                    />
                  </td>
                  <td className="space-x-3 px-4 py-3">
                    <button
                      type="button"
                      className="text-leaf hover:underline"
                      onClick={() => handleSave(p)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="text-red-300 hover:underline"
                      onClick={() => {
                        if (window.confirm("Delete this product?")) {
                          dispatch(deleteProduct(p._id));
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
