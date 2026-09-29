import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";

const DashboardContent = () => {
  const { user } = useSelector((state) => state.user);

  const cards = [
    { to: "/admin/products", label: "Products", desc: "Create, edit, delete products" },
    { to: "/admin/orders", label: "Orders", desc: "View and update order status" },
    { to: "/admin/users", label: "Users", desc: "Manage user roles" },
  ];

  return (
    <section className="min-h-screen bg-[#0f1714] px-6 pt-28 pb-16">
      <Metadata title="Admin Dashboard" />
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl text-mist md:text-4xl">Admin Dashboard</h1>
        <p className="mt-2 text-mist-70">Welcome, {user?.name}. Manage your store.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="rounded-lg border border-white/10 bg-[#15201c] p-6 transition hover:border-leaf/50"
            >
              <h2 className="text-lg font-semibold text-mist">{card.label}</h2>
              <p className="mt-2 text-sm text-mist-70">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => (
  <ProtectedRoute isAdmin>
    <DashboardContent />
  </ProtectedRoute>
);

export default Dashboard;
