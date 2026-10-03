import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  const cards = [
    { to: "/admin/products", label: "Products", desc: "Create, edit stock/price, delete" },
    { to: "/admin/product/new", label: "New Product", desc: "Add a product with images" },
    { to: "/admin/orders", label: "Orders", desc: "Update status or delete orders" },
    { to: "/admin/users", label: "Users", desc: "Manage roles and accounts" },
  ];

  return (
    <div>
      <Metadata title="Admin Overview" />
      <h1 className="font-display text-3xl text-mist md:text-4xl">Overview</h1>
      <p className="mt-2 text-mist-70">
        Welcome, {user?.name}. Select a section from the sidebar or a card below.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-lg border border-white/10 bg-[#15201c] p-5 transition hover:border-leaf/50"
          >
            <h2 className="text-lg font-semibold text-mist">{card.label}</h2>
            <p className="mt-2 text-sm text-mist-70">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
