export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-rose-50 to-indigo-50">
      <div className="container-xl py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Relax. Rejuvenate. Restore.
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Premium spa & wellness services tailored to your needs. Explore our
          signature therapies, discover wellness tips, and get in touch.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a
            href="/services"
            className="px-5 py-2.5 rounded-md bg-gray-900 text-white hover:opacity-90"
          >
            Explore Services
          </a>
          <a
            href="/blog"
            className="px-5 py-2.5 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Read Blog
          </a>
        </div>
      </div>
    </section>
  );
}
