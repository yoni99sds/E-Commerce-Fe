import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import { Toaster } from "./components/ui/sonner";

// PUBLIC PAGES
import { HomePage } from "./pages/Home";
import { AuthPage } from "./pages/Auth";
import { CheckoutPage } from "./pages/Checkout";

// ADMIN LAYOUT
import { AdminLayout } from "./components/admin/AdminLayout";

// ADMIN PAGES
import { AdminDashboardHome } from "./components/admin/AdminDashboardHome";
import { ProductsPage } from "./components/admin/ProductsPage";
import { CategoriesPage } from "./components/admin/CategoriesPage";
import { OrdersPage } from "./components/admin/OrdersPage";
import { PromoCodesPage } from "./components/admin/PromoCodesPage";
import { UserOrdersPage } from "./pages/UserOrdersPage";
function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-background">

            {/* NAVBAR ONLY FOR PUBLIC AREA */}
            <Navbar onCartOpen={() => setIsCartOpen(true)} />

            <CartDrawer
              open={isCartOpen}
              onOpenChange={setIsCartOpen}
            />

            <main>

              <Routes>

                {/* ================= PUBLIC ROUTES ================= */}
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />

                {/* ================= ADMIN ROUTES ================= */}
                <Route
                  path="/admin"
                  element={
                    <AdminLayout>
                      <AdminDashboardHome />
                    </AdminLayout>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <AdminLayout>
                      <ProductsPage />
                    </AdminLayout>
                  }
                />

                <Route
                  path="/admin/categories"
                  element={
                    <AdminLayout>
                      <CategoriesPage />
                    </AdminLayout>
                  }
                />

                <Route
                  path="/admin/orders"
                  element={
                    <AdminLayout>
                      <OrdersPage />
                    </AdminLayout>
                  }
                />

                <Route
                  path="/admin/promos"
                  element={
                    <AdminLayout>
                      <PromoCodesPage />
                    </AdminLayout>
                  }
                />
                <Route 
                path="/my-orders" 
                element={
                <UserOrdersPage />
                } 
                />

              </Routes>
            
               
            </main>

            <Toaster position="top-center" />

          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;