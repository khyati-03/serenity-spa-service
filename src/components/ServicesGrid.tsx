import { useMemo, useState } from "react";
import { byCategory, byPriceRange, byQuery } from "../utils/filters";

export type ServiceItem = {
  id: number | string;
  title: string;
  description: string;
  price: string;
  image: string;
  category?: string;
};

function chipTone(category?: string) {
  const val = (category ?? "").toLowerCase();
  if (val.includes("massage")) return "chip-mint";
  if (val.includes("facial")) return "chip-sky";
  if (val.includes("therapy")) return "chip-rose";
  return "chip-sky";
}

export default function ServicesGrid({ items }: { items: ServiceItem[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [min, setMin] = useState<string>("");
  const [max, setMax] = useState<string>("");

  const categories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category || "General"))),
    [items]
  );

  const filtered = useMemo(() => {
    const minN = min ? Number(min) : undefined;
    const maxN = max ? Number(max) : undefined;
    return items
      .filter(byQuery(q))
      .filter(byCategory(cat))
      .filter(byPriceRange(minN, maxN));
  }, [items, q, cat, min, max]);

  function resetFilters() {
    setQ("");
    setCat("");
    setMin("");
    setMax("");
  }

  return (
    <section className="container-xl section-pad">
      {/* Filters and search */}
      <div className="ui-card p-4 md:p-5 mb-6">
        <div className="grid gap-3 md:grid-cols-6">
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              className="ui-field"
              placeholder="Search services"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search services"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Category</label>
            <select
              className="ui-select"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Min price
            </label>
            <input
              className="ui-field"
              placeholder="e.g. 80"
              inputMode="numeric"
              value={min}
              onChange={(e) => setMin(e.target.value.replace(/[^\d]/g, ""))}
              aria-label="Minimum price"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Max price
            </label>
            <input
              className="ui-field"
              placeholder="e.g. 150"
              inputMode="numeric"
              value={max}
              onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
              aria-label="Maximum price"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={resetFilters} className="ui-btn-ghost">
            Reset
          </button>
          <div className="ml-auto text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-700">{filtered.length}</span>{" "}
            of <span className="font-medium text-gray-700">{items.length}</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <article key={s.id} className="card">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-[1.05rem] leading-tight">
                  {s.title}
                </h3>
                <span className="text-brand-600 font-semibold whitespace-nowrap">
                  {s.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                {s.description}
              </p>
              {s.category && (
                <div className={`mt-3 chip ${chipTone(s.category)}`}>
                  {s.category}
                </div>
              )}
              <div className="mt-4">
                <button className="ui-btn w-full">Book Now</button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No services match your filters.
        </div>
      )}
    </section>
  );
}
