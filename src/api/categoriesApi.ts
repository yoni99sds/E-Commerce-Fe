import API from "./axios";

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const createCategory = async (name: string) => {
  const res = await API.post("/categories", { name });
  return res.data;
};

export const updateCategory = async (id: string, name: string) => {
  const res = await API.put(`/categories/${id}`, { name });
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data;
};