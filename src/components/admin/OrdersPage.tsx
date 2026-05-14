import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/orderApi";

import API from "../../api/axios";

import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import {
  Truck,
  CheckCircle,
  Trash2,
  PackageCheck,
} from "lucide-react";

import { toast } from "sonner";

/* ================= TYPES ================= */

type Product = {
  name?: string;
  imageUrl?: string;
  price?: number;
};

type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type OrderItem = {
  product?: Product;
  quantity?: number;
  priceAtPurchase?: number;
};

type Order = {
  _id: string;
  status: "pending" | "shipped" | "delivered";
  createdAt?: string;
  orderItems: OrderItem[];
  totalAmount?: number;
  shippingAddress?: ShippingAddress; // ✅ ADDED
};

/* ================= COMPONENT ================= */

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<
    "all" | "pending" | "shipped" | "delivered"
  >("all");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  /* ================= UPDATE STATUS ================= */

  const updateStatus = async (id: string, status: string) => {
    try {
      const updated = await updateOrderStatus(id, status);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                ...updated,
                orderItems:
                  updated.orderItems?.length
                    ? updated.orderItems
                    : order.orderItems,
              }
            : order
        )
      );

      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update order");
    }
  };

  /* ================= DELETE ================= */

  const deleteOrder = async (id: string) => {
    try {
      await API.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  /* ================= FILTER ================= */

  const filteredOrders = orders.filter((o) =>
    filter === "all" ? true : o.status === filter
  );

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Orders Management
          </h1>
          <p className="text-muted-foreground">
            Track and manage customer orders
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "shipped", "delivered"].map((tab) => (
            <Button
              key={tab}
              variant={filter === tab ? "default" : "outline"}
              className="capitalize rounded-full"
              onClick={() => setFilter(tab as any)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div className="space-y-5">

        {filteredOrders.length === 0 && (
          <Card className="p-10 text-center text-muted-foreground">
            No orders found
          </Card>
        )}

        {filteredOrders.map((order) => {
          const total =
            order.totalAmount ||
            order.orderItems?.reduce((acc, item) => {
              const price =
                item.priceAtPurchase ||
                item.product?.price ||
                0;

              return acc + price * (item.quantity || 1);
            }, 0);

          return (
            <Card key={order._id} className="p-5 space-y-5">

              {/* HEADER */}
              <div className="flex justify-between flex-wrap gap-3">

                <div>
                  <h3 className="font-bold">
                    Order #{order._id.slice(-6)}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "No date"}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap items-center">

                  <Badge
                    className="capitalize"
                    variant={
                      order.status === "pending"
                        ? "secondary"
                        : order.status === "shipped"
                        ? "default"
                        : "outline"
                    }
                  >
                    {order.status}
                  </Badge>

                  {order.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatus(order._id, "shipped")
                      }
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Ship
                    </Button>
                  )}

                  {order.status === "shipped" && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        updateStatus(order._id, "delivered")
                      }
                    >
                      <PackageCheck className="w-4 h-4 mr-2" />
                      Deliver
                    </Button>
                  )}

                  {order.status === "delivered" && (
                    <Button size="sm" disabled variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Delivered
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteOrder(order._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>

                </div>
              </div>

              {/* SHIPPING ADDRESS (NEW FEATURE) */}
              {order.shippingAddress && (
                <div className="bg-muted/40 border rounded-xl p-4 text-sm space-y-1">
                  <p className="font-semibold mb-2">
                    Delivery Address
                  </p>

                  <p>
                    <span className="text-muted-foreground">Address:</span>{" "}
                    {order.shippingAddress.address}
                  </p>

                  <p>
                    <span className="text-muted-foreground">City:</span>{" "}
                    {order.shippingAddress.city}
                  </p>

                  <p>
                    <span className="text-muted-foreground">Postal:</span>{" "}
                    {order.shippingAddress.postalCode}
                  </p>

                  <p>
                    <span className="text-muted-foreground">Country:</span>{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>
              )}

              {/* ITEMS */}
              <div className="space-y-3">

                {order.orderItems?.map((item, idx) => {
                  const product = item.product || {};

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 border rounded-xl p-3 bg-muted/30"
                    >

                      {/* IMAGE */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={
                            product.imageUrl ||
                            "https://placehold.co/100x100"
                          }
                          alt={product.name || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* INFO */}
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {product.name || "Product unavailable"}
                        </h4>

                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          $
                          {(
                            item.priceAtPurchase ||
                            product.price ||
                            0
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="font-bold">
                        $
                        {(
                          (item.priceAtPurchase ||
                            product.price ||
                            0) *
                          (item.quantity || 1)
                        ).toFixed(2)}
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* TOTAL */}
              <div className="flex justify-end border-t pt-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Order Total
                  </p>

                  <h3 className="text-2xl font-bold">
                    ${Number(total).toFixed(2)}
                  </h3>
                </div>
              </div>

            </Card>
          );
        })}
      </div>
    </div>
  );
}