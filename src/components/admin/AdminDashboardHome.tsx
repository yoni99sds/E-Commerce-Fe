import { useEffect, useMemo, useState } from "react";
import {
  Package,
  ShoppingCart,
  FolderKanban,
  DollarSign,
  TrendingUp,
  Truck,
  Clock3,
  CheckCircle2,
  Tags,
} from "lucide-react";

import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import { getProducts } from "../../api/productApi";
import { getAllOrders } from "../../api/orderApi";
import { getCategories } from "../../api/categoriesApi";
import { getPromoCodes } from "../../api/promocodeApi";

export function AdminDashboardHome() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        productsData,
        ordersData,
        categoriesData,
        promosData,
      ] = await Promise.all([
        getProducts(),
        getAllOrders(),
        getCategories(),
        getPromoCodes(),
      ]);

      setProducts(productsData || []);
      setOrders(ordersData || []);
      setCategories(categoriesData || []);
      setPromos(promosData || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      CALCULATIONS
  ========================== */

  const totalRevenue = useMemo(() => {
    return orders.reduce(
      (acc, order) => acc + (order.totalAmount || 0),
      0
    );
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((o) => o.status === "pending");
  }, [orders]);

  const shippedOrders = useMemo(() => {
    return orders.filter((o) => o.status === "shipped");
  }, [orders]);

  const deliveredOrders = useMemo(() => {
    return orders.filter((o) => o.status === "delivered");
  }, [orders]);

  const lowStockProducts = useMemo(() => {
    return products.filter((p) => p.stock < 5);
  }, [products]);

  const latestOrders = useMemo(() => {
    return [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [orders]);

  if (loading) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10 padding-20px 0 0 0">

      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-black via-zinc-900 to-zinc-800 p-8 text-white">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Admin Dashboard
            </h1>

            <p className="text-white/70 mt-2 max-w-2xl">
              Monitor products, orders, revenue, inventory,
              deliveries, and store performance in real time.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">

            <Badge className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/20">
              {orders.length} Orders
            </Badge>

            <Badge className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/20">
              {products.length} Products
            </Badge>

            <Badge className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/20">
              ${totalRevenue.toFixed(2)} Revenue
            </Badge>

          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* PRODUCTS */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/70 text-sm">
                  Total Products
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {products.length}
                </h2>

                <p className="text-sm mt-2 text-white/80">
                  Active store inventory
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <Package className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ORDERS */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/70 text-sm">
                  Total Orders
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {orders.length}
                </h2>

                <p className="text-sm mt-2 text-white/80">
                  Customer purchases
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CATEGORIES */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/70 text-sm">
                  Categories
                </p>

                <h2 className="text-4xl font-black mt-2">
                  {categories.length}
                </h2>

                <p className="text-sm mt-2 text-white/80">
                  Product collections
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <FolderKanban className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* REVENUE */}
        <Card className="border-0 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-white/70 text-sm">
                  Revenue
                </p>

                <h2 className="text-4xl font-black mt-2">
                  ${totalRevenue.toFixed(0)}
                </h2>

                <p className="text-sm mt-2 text-white/80">
                  Total earnings
                </p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <DollarSign className="w-8 h-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ORDER STATUS */}
        <Card className="rounded-3xl shadow-lg border-0">
          <CardContent className="p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">
                  Order Status
                </h3>

                <p className="text-sm text-muted-foreground">
                  Shipment overview
                </p>
              </div>

              <TrendingUp className="w-6 h-6 text-primary" />
            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Clock3 className="w-6 h-6 text-yellow-700" />
                  </div>

                  <div>
                    <p className="font-semibold">Pending</p>
                    <p className="text-xs text-muted-foreground">
                      Awaiting approval
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-black">
                  {pendingOrders.length}
                </h2>
              </div>

              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-blue-700" />
                  </div>

                  <div>
                    <p className="font-semibold">Shipped</p>
                    <p className="text-xs text-muted-foreground">
                      On delivery
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-black">
                  {shippedOrders.length}
                </h2>
              </div>

              <div className="flex items-center justify-between bg-green-50 border border-green-200 p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-700" />
                  </div>

                  <div>
                    <p className="font-semibold">Delivered</p>
                    <p className="text-xs text-muted-foreground">
                      Completed orders
                    </p>
                  </div>
                </div>

                <h2 className="text-2xl font-black">
                  {deliveredOrders.length}
                </h2>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* LOW STOCK */}
        <Card className="rounded-3xl shadow-lg border-0">
          <CardContent className="p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">
                  Low Stock Products
                </h3>

                <p className="text-sm text-muted-foreground">
                  Products running low
                </p>
              </div>

              <Package className="w-6 h-6 text-red-500" />
            </div>

            <div className="space-y-4">

              {lowStockProducts.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-10">
                  No low stock products 🎉
                </div>
              ) : (
                lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 p-3 rounded-2xl border bg-muted/30"
                  >

                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted">
                      <img
                        src={
                          product.image ||
                          product.imageUrl
                        }
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-sm line-clamp-1">
                        {product.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        ${product.price}
                      </p>
                    </div>

                    <Badge variant="destructive">
                      {product.stock} left
                    </Badge>
                  </div>
                ))
              )}

            </div>
          </CardContent>
        </Card>

        {/* PROMO CODES */}
        <Card className="rounded-3xl shadow-lg border-0">
          <CardContent className="p-6">

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold">
                  Promo Codes
                </h3>

                <p className="text-sm text-muted-foreground">
                  Marketing campaigns
                </p>
              </div>

              <Tags className="w-6 h-6 text-pink-500" />
            </div>

            <div className="space-y-3">

              {promos.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-10">
                  No promo codes yet
                </div>
              ) : (
                promos.slice(0, 5).map((promo) => (
                  <div
                    key={promo._id}
                    className="flex items-center justify-between p-4 rounded-2xl border bg-muted/20"
                  >

                    <div>
                      <p className="font-bold tracking-wide">
                        {promo.code}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {promo.discountType === "percentage"
                          ? `${promo.discountValue}% OFF`
                          : `$${promo.discountValue} OFF`}
                      </p>
                    </div>

                    <Badge
                      variant={
                        promo.isActive
                          ? "default"
                          : "secondary"
                      }
                    >
                      {promo.isActive
                        ? "Active"
                        : "Inactive"}
                    </Badge>

                  </div>
                ))
              )}

            </div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ORDERS */}
     {/* RECENT ORDERS */}
<Card className="rounded-3xl shadow-lg border-0 overflow-hidden">
  <CardContent className="p-0">

    <div className="p-6 border-b">
      <h3 className="text-2xl font-bold">
        Recent Orders
      </h3>

      <p className="text-sm text-muted-foreground">
        Latest customer purchases
      </p>
    </div>

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-muted/40">
          <tr className="text-left">
            <th className="p-4 text-sm font-semibold">Order ID</th>
            <th className="p-4 text-sm font-semibold">Products</th>
            <th className="p-4 text-sm font-semibold">Status</th>
            <th className="p-4 text-sm font-semibold">Total</th>
            <th className="p-4 text-sm font-semibold">Date</th>
          </tr>
        </thead>

        <tbody>

          {latestOrders.map((order) => (
            <tr
              key={order._id}
              className="border-t hover:bg-muted/20 transition-colors"
            >

              {/* ORDER ID */}
              <td className="p-4 font-medium text-sm">
                #{order._id.slice(-6)}
              </td>

              {/* PRODUCTS IMAGES */}
              <td className="p-4">
                <div className="flex -space-x-2">

                  {order.orderItems
                    ?.slice(0, 3)
                    .map((item: any, idx: number) => {
                      
                      const product = item.product;

                      return (
                        <div
                          key={idx}
                          className="w-10 h-10 rounded-full overflow-hidden border-2 border-background bg-muted"
                        >
                          <img
                            src={
                              product?.image ||
                              product?.imageUrl ||
                              "https://placehold.co/100x100"
                            }
                            alt={product?.name || "product"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      );
                    })}
                </div>
              </td>

              {/* STATUS */}
              <td className="p-4">
                <Badge
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
              </td>

              {/* TOTAL */}
              <td className="p-4 font-bold">
                ${order.totalAmount}
              </td>

              {/* DATE */}
              <td className="p-4 text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  </CardContent>
</Card>

    </div>
  );
}