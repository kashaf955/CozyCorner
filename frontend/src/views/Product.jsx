import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { filterProducts, clearErrors } from "../actions/productAction.js";
import Loader from "../components/layout/loader.jsx";
import { useAlert } from "../context/AlertContext.jsx";
import ProductCard from "../components/layout/ProductCard.jsx";
import Metadata from "../components/layout/metadata.jsx";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx";
import Filter from "../components/layout/Filter.jsx";

const RESULT_PER_PAGE = 8;

const Product = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const {
    products = [],
    productsCount = 0,
    resultPerPage = RESULT_PER_PAGE,
    filters = {}, loading = false, error = null,
  } = useSelector((state) => state.filters);
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, price]);

  useEffect(() => {
    dispatch(filterProducts(currentPage, RESULT_PER_PAGE, keyword, price));
  }, [dispatch, currentPage, keyword, price]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  const totalPages = Math.ceil(productsCount / resultPerPage) || 1;

  return (
    <div className="min-h-screen bg-[#0f1714]">
      <Metadata title="Products" description="Products" keywords="Products" />
      <Header />

      <div className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-8">
          <Filter price={price} onPriceChange={setPrice} />

          <div className="min-w-0 flex-1">
            {loading ? (
              <Loader />
            ) : (
              <>
                <ProductCard
                  embedded
                  products={products}
                  title={keyword ? `Results for "${keyword}"` : "All products"}
                  subtitle={
                    keyword
                      ? `${productsCount} product${productsCount === 1 ? "" : "s"} found`
                      : "Browse the full collection."
                  }
                />

                {products.length === 0 && (
                  <p className="mt-6 text-center text-mist-70">
                    No products found{keyword ? ` for "${keyword}"` : ""}.
                  </p>
                )}

                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
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
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
