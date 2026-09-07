import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";

const RESULT_PER_PAGE = 8;

const Product = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
    productsCount = 0,
    resultPerPage = RESULT_PER_PAGE,
  } = useSelector((state) => state.products);
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getProducts(currentPage, RESULT_PER_PAGE));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error, alert]);

  const totalPages = Math.ceil(productsCount / resultPerPage) || 1;

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Products" description="Products" keywords="Products" />
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProductCard
            products={products}
            title="All products"
            subtitle="Browse the full collection."
          />
          {totalPages > 1 && (
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-6 pb-16">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="rounded-md border border-white/15 px-3 py-2 text-sm text-mist disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-10 rounded-md px-3 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? "bg-leaf text-white"
                      : "border border-white/15 text-mist hover:bg-white/5"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="rounded-md border border-white/15 px-3 py-2 text-sm text-mist disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Product;
