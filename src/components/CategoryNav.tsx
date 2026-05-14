import { cn } from "../lib/utils";

interface Category {
  _id?: string;
  id?: string;
  name: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryNav({
  categories,
  activeCategory,
  onSelect,
}: CategoryNavProps) {
  return (
    <div className="py-8 bg-background border-b overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex gap-4">
        {/* All Products */}
        <button
          onClick={() => onSelect("All")}
          className={cn(
            "px-6 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-medium",
            activeCategory === "All"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-accent"
          )}
        >
          All Products
        </button>

        {/* Dynamic Categories */}
        {categories.map((cat) => (
          <button
            key={cat._id || cat.id}
            onClick={() => onSelect(cat.name)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all whitespace-nowrap text-sm font-medium",
              activeCategory === cat.name
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-accent"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}