import axios from "./axios.js";

//rutas sistema
export const verificarToken = async (token) => {
  try {
    const res = await axios.post("/verificar", { token });
    return res;
  } catch (error) {
    throw error.response.data;
  }
};
export const iniciarSesion = async (data) =>
  await axios.post(`/iniciar-sesion`, data);

//rutras productos
export const getProducts = async () => await axios.get(`/products`);

export const getProductById = async (id) => await axios.post(`/product/${id}`);

//rutas usuarios
export const getUsuarioById = async (id, token) => {
  try {
    const res = await axios.get(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    throw error;
  }
};

export const crearUsuario = async (data) => await axios.post(`/usuarios`, data);

export const crearUsuarioPorAdmin = async (data, token) => {
  try {
    const res = await axios.post("/AdminUsuarios", data, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
      },
    });
    return res;
  } catch (error) {
    throw new Error(error.response.data.mensaje);
  }
};

export const editarUsuario = async (data,id) => axios.put(`/usuarios/${id}`, data);

export const getUsuarios = async (token) => {
  try {
    const response = await axios.get("/usuarios", {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
      },
    });
    return response; // Devolver los datos de respuesta del backend
  } catch (error) {
    throw new Error(error.response.data.mensaje); // Manejar errores de manera adecuada
  }
};

export const deleteUsuario = async (token, id) => {
  try {
    const response = await axios.delete(`/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
      },
    });
    return response;
  } catch (error) {
    console.log("Error al eliminar el usuario:", error);
    throw error; // Re-lanzar el error para que el código que llama a esta función pueda manejarlo adecuadamente
  }
};

export const deleteUsuarios = async (ids, token) => {
  try {
    const response = await axios.delete(`/usuarios/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
      },
      data: { ids }, // Pasar los IDs de usuarios en el cuerpo de la solicitud
    });
    return response;
  } catch (error) {
    console.log("Error al eliminar usuarios:", error);
    throw error;
  }
};
