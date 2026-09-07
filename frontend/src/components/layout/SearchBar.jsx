import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onClose, autoFocus = false }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const value = keyword.trim();
    if (value) {
      navigate(`/products?keyword=${encodeURIComponent(value)}`);
    } else {
      navigate("/products");
    }
    setKeyword("");
    onClose?.();
  };

  return (
    <form
      onSubmit={searchSubmitHandler}
      className="flex w-full items-center gap-2"
      role="search"
    >
      <input
        type="search"
        name="keyword"
        placeholder="Search products..."
        value={keyword}
        autoFocus={autoFocus}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full rounded-md border border-white/25 bg-[#15201c] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/45 focus:border-[#3d6b54]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-md bg-leaf px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
