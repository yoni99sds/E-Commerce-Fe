import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productApi";

import { getCategories } from "../api/categoriesApi";

import { toast } from "sonner";

export function AdminPage() {
  const { isAdmin } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editing, setEditing] = useState<any>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [p, c] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);

    setProducts(p);
    setCategories(c);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);

    setProducts((prev) =>
      prev.filter((p: any) => p._id !== id)
    );

    toast.success("Deleted");
  };

  const handleSave = async (data: any) => {
    if (editing) {
      const updated = await updateProduct(
        editing._id,
        data
      );

      setProducts((prev) =>
        prev.map((p: any) =>
          p._id === editing._id ? updated : p
        )
      );
    } else {
      const created = await createProduct(data);
      setProducts((prev) => [...prev, created]);
    }
  };

  if (!isAdmin) return <div>Access Denied</div>;

  return (
    <div className="p-6">
      <h1>Admin</h1>

      {products.map((p: any) => (
        <div key={p._id}>
          {p.name}
          <button
            onClick={() => handleDelete(p._id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}