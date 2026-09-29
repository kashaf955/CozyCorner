import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import RenderStars from "./RenderStars.jsx";
import { addItemsToCart } from "../../actions/cartAction.js";
import { useAlert } from "../../context/AlertContext.jsx";

const ProductCard = ({
  products = [],
  title = "Featured pieces",
  subtitle = "A few quiet favorites to settle into your space.",
  embedded = false,
}) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  if (!products.length) return null;

  const handleAddToCart = (product) => {
    const stock = Number(product?.stock);
    if (Number.isFinite(stock) && stock < 1) {
      alert.error("Out of stock");
      return;
    }
    dispatch(addItemsToCart(product, 1));
    alert.success("Added to cart");
  };

  return (
    <section
      className={
        embedded
          ? "w-full min-w-0"
          : "mx-auto max-w-6xl px-6 py-16 md:px-8"
      }
    >
      <div className="mb-8 max-w-xl">
        <h2 className="font-display text-3xl text-mist md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-mist-70">{subtitle}</p>}
      </div>

      <div
        className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
          embedded ? "xl:grid-cols-3" : "lg:grid-cols-3"
        }`}
      >
        {products.map((product) => {
          const image =
            product.images?.[0]?.url ||
            product.image ||
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

          const rating = product.ratings ?? product.rating ?? 0;
          const reviewCount =
            product.numOfReviews ??
            (Array.isArray(product.reviews) ? product.reviews.length : 0);

          return (
            <article
              key={product._id}
              className="group overflow-hidden rounded-lg bg-[#15201c] text-mist-70 transition duration-300 hover:-translate-y-1"
            >
              <Link to={`/product/${product._id}`} className="block">
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-3 p-4">
                  <h3 className="font-display text-lg font-medium leading-snug text-mist">
                    {product.name}
                  </h3>
                  <p className="text-sm text-mist-70">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <RenderStars rating={rating} />
                  </div>
                  <p className="text-sm text-mist-70">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  disabled={Number.isFinite(Number(product.stock)) && Number(product.stock) < 1}
                  onClick={() => handleAddToCart(product)}
                  className="w-full rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63] disabled:opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ProductCard;
