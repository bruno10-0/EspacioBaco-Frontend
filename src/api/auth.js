import axios from "./axios.js";

export const getProducts = async () => await axios.get(`/products`);

export const getProductById = async (id) => await axios.post(`/product/${id}`);

export const crearUsuario = async (data) => await axios.post(`/usuarios`, data);

export const iniciarSesion = async (data) => await axios.post(`/iniciar-sesion`, data);

export const verificarToken = async (token) => {
  try {
    const res = await axios.post("/verificar", { token });
    return res;
  } catch (error) {
    throw error.response.data;
  }
};
