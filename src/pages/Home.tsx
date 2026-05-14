import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoriesApi";
import { Button } from "../components/ui/button";

export function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [p, c] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      setProducts(p);
      setFiltered(p);
      setCategories(c);
    } finally {
      setLoading(false);
    }
  };

  const filterCategory = (category: string) => {
    setActiveCategory(category);

    if (category === "All") {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter(
          (p) => p.category?.name === category
        )
      );
    }
  };

  return (
    <div className="pt-16">

      {/* HERO */}
      <Hero />

      {/* CATEGORY NAV (DYNAMIC) */}
      <div className="flex gap-2 flex-wrap justify-center p-4 border-b bg-background sticky top-16 z-10">
        <Button
          variant={activeCategory === "All" ? "default" : "outline"}
          onClick={() => filterCategory("All")}
        >
          All
        </Button>

        {categories.map((c: any) => (
          <Button
            key={c._id}
            variant={activeCategory === c.name ? "default" : "outline"}
            onClick={() => filterCategory(c.name)}
          >
            {c.name}
          </Button>
        ))}
      </div>

      {/* PRODUCTS GRID (USES YOUR PRODUCTCARD COMPONENT) */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  _id: product._id,
                  name: product.name,
                  description: product.description,
                  price: product.price,
                  imageUrl: product.imageUrl, // IMPORTANT FIX
                  category: product.category?.name,
                  stock: product.stock,
                }}
              />
            ))}

          </div>
        )}

      </div>

      {/* FOOTER (YOUR EXISTING ONE) */}
      <Footer />

    </div>
  );
}