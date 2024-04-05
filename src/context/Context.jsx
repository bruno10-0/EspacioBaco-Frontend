/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { dataDecrypt } from "../helpers/data-decrypt.js";
import { dataEncrypt } from "../helpers/data-encrypt.js";
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
} from "../api/auth.js";
import { decryptToken } from "../helpers/token-decrypt.js";
const createdContext = createContext();

export const Context = ({ children }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [envioGratis, setEnvioGratis] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [publicaciones, setPublicaciones] = useState([]);
  const [flagPublicaciones, setFlagPublicaciones] = useState(false);
  const [cartList, setCartList] = useState(() => {
    try {
      const storedValue = localStorage.getItem("carritoCompras");
      return storedValue ? JSON.parse(dataDecrypt(storedValue)) : [];
    } catch (error) {
      console.error(
        "Error al desencriptar los datos del carrito de compras:",
        error
      );
      return [];
    }
  });
  const [theme, setTheme] = useState(
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("espacioBacoTheme") || "autum"
    )
  );

  const calcularTotal = () => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.cantidad * item.precio;
    });
    if (total > 100) {
      setEnvioGratis(true);
    } else {
      setEnvioGratis(false);
    }
    total = Math.round(total * 100) / 100;
    setTotal(total);
  };

  const calcularCantidad = () => {
    let cantidadTotal = 0;
    cartList.forEach((item) => {
      cantidadTotal += item.cantidad;
    });
    setCantidad(cantidadTotal);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("nekot");
    setUser(null);
    setIsAuthenticated(false);
  };

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
      console.error("Error al actualizar la lista de usuarios:", error);
    }
  };

  const handleOrdenamientoChange = (value, setOrder) => {
    setOrder(value);
  };

  const deleteUsuarioById = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("nekot");
    if (!token) {
      return console.error("No hay token, no se puede realizar la operación.");
    } else {
      try {
        const decryptedToken = decryptToken(token);
        await deleteUsuario(decryptedToken, id);
      } catch (error) {
        console.error(error);
      } finally {
        actualizarListaUsuarios(); // Actualizar la lista de usuarios después de eliminar
        setLoading(false);
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
        await deleteUsuarios(ids, decryptedToken);
      } catch (error) {
        console.error(error);
      } finally {
        actualizarListaUsuarios();
        setLoading(false);
      }
    }
  };

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

  const actualizarListaPublicaciones = async () => {
    try {
      const res = await getPublicaciones();
      setPublicaciones(res.data.publicaciones);
    } catch (error) {
      console.error(error);
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

  const actualizarListaProductos = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    localStorage.setItem(
      "carritoCompras",
      dataEncrypt(JSON.stringify(cartList))
    );
    calcularTotal();
    calcularCantidad();
  }, [cartList, setCartList]);

  // Efecto para cargar usuarios y gestionar el estado de carga
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
        deleteMultipleProductos,
        DeleteProductoById,
        deleteUsuarioById,
        deleteMultipleUsuarios,

        createProduct,
        createUserForAdmin,

        actualizarListaPublicaciones,
        changeTheme,
        cerrarSesion,
        actualizarListaUsuarios,
        handleOrdenamientoChange,

        setFlagPublicaciones,
        setPublicaciones,
        setIsAuthenticated,
        setUser,
        setProducts,
        setUsers,
        setLoading,
        setCartList,

        cartList,
        flagPublicaciones,
        publicaciones,
        error,
        isAuthenticated,
        user,
        theme,
        total,
        cantidad,
        envioGratis,
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
