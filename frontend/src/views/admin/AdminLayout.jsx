import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Metadata from "../../components/layout/metadata.jsx";
import ProtectedRoute from "../../components/layout/ProtectedRoute.jsx";

const navItems = [
  { to: "/admin/dashboard", label: "Overview", end: true },
  { to: "/admin/products", label: "Products", end: false },
  { to: "/admin/product/new", label: "New Product", end: false },
  { to: "/admin/orders", label: "Orders", end: false },
  { to: "/admin/users", label: "Users", end: false },
  { to: "/admin/user/new", label: "New User", end: false },
  { to: "/admin/reviews", label: "Reviews", end: false },
];

const navClass = ({ isActive }) =>
  `block rounded-md px-3 py-2.5 text-sm transition ${
    isActive
      ? "bg-leaf text-white"
      : "text-mist-70 hover:bg-white/10 hover:text-mist"
  }`;

const AdminShell = () => {
  const { user } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0f1714] pt-20">
      <Metadata title="Admin" />
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed bottom-0 left-0 top-20 z-50 flex w-64 flex-col border-r border-white/10 bg-[#15201c] transition-transform md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="border-b border-white/10 px-4 py-5">
            <p className="text-xs uppercase tracking-wide text-white/40">Admin</p>
            <p className="mt-1 truncate font-display text-lg text-mist">
              {user?.name || "Dashboard"}
            </p>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navClass}
                onClick={() => setSidebarOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-white/10 p-3">
            <NavLink
              to="/"
              className="block rounded-md px-3 py-2.5 text-sm text-mist-70 transition hover:bg-white/10 hover:text-mist"
              onClick={() => setSidebarOpen(false)}
            >
              ← Back to store
            </NavLink>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 md:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-md border border-white/20 px-3 py-2 text-sm text-mist"
            >
              Menu
            </button>
            <span className="text-sm text-mist-70">Admin panel</span>
          </div>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => (
  <ProtectedRoute isAdmin>
    <AdminShell />
  </ProtectedRoute>
);

export default AdminLayout;
