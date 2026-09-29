import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";
import { useAlert } from "../../context/AlertContext.jsx";
import { createProduct, clearErrors } from "../../actions/adminAction.js";
import { NEW_PRODUCT_RESET } from "../../constants/adminConstants.js";

const NewProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Decoration");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product created");
      dispatch({ type: NEW_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [error, success, alert, dispatch, navigate]);

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages([]);
    setPreviews([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviews((prev) => [...prev, reader.result]);
          setImages((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!images.length) {
      alert.error("Please add at least one image");
      return;
    }
    dispatch(
      createProduct({
        name,
        price: Number(price),
        description,
        category,
        stock: Number(stock),
        images,
      })
    );
  };

  const fieldClass =
    "w-full rounded-md border border-white/15 bg-[#0f1714] px-4 py-3 text-mist outline-none focus:border-[#3d6b54]";

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0f1714] px-6 pt-24 pb-16">
      <Metadata title="New Product" />
      <div className="w-full max-w-lg rounded-lg bg-[#15201c] p-8">
        <h1 className="font-display text-3xl text-mist">New Product</h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className={fieldClass} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className={fieldClass} type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <textarea className={fieldClass} placeholder="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input className={fieldClass} placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          <input className={fieldClass} type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
          <input type="file" accept="image/*" multiple onChange={onImagesChange} className="text-sm text-mist-70" />
          <div className="flex flex-wrap gap-2">
            {previews.map((src, i) => (
              <img key={i} src={src} alt="" className="h-16 w-16 rounded object-cover" />
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-leaf px-4 py-3 text-sm font-semibold text-white hover:bg-[#4a7d63] disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

const NewProduct = () => (
  <ProtectedRoute isAdmin>
    <NewProductForm />
  </ProtectedRoute>
);

export default NewProduct;
