import axios from "./axios.js";

export const getProducts = async () => await axios.get(`/products`);

export const getProductById = async (id) => await axios.post(`/product/${id}`);

export const crearUsuario = async (data) => await axios.post(`/usuarios`, data);

export const iniciarSesion = async (data) =>
  await axios.post(`/iniciar-sesion`, data);

export const verificarToken = async (token) => {
  try {
    const res = await axios.post("/verificar", { token });
    return res;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUsuarios = async (token) => {
  try {
    const response = await axios.get('/usuarios', {
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
      },
    });
    return response; // Devolver los datos de respuesta del backend
  } catch (error) {
    throw new Error(error.response.data.mensaje); // Manejar errores de manera adecuada
  }
};
