import axios from "axios";

export const fetchProducts = () => {
  return axios.get("/api/products").then(res => {
    return res.data;
  });
};

export const addProduct = ASIN => {
  return axios.post("/api/products", {
    ASIN
  });
};
