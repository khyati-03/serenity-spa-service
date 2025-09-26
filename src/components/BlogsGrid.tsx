import { Link } from "react-router-dom";

export type BlogItem = {
  id: number | string;
  title: string;
  excerpt: string;
  image: string;
};

export default function BlogsGrid({ items }: { items: BlogItem[] }) {
  return (
    <section className="container-xl section-pad">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((b) => (
          <article key={b.id} className="card">
            <img
              src={b.image}
              alt={b.title}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-gray-600 line-clamp-3">
                {b.excerpt}
              </p>
              <div className="mt-3">
                <Link
                  to={`/blog/${b.id}`}
                  className="text-sm text-brand-600 font-medium underline underline-offset-4"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center py-14 text-gray-500">
          No blog posts yet.
        </div>
      )}
    </section>
  );
}
