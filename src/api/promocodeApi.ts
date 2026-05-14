import API from "./axios";

export const validatePromoCode = async (
  code: string
) => {
  const res = await API.post(
    "/promocodes/validate",
    {
      code,
    }
  );

  return res.data;
};

export const createPromoCode = async (
  data: any
) => {
  const res = await API.post(
    "/promocodes",
    data
  );

  return res.data;
};

export const getPromoCodes = async () => {
  const res = await API.get("/promocodes");
  return res.data;
};

export const deletePromoCode = async (
  id: string
) => {
  const res = await API.delete(
    `/promocodes/${id}`
  );

  return res.data;
};

// ✅ UPDATE PROMO
export const updatePromoCode = async (
  id: string,
  data: any
) => {
  const res = await API.put(
    `/promocodes/${id}`,
    data
  );

  return res.data;
};