export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tighter">MODERN<span className="text-muted-foreground">SHOP</span></h3>
          <p className="text-sm text-muted-foreground">
            The ultimate destination for modern shopping. Curated collections for your lifestyle.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Electronics</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Fashion</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Home Decor</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers and updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 px-3 py-2 rounded-md border bg-muted/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} ModernShop Inc. All rights reserved.
      </div>
    </footer>
  );
}