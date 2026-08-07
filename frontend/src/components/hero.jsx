import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=80";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#0f1714]/88 via-[#0f1714]/55 to-[#0f1714]/25" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0f1714]/70 via-transparent to-[#0f1714]/35" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-6 pb-20 pt-28 md:justify-center md:px-8 md:pb-24 md:pt-32">
        <p className="animate-fade-up font-display text-5xl leading-none text-white sm:text-6xl md:text-7xl lg:text-8xl">
          Cozy Corner
        </p>

        <h1 className="animate-fade-up-delay mt-5 max-w-xl font-display text-2xl font-medium leading-snug text-mist sm:text-3xl md:text-4xl">
          Soft spaces made for everyday calm
        </h1>

        <p className="animate-fade-up-delay mt-4 max-w-md text-base leading-relaxed text-white/75 md:text-lg">
          Curated home pieces that turn quiet corners into your favorite place
          to land.
        </p>

        <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/products"
            className="rounded-md bg-leaf px-7 py-3.5 text-sm font-semibold tracking-wide text-white transition duration-300 hover:bg-[#4a7d63]"
          >
            Shop Now
          </Link>
          <Link
            to="/products"
            className="rounded-md border border-white/35 bg-transparent px-7 py-3.5 text-sm font-medium tracking-wide text-white transition duration-300 hover:border-white hover:bg-white/10"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
