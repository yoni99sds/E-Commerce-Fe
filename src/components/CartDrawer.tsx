import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "react-router-dom";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    discount,
    total,
  } = useCart();

  const { user } = useAuth();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">

        {/* HEADER (fixed height) */}
        <SheetHeader className="p-6 border-b shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* EMPTY STATE */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-3" />
            <h3 className="font-semibold">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start adding products
            </p>

            <Button onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* ITEMS - SCROLL FIXED */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-6 py-4">
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4">

                      {/* IMAGE */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">
                          {item.name}
                        </h4>

                        <p className="text-xs text-muted-foreground">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* QTY */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                          >
                            <Minus className="w-3 h-3" />
                          </Button>

                          <span>{item.quantity}</span>

                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {/* REMOVE */}
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* FOOTER - FIXED */}
            <div className="border-t p-6 space-y-3 shrink-0 bg-background">

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- ${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* CHECKOUT */}
              {user ? (
                <Link to="/checkout" onClick={() => onOpenChange(false)}>
                  <Button className="w-full mt-2">
                    Checkout
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button className="w-full mt-2">
                    Login to Checkout
                  </Button>
                </Link>
              )}

            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}