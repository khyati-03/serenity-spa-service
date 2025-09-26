import { Link, NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/services", label: "Services" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-40 shadow-sm">
      <div className="container-xl flex items-center justify-between h-14">
        <Link
          to="/"
          className="font-semibold text-lg tracking-tight text-brand-600"
        >
          Serenity Spa
        </Link>
        <nav className="flex gap-6 text-sm">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end as any}
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
