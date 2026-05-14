import API from "./axios";

export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const res = await API.post("/cart", {
    productId,
    quantity,
  });
  return res.data;
};

export const updateCartItem = async (
  productId: string,
  quantity: number
) => {
  const res = await API.put(`/cart/${productId}`, {
    quantity,
  });
  return res.data;
};

export const removeFromCart = async (productId: string) => {
  const res = await API.delete(`/cart/${productId}`);
  return res.data;
};

export const clearCart = async () => {
  const res = await API.delete("/cart");
  return res.data;
};