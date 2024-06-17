import axios from "./axios.js";

//region SISTEMA
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

//region CARRITO DE COMPRAS

export const verificarCarrito = async (token) =>
  await axios.post("/carrito", { token });

export const actualizarCarrito = async (token, productos) =>
  await axios.put("/carrito", { token, productos });

export const vaciarCarrito = async (token) => {
  try {
    const res = await axios.delete("/carrito", { data: { token } });
    //  console.log("Carrito vaciado correctamente");
    return res;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
  }
};

//region PRODOUCTOS

export const getProducts = async () => await axios.get(`/products`);

export const getProductById = async (id, token) => {
  try {
    const res = await axios.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error buscar un producto por ID:", error);
    throw error;
  }
};

export const postProduct = async (token, data) => {
  try {
    const res = await axios.post("/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(response.data.mensaje);
  }
};

export const deleteProductById = async (token, id) => {
  try {
    const res = await axios.delete(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al eliminar un usuario por ID:", error);
    throw error;
  }
};

export const deleteProducts = async (token, ids) => {
  try {
    const response = await axios.delete(`/products/`, {
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

export const putProduct = async (token, data, id) => {
  try {
    const res = await axios.put(`/product/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al eliminar un usuario por ID:", error);
    throw error;
  }
};

//region USUARIOS

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

export const editarUsuario = async (data, id) =>
  axios.put(`/usuarios/${id}`, data);

export const editMyUser = async (data) =>
  axios.put("/usuario", data);


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

//region PUBLICACIONES

export const getPublicaciones = async () => {
  return await axios.get("/publicacion");
};

export const postPublicacion = async (values) => {
  return await axios.post("/publicacion", values);
};

export const deletePublicacion = async (id) => {
  return await axios.delete(`/publicacion/${id}`);
};

//region ORDENES

export const getOrdenes = async () => {
  return await axios.get("/orden");
};

export const getOrdenesbyId = async (id) => {
  return await axios.get(`/orden/${id}`);
};

export const getOrdenesbyIdUser = async (value) => {
  const requestData = value.id ? { id: value.id } : { token: value.token }; // Si se proporciona id, enviar solo id, de lo contrario, enviar solo token
  return await axios.post("/ordenById", requestData);
};

export const createOrder = async (values) => {
  return await axios.post("/orden", values);
};

export const deleteOrderByIdUser = async (token) => {
  return await axios.delete("/ordenUser", {
    data: {
      token: token,
    },
  });
};

export const deleteOrderByClientId = async (id) => {
  return await axios.delete("/ordenClient", {
    data: {
      id,
    },
  });
};

//region VENTAS

export const getAllSales = async (id) => {
  return axios.get("/sales");
};

export const postSales = async (values) => {
  return axios.post("/sales", values);
};
