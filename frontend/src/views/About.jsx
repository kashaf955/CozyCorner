import { Link } from "react-router-dom";
import Metadata from "../components/layout/metadata.jsx";

const stack = [
  { layer: "Frontend", items: "React 19, Vite, Tailwind CSS v4, Redux, React Router, MUI, Axios" },
  { layer: "Backend", items: "Node.js, Express, MongoDB, Mongoose" },
  { layer: "Auth", items: "JWT, bcryptjs, HTTP-only cookies" },
  { layer: "Media & email", items: "Cloudinary, Nodemailer" },
];

const features = [
  "Shop home décor with search, filters, ratings, and product reviews",
  "Cart, shipping, and order flow for signed-in customers",
  "JWT auth with register, login, logout, profile, and password reset",
  "Admin dashboard for products, orders, and users",
  "Cloudinary image uploads for avatars and product photos",
  "Custom toast alerts via AlertContext (React 19 friendly)",
];

const routes = [
  { path: "/", label: "Home", desc: "Hero and featured products" },
  { path: "/products", label: "Shop", desc: "Browse and filter the catalog" },
  { path: "/cart", label: "Cart", desc: "Review items before checkout" },
  { path: "/login", label: "Login", desc: "Sign in to your account" },
  { path: "/admin", label: "Admin", desc: "Manage store data (admin role)" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#0f1714] text-mist">
      <Metadata
        title="About Cozy Corner"
        description="Project overview for the Cozy Corner MERN e-commerce app"
        keywords="about, cozy corner, mern, ecommerce"
      />

      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1714]/70 via-[#0f1714]/85 to-[#0f1714]" />
        <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-32 md:px-8 md:pt-40">
          <p className="text-sm tracking-[0.2em] text-leaf uppercase">About</p>
          <h1 className="mt-3 font-display text-4xl text-white md:text-5xl">
            Cozy Corner
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mist-70">
            A full-stack e-commerce app for home décor — React on the frontend,
            Node.js, Express, and MongoDB on the backend. Browse pieces, manage
            a cart, place orders, and run the store from an admin panel.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-14 px-6 py-16 md:px-8">
        <div>
          <h2 className="font-display text-2xl text-white md:text-3xl">What you can do</h2>
          <ul className="mt-6 space-y-3 text-mist-70">
            {features.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white md:text-3xl">Tech stack</h2>
          <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {stack.map((row) => (
              <div
                key={row.layer}
                className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <dt className="text-sm font-medium text-leaf">{row.layer}</dt>
                <dd className="text-mist-70">{row.items}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white md:text-3xl">Main pages</h2>
          <ul className="mt-6 space-y-4">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className="group flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-medium text-white transition group-hover:text-leaf">
                    {route.label}
                  </span>
                  <span className="text-sm text-white/40">{route.path}</span>
                  <span className="w-full text-sm text-mist-70 sm:w-auto">
                    {route.desc}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl text-white md:text-3xl">Project layout</h2>
          <p className="mt-4 text-mist-70">
            The repo is split into a root Express API (<code className="text-white/80">backend/</code>)
            and a Vite React app (<code className="text-white/80">frontend/</code>), with Redux
            actions, reducers, and page views under <code className="text-white/80">frontend/src</code>.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-white/10 bg-[#15201c] p-4 text-sm leading-relaxed text-mist-70">
{`CozyCorner/
├── backend/     # Express API, models, auth, orders
├── frontend/    # React UI, Redux, pages
└── package.json # Backend scripts & shared start`}
          </pre>
        </div>

        <div className="border-t border-white/10 pt-10">
          <p className="text-mist-70">
            Built as a learning MERN storefront for cozy home décor — from catalog
            browsing to admin management.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex rounded-md bg-leaf px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4a7d63]"
          >
            Browse the shop
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
