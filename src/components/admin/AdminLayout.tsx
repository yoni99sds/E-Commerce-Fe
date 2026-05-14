import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  ShoppingCart,
  TicketPercent,
} from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const linkClass = ({ isActive }: any) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR (DESKTOP ONLY) */}
      <aside className="hidden md:block w-64 bg-white border-r p-5">

        <h1 className="text-xl font-bold mb-8">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">

          <NavLink to="/admin" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <ShoppingBag size={18} />
            Products
          </NavLink>

          <NavLink to="/admin/categories" className={linkClass}>
            <Tags size={18} />
            Categories
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            <ShoppingCart size={18} />
            Orders
          </NavLink>

          <NavLink to="/admin/promos" className={linkClass}>
            <TicketPercent size={18} />
            Promo Codes
          </NavLink>

        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6 w-full">
        {children}
      </main>

    </div>
  );
}