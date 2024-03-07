import axios from "axios";

const API = "https://espaciobacobackend.onrender.com";

export const getProducts = async () => await axios.get(`${API}/products`);

export const getProductById = async (id) => await axios.post(`${API}/product/${id}`);
