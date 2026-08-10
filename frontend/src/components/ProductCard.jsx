const ProductCard = ({ product }) => {
  if (!product) return null;

  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group overflow-hidden rounded-lg bg-[#15201c] text-mist/70 transition duration-300 hover:-translate-y-1">
      <div className="aspect-4/5 overflow-hidden">
        <img
          src={image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <h3 className="font-display text-lg font-medium leading-snug">
          {product.name}
        </h3>
        <p className="text-sm text-mist/70">
          ${Number(product.price).toFixed(2)}
        </p>
        <button
          type="button"
          className="w-full rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
