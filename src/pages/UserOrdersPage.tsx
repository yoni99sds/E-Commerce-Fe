import { useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";

type Order = {
  _id: string;
  status: "pending" | "shipped" | "delivered";
  createdAt: string;
  totalAmount: number;
  orderItems: any[];
};

export function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data || []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "shipped":
        return "default";
      case "delivered":
        return "outline";
      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">
          Track your order status in real time
        </p>
      </div>

      <div className="space-y-4">

        {orders.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No orders found
          </p>
        )}

        {orders.map((order) => (
          <Card key={order._id} className="p-5 space-y-4">

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <Badge variant={statusColor(order.status) as any}>
                {order.status}
              </Badge>
            </div>

            <Separator />

            {/* ITEMS */}
            <div className="space-y-4">

              {order.orderItems?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >

                  {/* IMAGE */}
                  <div className="w-12 h-12 rounded overflow-hidden bg-muted border">
                    <img
                      src={item.product?.imageUrl || "/placeholder.png"}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* NAME */}
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  {/* PRICE */}
                  <p className="text-sm font-semibold">
                    $
                    {(
                      item.priceAtPurchase * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            <Separator />

            {/* TOTAL */}
            <div className="flex justify-end font-bold">
              Total: ${order.totalAmount.toFixed(2)}
            </div>

          </Card>
        ))}
      </div>
    </div>
  );
}