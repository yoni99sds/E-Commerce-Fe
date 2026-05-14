import API from "./axios";

export const createOrder = async (orderData: any) => {
  const res = await API.post("/orders", orderData);
  return res.data;
};

export const getUserOrders = async () => {
  const res = await API.get("/orders/my");
  return res.data;
};

export const getAllOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const res = await API.put(`/orders/${id}`, { status });
  return res.data;
};