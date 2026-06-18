import logo from "../assets/favicon.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(rgba(5,10,25,0.92), rgba(10,15,35,0.95)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop') center/cover",
      }}
    >
      {/* Background overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-black/80" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-20">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/30 shadow-lg">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>

            <p className="text-gray-300 leading-7">
              Discover premium products carefully selected to provide quality,
              affordability, and an exceptional shopping experience for every customer.
            </p>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-blue-600 transition flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </div>

              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-pink-600 transition flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>

              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-sky-500 transition flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Shop Categories</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white">Electronics</a></li>
              <li><a href="#" className="hover:text-white">Fashion</a></li>
              <li><a href="#" className="hover:text-white">Home Decor</a></li>
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Customer Support</h3>
            <ul className="space-y-4 text-gray-300">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>

            <p className="text-gray-300 mb-6 leading-7">
              Subscribe to receive exclusive offers, new arrivals, and updates.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-gray-400 outline-none focus:border-blue-500"
              />

              <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ModernShop. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}