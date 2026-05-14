import { useEffect, useState } from "react";

import {
  getPromoCodes,
  createPromoCode,
  deletePromoCode,
  updatePromoCode,
} from "../../api/promocodeApi";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

import {
  Plus,
  Pencil,
  Trash2,
  TicketPercent,
  Save,
  X,
} from "lucide-react";

import { toast } from "sonner";

type Promo = {
  _id: string;
  code: string;
  discount: number;
  type?: "percentage" | "fixed";
  isActive?: boolean;
  expiryDate?: string;
};

export function PromoCodesPage() {
  const [promos, setPromos] = useState<Promo[]>([]);

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const [editId, setEditId] = useState<string | null>(
    null
  );

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const data = await getPromoCodes();
      setPromos(data);
    } catch (err) {
      toast.error("Failed to load promo codes");
    }
  };

  // CREATE / UPDATE
  const savePromo = async () => {
    if (!code || !discount || !expiryDate) {
      toast.error("Fill all fields");
      return;
    }

    try {
      if (editId) {
        const updated = await updatePromoCode(
          editId,
          {
            code,
            discount: Number(discount),
            expiryDate,
          }
        );

        setPromos((prev) =>
          prev.map((p) =>
            p._id === editId ? updated : p
          )
        );

        toast.success("Promo updated");
      } else {
        const created = await createPromoCode({
          code,
        discountValue: Number(discount),
        discountType: "percentage",
        expiryDate,
        isActive: true, 
        });

        setPromos([created, ...promos]);

        toast.success("Promo created");
      }

      resetForm();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  // DELETE
  const removePromo = async (id: string) => {
    try {
      await deletePromoCode(id);

      setPromos((prev) =>
        prev.filter((p) => p._id !== id)
      );

      toast.success("Promo deleted");
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // EDIT
  const editPromo = (promo: Promo) => {
    setEditId(promo._id);
    setCode(promo.code);
    setDiscount(String(promo.discount));

    setExpiryDate(
      promo.expiryDate
        ? promo.expiryDate.split("T")[0]
        : ""
    );
  };

  const resetForm = () => {
    setEditId(null);
    setCode("");
    setDiscount("");
    setExpiryDate("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Promo Codes
          </h1>

          <p className="text-muted-foreground">
            Create and manage discounts
          </p>
        </div>

        <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-xl">
          <TicketPercent className="w-5 h-5 text-primary" />

          <span className="font-medium">
            {promos.length} Promo Codes
          </span>
        </div>
      </div>

      {/* FORM */}
      <Card className="p-6 shadow-sm border">

        <div className="grid md:grid-cols-4 gap-4">

          <Input
            placeholder="Promo Code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.toUpperCase())
            }
          />

          <Input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) =>
              setDiscount(e.target.value)
            }
          />

          <Input
            type="date"
            value={expiryDate}
            onChange={(e) =>
              setExpiryDate(e.target.value)
            }
          />

          <div className="flex gap-2">

            <Button
              onClick={savePromo}
              className="flex-1"
            >
              {editId ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </>
              )}
            </Button>

            {editId && (
              <Button
                variant="outline"
                onClick={resetForm}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* PROMOS */}
      <div className="grid gap-4">

        {promos.length === 0 && (
          <Card className="p-10 text-center">
            <p className="text-muted-foreground">
              No promo codes found
            </p>
          </Card>
        )}

        {promos.map((promo) => {

          const expired =
            promo.expiryDate &&
            new Date(promo.expiryDate) <
              new Date();

          return (
            <Card
              key={promo._id}
              className="p-5 hover:shadow-md transition-all border"
            >

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* LEFT */}
                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <TicketPercent className="w-7 h-7 text-primary" />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold tracking-wide">
                      {promo.code}
                    </h3>

                    <div className="flex items-center gap-2 mt-1">

                      <Badge>
                        {promo.discount}% OFF
                      </Badge>

                      {expired ? (
                        <Badge variant="destructive">
                          Expired
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                        >
                          Active
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-2">
                      Expires:{" "}
                      {promo.expiryDate
                        ? new Date(
                            promo.expiryDate
                          ).toLocaleDateString()
                        : "No expiry"}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">

                  <Button
                    variant="outline"
                    onClick={() =>
                      editPromo(promo)
                    }
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() =>
                      removePromo(promo._id)
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}