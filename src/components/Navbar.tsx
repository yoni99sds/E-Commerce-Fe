import {
  ShoppingBag,
  Search,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  ClipboardList,
  Package,
  Tags,
  ShoppingCart,
  TicketPercent,
  Home,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar({ onCartOpen }: { onCartOpen: () => void }) {
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">

      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tighter text-primary"
        >
          MODERN<span className="text-muted-foreground">SHOP</span>
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          {/* SEARCH */}
          <button className="hidden md:block p-2 hover:bg-accent rounded-full">
            <Search className="w-5 h-5" />
          </button>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-2">

              <div className="hidden md:flex items-center gap-2 text-sm font-medium">
                <UserIcon className="w-4 h-4" />
                {user.name}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
              </Button>

            </div>
          ) : (
            <Link to="/auth">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}

          {/* CART */}
          <button
            onClick={onCartOpen}
            className="p-2 hover:bg-accent rounded-full relative"
          >
            <ShoppingBag className="w-5 h-5" />

            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-2 border-t bg-white">

          {/* HOME */}
          <Link
            to="/"
            className="flex items-center gap-3 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={16} />
            Home
          </Link>

          {/* USER ORDERS */}
          {user && !isAdmin && (
            <Link
              to="/my-orders"
              className="flex items-center gap-3 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardList size={16} />
              My Orders
            </Link>
          )}

          {/* ADMIN SECTION */}
          {isAdmin && (
            <>
              <p className="text-xs text-gray-400 mt-2">ADMIN</p>

              <Link
                to="/admin"
                className="flex items-center gap-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                className="flex items-center gap-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={16} />
                Products
              </Link>

              <Link
                to="/admin/categories"
                className="flex items-center gap-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Tags size={16} />
                Categories
              </Link>

              <Link
                to="/admin/orders"
                className="flex items-center gap-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart size={16} />
                Orders
              </Link>

              <Link
                to="/admin/promos"
                className="flex items-center gap-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <TicketPercent size={16} />
                Promo Codes
              </Link>
            </>
          )}

        </div>
      )}

    </nav>
  );
}