import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // ✅ FIXED
  category: any;
  stock: number;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
      
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition">
          <Heart className="w-4 h-4 hover:text-red-500" />
        </button>

        {/* Stock Badge */}
        {product.stock < 5 && (
          <Badge variant="destructive" className="absolute top-3 left-3">
            Low Stock
          </Badge>
        )}
      </div>

      {/* CONTENT */}
      <CardContent className="pt-4 px-3">
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          {product.category?.name || "Uncategorized"}
        </p>

        <h3 className="font-semibold text-base line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 h-10">
          {product.description}
        </p>
      </CardContent>

      {/* FOOTER */}
      <CardFooter className="px-3 pb-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold">
          ${product.price.toLocaleString()}
        </span>

        <Button
          size="sm"
          onClick={() => addToCart(product)}
          disabled={product.stock <= 0}
          className="rounded-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.stock <= 0 ? "Out" : "Add"}
        </Button>
      </CardFooter>
    </Card>
  );
}