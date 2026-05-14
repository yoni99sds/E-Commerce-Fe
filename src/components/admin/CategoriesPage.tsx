import { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/categoriesApi";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";

export function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const save = async () => {
    if (!name.trim()) return;

    setLoading(true);

    try {
      if (editId) {
        const updated = await updateCategory(editId, name);

        setCategories((prev) =>
          prev.map((c) => (c._id === editId ? updated : c))
        );

        toast.success("Category updated");
      } else {
        const created = await createCategory(name);
        setCategories((prev) => [...prev, created]);

        toast.success("Category created");
      }

      setName("");
      setEditId(null);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c._id !== id));
    toast.success("Category deleted");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Categories
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage product categories for your store
        </p>
      </div>

      {/* CREATE / EDIT CARD */}
      <Card className="shadow-sm">
        <CardContent className="p-4 flex flex-col md:flex-row gap-3">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name..."
            className="flex-1"
          />

          <Button
            onClick={save}
            disabled={loading}
            className="md:w-32"
          >
            {editId ? "Update" : "Add"}
          </Button>

          {editId && (
            <Button
              variant="outline"
              onClick={() => {
                setName("");
                setEditId(null);
              }}
            >
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>

      {/* LIST */}
      <div className="grid gap-3">
        {categories.map((c) => (
          <Card
            key={c._id}
            className="hover:shadow-md transition-all"
          >
            <CardContent className="flex items-center justify-between p-4">

              {/* NAME */}
              <div className="font-medium">{c.name}</div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setName(c.name);
                    setEditId(c._id);
                  }}
                >
                  <Pencil className="w-4 h-4" />
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(c._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No categories found
        </div>
      )}

    </div>
  );
}