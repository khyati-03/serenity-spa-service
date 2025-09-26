export const byQuery =
  (q: string) => (x: { title: string; description?: string }) =>
    !q ||
    `${x.title} ${x.description ?? ""}`.toLowerCase().includes(q.toLowerCase());

export const byCategory = (cat: string) => (x: { category?: string }) =>
  !cat || (x.category ?? "General").toLowerCase() === cat.toLowerCase();

export const byPriceRange =
  (min?: number, max?: number) => (x: { price?: string }) => {
    const n = Number(String(x.price ?? "").replace(/[^\d.]/g, ""));
    if (Number.isNaN(n)) return true;
    if (min != null && n < min) return false;
    if (max != null && n > max) return false;
    return true;
  };
