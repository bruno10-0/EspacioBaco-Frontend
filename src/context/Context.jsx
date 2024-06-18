/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import {
  getUsuarios,
  deleteUsuario,
  deleteUsuarios,
  crearUsuarioPorAdmin,
  getPublicaciones,
  postProduct,
  deleteProductById,
  getProducts,
  deleteProducts,
  putProduct,
  actualizarCarrito,
  getOrdenes,
  createOrder,
  vaciarCarrito,
  getOrdenesbyIdUser,
  deleteOrderByIdUser,
  deleteOrderByClientId,
  getAllSales,
  postSales,
} from "../api/auth.js";
import { decryptToken } from "../helpers/token-decrypt.js";
const createdContext = createContext();

export const Context = ({ children }) => {
  //region Estados
  const [userOrders, setUserOrders] = useState();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  //este estado sirve para que cuando cambie su valor se actualice la lista de publicaciones(sinceramente no se por que lo cree) luego se debe actualizar esta logica.
  const [flagPublicaciones, setFlagPublicaciones] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [carrito, setCarrito] = useState({
    id: null,
    usuarioId: null,
    productos: [],
    cantidadProductos: 0,
    total: 0,
    createdAt: null,
    updatedAt: null,
  });
  const [theme, setTheme] = useState(
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("espacioBacoTheme") || "autumn"
    )
  );

  //region Funcionalidades

  const handleWhatsAppMessage = () => {
    const message = `Hola, soy ${
      user && user.nombre ? user.nombre : ""
    } y quisiera pagar mi orden #${
      userOrders && userOrders.id ? userOrders.id : ""
    }. ¿Cómo puedo completar el pago?`;

    const whatsappUrl = `https://wa.me/+5493764227439?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("nekot");
    setUser(null);
    setIsAuthenticated(false);
    setUserOrders(null);
    setCarrito({
      id: null,
      usuarioId: null,
      productos: [],
      cantidadProductos: 0,
      total: 0,
      createdAt: null,
      updatedAt: null,
    });
  };

  const handleOrdenamientoChange = (value, setOrder) => {
    setOrder(value);
  };

  const incrementarCantidadProducto = (productoId) => {
    // Clona el array de productos del carrito para no modificar el estado directamente
    const productosActualizados = [...carrito.productos];

    // Encuentra el índice del producto en el array basado en el ID
    const indiceProducto = productosActualizados.findIndex(
      (producto) => producto.id === productoId
    );

    if (indiceProducto !== -1) {
      const producto = productosActualizados[indiceProducto];
      // Verifica si la cantidad actual es menor que el stock
      if (producto.cantidad < producto.stock) {
        // Incrementa la cantidad del producto en 1
        producto.cantidad += 1;
      }
    }
    return productosActualizados;
  };

  const decrementarCantidadProducto = (productoId) => {
    // Clona el array de productos del carrito para no modificar el estado directamente
    const productosActualizados = [...carrito.productos];

    // Encuentra el índice del producto en el array basado en el ID
    const indiceProducto = productosActualizados.findIndex(
      (producto) => producto.id === productoId
    );

    if (indiceProducto !== -1) {
      const producto = productosActualizados[indiceProducto];
      // Verifica si la cantidad actual es mayor que 1
      if (producto.cantidad > 1) {
        // Disminuye la cantidad del producto en 1
        producto.cantidad -= 1;
      }
    }

    return productosActualizados;
  };

  const VaciarCarritoDeCompras = async () => {
    const token = localStorage.getItem("nekot");
    if (!token) {
      console.log("No se puede vaciar el carrito, no hay token de usuario.");
      return;
    }
    const decryptedToken = decryptToken(token);
    const res = await vaciarCarrito(decryptedToken);
    return res;
  };

  //region Actualizar

  const actualizarListaUsuarios = async () => {
    try {
      const token = localStorage.getItem("nekot");
      if (!token) {
        console.log("No hay token, no se puede realizar la operación");
        return;
      }
      const decryptedToken = decryptToken(token);
      const res = await getUsuarios(decryptedToken);
      setUsers(res.data);
    } catch (error) {
      setUsers([]);
      console.error("Error al actualizar la lista de usuarios:", error);
    }
  };

  const actualizarListaPublicaciones = async () => {
    try {
      const res = await getPublicaciones();
      setPublicaciones(res.data.publicaciones);
    } catch (error) {
      setPublicaciones([]);
      console.error(error);
    }
  };

  const actualizarListaProductos = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      setProducts([]);
      console.error(error);
    }
  };

  const actualizarCarritoUsuario = async (nuevaLista) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      throw new Error("No hay token, no se puede realizar esta operación");
    }
    try {
      const decryptedToken = decryptToken(token);
      const res = await actualizarCarrito(decryptedToken, nuevaLista);
      setLoading(false);
      return res;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const actualizarOrdenUsuario = async () => {
    setLoading(true);
    await getUserOrder();
    setLoading(false);
  };

  //region Borrar(delete)

  const deleteOrder = async () => {
    const token = localStorage.getItem("nekot");
    if (!token) {
      setLoading(false);
      return console.error(
        "No hay token de usuario, la operación no se puede completar."
      );
    }
    setLoading(true);
    try {
      const decyptedToken = decryptToken(token);
      await deleteOrderByIdUser({ token: decyptedToken });
      await actualizarListaProductos();
      setUserOrders(null);
    } catch (error) {
      console.error("Error al eliminar la orden:" + error);
    }
    setLoading(false);
  };

  const deleteOrderUser = async (id) => {
    if (!id) {
      return console.error(
        "No se puede completar la operación, no se recibio el id de un usuario en la operación."
      );
    }
    setLoading(true);
    try {
      await deleteOrderByClientId(id);
      await actualizarListaProductos();
      await getAllOrders();
      await getUserOrder();
    } catch (error) {
      console.error(
        "Error al intentar eliminar la orden de el usuario: " + error
      );
    }
    setLoading(false);
  };

  const deleteUsuarioById = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hay token, no se puede realizar la operación.");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        const res = await deleteUsuario(decryptedToken, id);
        actualizarListaUsuarios(); // Actualizar la lista de usuarios después de eliminar
        setLoading(false);
        return res;
      } catch (error) {
        console.error(error);
        actualizarListaUsuarios(); // Actualizar la lista de usuarios después de eliminar
        setLoading(false);
        return error.response;
      }
    }
  };

  const deleteMultipleUsuarios = async (ids) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hay token, no se puede realizar la operación.");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        const res = await deleteUsuarios(ids, decryptedToken);
        actualizarListaUsuarios();
        setLoading(false);
        return res;
      } catch (error) {
        console.error(error);
        actualizarListaUsuarios(); // Actualizar la lista de usuarios después de eliminar
        setLoading(false);
        return error.response;
      }
    }
  };

  const deleteMultipleProductos = async (ids) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hay token, no se puede realizar la operación.");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        await deleteProducts(decryptedToken, ids);
      } catch (error) {
        console.error(error);
      } finally {
        actualizarListaUsuarios();
        setLoading(false);
      }
    }
  };

  const DeleteProductoById = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hoy token, no se puede realizar esta operación");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        await deleteProductById(decryptedToken, id);
      } catch (error) {
        console.log(error);
      } finally {
        actualizarListaProductos();
        setLoading(false);
      }
    }
  };

  const eliminarProducto = (productoId) => {
    const productosActualizados = carrito.productos.filter(
      (producto) => producto.id !== productoId
    );
    return productosActualizados;
  };

  //region Crear

  const createUserForAdmin = async (data) => {
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hoy token, no se puede realizar esta operación");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        const res = await crearUsuarioPorAdmin(data, decryptedToken);
        return res;
      } catch (error) {
        setError(error);
        return console.error("Error al itentar crear un usuario: ", error);
      }
    }
  };

  const createProduct = async (data) => {
    const token = localStorage.getItem("nekot");
    if (!token) {
      throw new Error("No hay token, no se puede realizar esta operación");
    }
    try {
      const decryptedToken = decryptToken(token);
      const res = await postProduct(decryptedToken, data);
      return res;
    } catch (error) {
      setError(error.message);
      throw new Error(`Error al intentar crear un producto: ${error.message}`);
    }
  };

  const crearOrden = async (values) => {
    try {
      const res = await createOrder(values);
      return res;
    } catch (error) {
      console.error("Error al crear la orden:" + error);
    }
  };

  const crearRegistroVenta = async (values) => {
    setLoading(true);
    try {
      await postSales(values);
      await getAllVentas();
      await getAllOrders();
      await getUserOrder();
    } catch (error) {
      console.error("Ocurrió un error al crear una de las ventas.");
    }
    setLoading(false);
  };

  const putProducto = async (data, id) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hoy token, no se puede realizar esta operación");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        await putProduct(decryptedToken, data, id);
      } catch (error) {
        console.error(error);
      } finally {
        actualizarListaProductos();
        setLoading(false);
      }
    }
  };

  //region Traer todo(getAll)

  const getAllOrders = async () => {
    try {
      const res = await getOrdenes();
      setOrders(res.data);
    } catch (error) {
      console.error("Error al cargar las ordenes:" + error);
    }
  };

  const getUserOrder = async () => {
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error(
        "No hay token de usuario, la operación no se puede completar."
      );
    }
    const decyptedToken = decryptToken(token);
    try {
      const res = await getOrdenesbyIdUser({ token: decyptedToken });
      setUserOrders(res.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Error 404: Recurso no encontrado");
        setUserOrders(null);
      } else {
        console.error("Error al cargar la orden del usuario:" + error);
      }
    }
  };

  const getAllVentas = async () => {
    try {
      const res = await getAllSales();
      setVentas(res.data);
    } catch (error) {
      console.error("Ocurrió un error al consultas las ventas.");
    }
  };

  //region useEffects

  // Efecto para cargar las ventas.
  useEffect(() => {
    getAllVentas();
  }, []);

  // Efecto para cargar las ordenes de todos los clientes.
  useEffect(() => {
    getUserOrder();
  }, []);

  // Efecto para traer y cargar la orden del usuario.
  useEffect(() => {
    getAllOrders();
  }, []);

  useEffect(() => {
    actualizarListaPublicaciones();
  }, [flagPublicaciones]);

  useEffect(() => {
    if (error !== null) {
      const timeoutId = setTimeout(() => {
        setError(null); // Limpiar el error después de 5 segundos
      }, 5000);

      return () => clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente o al cambiar el estado nuevamente
    }
  }, [error]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("espacioBacoTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Efecto para cargar usuarios y gestionar el estado de cargando
  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("nekot");

      if (!token) {
        console.log("No hay token, no se puede realizar la operación");
      } else {
        try {
          const decryptedToken = decryptToken(token);
          const res = await getUsuarios(decryptedToken);
          setUsers(res.data); // Establece la lista de usuarios en el estado
        } catch (error) {
          console.log(error);
        }
      }

      setLoading(false); // Desactiva el estado de carga al finalizar
    };
    fetchUsuarios();
  }, []);

  return (
    <createdContext.Provider
      value={{
        handleWhatsAppMessage,
        putProducto,
        deleteMultipleProductos,
        DeleteProductoById,
        deleteUsuarioById,
        deleteMultipleUsuarios,
        getAllOrders,
        getUserOrder,
        deleteOrderUser,

        createProduct,
        createUserForAdmin,
        crearOrden,
        getAllVentas,
        crearRegistroVenta,

        eliminarProducto,
        decrementarCantidadProducto,
        incrementarCantidadProducto,
        actualizarOrdenUsuario,
        actualizarCarritoUsuario,
        actualizarListaPublicaciones,
        changeTheme,
        cerrarSesion,
        actualizarListaUsuarios,
        handleOrdenamientoChange,
        VaciarCarritoDeCompras,
        deleteOrder,

        setFlagPublicaciones,
        setPublicaciones,
        setIsAuthenticated,
        setUser,
        setProducts,
        setUsers,
        setLoading,
        setCarrito,
        setOrders,
        setUserOrders,
        setVentas,

        ventas,
        userOrders,
        orders,
        carrito,
        flagPublicaciones,
        publicaciones,
        error,
        isAuthenticated,
        user,
        theme,
        loading,
        users,
        products,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
