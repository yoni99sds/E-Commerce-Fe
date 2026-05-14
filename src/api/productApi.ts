import API from "./axios";

// GET ALL
export const getProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

// CREATE WITH IMAGE
export const createProduct = async (data: any) => {
  const res = await API.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await API.put(`/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// DELETE
export const deleteProduct = async (id: string) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};