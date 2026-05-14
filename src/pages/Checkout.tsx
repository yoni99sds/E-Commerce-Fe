import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";

import { Separator } from "../components/ui/separator";

import {
  Truck,
  CheckCircle2,
  TicketPercent,
} from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { createOrder } from "../api/orderApi";

export function CheckoutPage() {

  const {
    cart,
    subtotal,
    total,
    discount,
    clearCart,
    applyPromoCode,
    appliedPromo,
  } = useCart();

  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [ordered, setOrdered] =
    useState(false);

  const [promoCode, setPromoCode] =
    useState("");

  const [address, setAddress] =
    useState({
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });

  // 🚫 BLOCK ADMINS
  if (isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-8 py-6 rounded-2xl text-xl font-bold shadow-sm">
          Admin accounts cannot place orders
        </div>
      </div>
    );
  }

  // 🚫 EMPTY CART
  if (cart.length === 0 && !ordered) {
    navigate("/my-orders");
    return null;
  }

  // PLACE ORDER
  const placeOrder = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const orderData = {
      shippingAddress: {
        address: address.address.trim(),
        city: address.city.trim(),
        postalCode: address.postalCode.trim(),
        country: address.country.trim(),
      },

      orderItems: cart.map((item) => ({
        productId: item._id, // must be real product id
        quantity: item.quantity,
      })),

      totalAmount: total,
    };

    const res = await createOrder(orderData);

    clearCart();

    toast.success("Order placed successfully!");

    // ✅ REDIRECT TO ORDERS PAGE
    navigate("/orders", {
      state: { newOrderId: res._id },
    });
  } catch (err: any) {
    console.log(err?.response?.data || err);

    toast.error(
      err?.response?.data?.message ||
        "Failed to place order"
    );
  } finally {
    setLoading(false);
  }
};
  // SUCCESS PAGE
  if (ordered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">

        <div className="bg-white border shadow-xl rounded-3xl p-10 text-center max-w-md w-full">

          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mt-6">
            Order Successful
          </h1>

          <p className="text-muted-foreground mt-2">
            Your order has been placed successfully.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="mt-6 w-full h-12 rounded-xl"
          >
            Continue Shopping
          </Button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-28 pb-16 px-4">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* SHIPPING FORM */}
        <div className="lg:col-span-2">

          <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">

            <CardHeader className="border-b bg-gradient-to-r from-black to-zinc-800 text-white">

              <CardTitle className="flex items-center gap-2 text-2xl">
                <Truck className="w-6 h-6" />
                Shipping Address
              </CardTitle>

            </CardHeader>

            <CardContent className="p-8">

              <form
                id="order-form"
                onSubmit={placeOrder}
                className="space-y-5"
              >

                <div className="grid md:grid-cols-2 gap-5">

                  <Input
                    placeholder="Full Address"
                    required
                    value={address.address}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        address:
                          e.target.value,
                      })
                    }
                    className="h-12 rounded-xl"
                  />

                  <Input
                    placeholder="City"
                    required
                    value={address.city}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        city:
                          e.target.value,
                      })
                    }
                    className="h-12 rounded-xl"
                  />

                  <Input
                    placeholder="Postal Code"
                    required
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        postalCode:
                          e.target.value,
                      })
                    }
                    className="h-12 rounded-xl"
                  />

                  <Input
                    placeholder="Country"
                    required
                    value={address.country}
                    onChange={(e) =>
                      setAddress({
                        ...address,
                        country:
                          e.target.value,
                      })
                    }
                    className="h-12 rounded-xl"
                  />

                </div>

              </form>

            </CardContent>

          </Card>

        </div>

        {/* ORDER SUMMARY */}
        <Card className="border-0 shadow-xl rounded-3xl h-fit sticky top-28">

          <CardHeader className="border-b">

            <CardTitle className="text-2xl">
              Order Summary
            </CardTitle>

          </CardHeader>

          <CardContent className="p-6 space-y-5">

            {/* ITEMS */}
            <div className="space-y-4">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3"
                >

                  <div className="flex items-center gap-3">

                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted border">

                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <div>

                      <p className="font-medium text-sm">
                        {item.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>

                    </div>

                  </div>

                  <p className="font-semibold text-sm">
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}
            </div>

            {/* PROMO */}
            <div className="border rounded-2xl p-4 bg-muted/30 space-y-3">

              <div className="flex items-center gap-2">

                <TicketPercent className="w-5 h-5 text-primary" />

                <p className="font-semibold">
                  Promo Code
                </p>

              </div>

              <div className="flex gap-2">

                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) =>
                    setPromoCode(
                      e.target.value
                    )
                  }
                  className="rounded-xl"
                />

                <Button
                  type="button"
                  variant="secondary"
                  className="rounded-xl"
                  onClick={() =>
                    applyPromoCode(
                      promoCode
                    )
                  }
                >
                  Apply
                </Button>

              </div>

              {appliedPromo && (
                <div className="bg-green-100 text-green-700 px-3 py-2 rounded-xl text-sm font-medium">

                  Promo "
                  {appliedPromo.code}"
                  applied successfully

                </div>
              )}

            </div>

            <Separator />

            {/* TOTALS */}
            <div className="space-y-3">

              <div className="flex justify-between text-sm">

                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>
                  $
                  {subtotal.toFixed(2)}
                </span>

              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 font-medium">

                  <span>Discount</span>

                  <span>
                    - $
                    {discount.toFixed(
                      2
                    )}
                  </span>

                </div>
              )}

              <div className="flex justify-between text-xl font-bold pt-4 border-t">

                <span>Total</span>

                <span>
                  ${total.toFixed(2)}
                </span>

              </div>

            </div>

          </CardContent>

          <CardFooter className="p-6 pt-0">

            <Button
              form="order-form"
              className="w-full h-14 text-lg rounded-2xl font-semibold"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : `Pay $${total.toFixed(
                    2
                  )}`}
            </Button>

          </CardFooter>

        </Card>

      </div>
    </div>
  );
}