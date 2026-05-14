import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";

import { getCategories } from "../../api/categoriesApi";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

interface ProductForm {
  name: string;
  description: string;
  price: number;
  image: File | null;
  category: string;
  stock: number;
}

export function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    stock: 0,
  });

  const [preview, setPreview] = useState<string>("");

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

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleImage = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: 0,
      image: null,
      category: "",
      stock: 0,
    });
    setPreview("");
    setEditingId(null);
  };

  const submit = async () => {
    try {
      const formData = new FormData();

      formData.append("name", form.name || "");
      formData.append("description", form.description || "");
      formData.append("price", String(form.price || 0));
      formData.append("category", form.category || "");
      formData.append("stock", String(form.stock || 0));

      // only send image if selected
      if (form.image) {
        formData.append("image", form.image);
      }

      if (editingId) {
        const updated = await updateProduct(editingId, formData);

        setProducts((prev) =>
          prev.map((p) =>
            p._id === editingId ? updated : p
          )
        );

        toast.success("Product updated");
      } else {
        const created = await createProduct(formData);
        setProducts((prev) => [created, ...prev]);

        toast.success("Product created");
      }

      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error saving product");
    }
  };

  const remove = async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
    toast.success("Deleted");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ET", {
      style: "currency",
      currency: "ETB",
    }).format(price);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
      </div>

      {/* FORM */}
      <div className="bg-white p-5 rounded-xl shadow space-y-5">

        <h3 className="font-semibold text-lg">
          {editingId ? "Edit Product" : "Add New Product"}
        </h3>

        <div className="grid grid-cols-2 gap-4">

          {/* NAME */}
          <div>
            <label>Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* PRICE */}
          <div>
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* STOCK */}
          <div>
            <label>Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Category</option>
              {categories.map((c: any) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE (FIXED UI) */}
          <div className="col-span-2">
            <label className="font-medium">Product Image</label>

            <div className="flex items-center gap-3 mt-2">

              {/* UPLOAD BUTTON UI (RESTORED) */}
              <label className="bg-black text-white px-4 py-2 rounded cursor-pointer text-sm">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {form.image && (
                <span className="text-sm text-gray-600">
                  {form.image.name}
                </span>
              )}
            </div>

            {/* PREVIEW */}
            {preview && (
              <img
                src={preview}
                className="w-24 h-24 mt-3 object-cover rounded border"
              />
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 rounded w-full h-24"
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-black text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-200 px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b">

                <td className="p-3">
                  <img
                    src={p.imageUrl}
                    className="w-10 h-10 rounded object-cover"
                  />
                </td>

                <td>{p.name}</td>

                <td>{formatPrice(p.price)}</td>

                <td>{p.stock}</td>

                <td className="flex gap-2">

                  <button
                    onClick={() => {
                      setForm({
                        name: p.name || "",
                        description: p.description || "",
                        price: p.price || 0,
                        image: null,
                        category:
                          typeof p.category === "object"
                            ? p.category._id
                            : p.category,
                        stock: p.stock || 0,
                      });

                      setPreview(p.imageUrl);
                      setEditingId(p._id);
                    }}
                  >
                    <Pencil size={16} />
                  </button>

                  <button onClick={() => remove(p._id)}>
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}