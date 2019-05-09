import axios from "axios";

export const fetchProducts = async () => {
  return (await axios.get("/api/products")).data;
};

export const addProduct = async ASIN => {
  return (await axios.post("/api/products", {
    ASIN
  })).data;
};

export const deleteProduct = async ASIN => {
  return (await axios.delete(`/api/products/${ASIN}`)).data;
};
