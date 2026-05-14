import {
  ShoppingBag,
  Search,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
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
    navigate("/"); // force home redirect
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>

          {/* 👇 ONLY USERS SEE ORDERS */}
          {user && !isAdmin && (
            <Link
              to="/my-orders"
              className="text-sm font-medium hover:text-primary"
            >
              My Orders
            </Link>
          )}

        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 md:gap-4">

          <button className="p-2 hover:bg-accent rounded-full hidden md:block">
            <Search className="w-5 h-5" />
          </button>

          {/* USER */}
          {user ? (
            <div className="flex items-center gap-3">

              {/* ADMIN ONLY */}
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              )}

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

          {/* MOBILE */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-4">

          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          {user && !isAdmin && (
            <Link to="/my-orders" onClick={() => setIsMenuOpen(false)}>
              My Orders
            </Link>
          )}

          {isAdmin && (
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              Admin Dashboard
            </Link>
          )}

        </div>
      )}

    </nav>
  );
}