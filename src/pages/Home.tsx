import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoriesApi";
import { Button } from "../components/ui/button";
import { aboutSections, features } from "../lib/mockData";
import {
  Truck,
  ShieldCheck,
  BadgeCheck,
  Headphones,
} from "lucide-react";

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
const iconMap = {
  truck: Truck,
  shield: ShieldCheck,
  badge: BadgeCheck,
  support: Headphones,
};
  return (
    <div className="pt-16">
      {/* HERO */}
      <Hero />

      {/* CATEGORY NAV */}
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

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center">No products found</p>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center mb-8">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    _id: product._id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    category: product.category?.name,
                    stock: product.stock,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
{/* ABOUT SECTION */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4">

    {/* FIRST ABOUT ROW */}
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div>
        <img
          src={aboutSections[0].image}
          alt={aboutSections[0].title}
          className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
        />
      </div>

      <div>
        <p className="text-primary font-semibold uppercase tracking-widest mb-3">
          {aboutSections[0].label}
        </p>

        <h2 className="text-4xl font-bold mb-6">
          {aboutSections[0].title}
        </h2>

        <p className="text-gray-600 leading-8 mb-6">
          {aboutSections[0].description}
        </p>

        <Button variant={aboutSections[0].buttonVariant as any} size="lg">
          {aboutSections[0].buttonText}
        </Button>
      </div>

    </div>

    {/* WHY CHOOSE US */}
    <section className="bg-gray-50 py-20 my-20 rounded-3xl">
      <div className="text-center mb-14">

        <h2 className="text-4xl font-bold mb-4">
          Why Shop With Us?
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto">
          We are committed to providing premium quality products,
          secure transactions, and outstanding customer service.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon as keyof typeof iconMap];

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-xl transition"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-black text-white flex items-center justify-center mb-5">
                <Icon size={28} />
              </div>

              <h3 className="font-semibold text-xl mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-500">
                {feature.description}
              </p>
            </div>
          );
        })}

      </div>
    </section>

    {/* SECOND ABOUT ROW */}
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div>
        <p className="text-primary font-semibold uppercase tracking-widest mb-3">
          {aboutSections[1].label}
        </p>

        <h2 className="text-4xl font-bold mb-6">
          {aboutSections[1].title}
        </h2>

        <p className="text-gray-600 leading-8 mb-6">
          {aboutSections[1].description}
        </p>

        <Button variant={aboutSections[1].buttonVariant as any} size="lg">
          {aboutSections[1].buttonText}
        </Button>
      </div>

      <div>
        <img
          src={aboutSections[1].image}
          alt={aboutSections[1].title}
          className="rounded-3xl shadow-xl w-full h-[450px] object-cover"
        />
      </div>

    </div>

  </div>
</section>
      {/* FOOTER */}
      <Footer />
    </div>
  );
}