import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import API from "../api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;   
  stock: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  applyPromoCode: (code: string) => Promise<void>;
  appliedPromo: PromoCode | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${product.name} added to cart`);

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
    toast.success("Item removed");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

const applyPromoCode = async (code: string) => {
  const cleanCode = code?.trim();

  // ✅ allow empty = remove promo
  if (!cleanCode) {
    setAppliedPromo(null);
    toast.info("Promo removed");
    return;
  }

  try {
    const res = await API.post("/promocodes/validate", {
      code: cleanCode,
    });

    const promo = res.data;

    // 🔥 normalize backend → frontend format
    setAppliedPromo({
      code: promo.code,
      type: promo.discountType,
      discount:
        promo.discountType === "percentage"
          ? promo.discountValue
          : promo.discountValue,
    });

    toast.success("Promo code applied");
  } catch (err: any) {
    setAppliedPromo(null);

    toast.error(
      err?.response?.data?.message ||
        "Invalid promo code"
    );
  }
};
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? (subtotal * appliedPromo.discount) / 100
      : appliedPromo.discount
    : 0;

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        applyPromoCode,
        appliedPromo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};