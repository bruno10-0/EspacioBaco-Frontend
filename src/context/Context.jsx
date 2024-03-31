/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { dataDecrypt } from "../helpers/data-decrypt.js";
import { dataEncrypt } from "../helpers/data-encrypt.js";
import {
  verificarToken,
  getProducts,
  getUsuarios,
  deleteUsuario,
  deleteUsuarios,
  crearUsuarioPorAdmin,
} from "../api/auth.js";
import { decryptToken } from "../helpers/token-decrypt.js";
const createdContext = createContext();

export const Context = ({ children }) => {
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [envioGratis, setEnvioGratis] = useState(false);
  const [cantidad, setCantidad] = useState(0);
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
      localStorage.getItem("espacioBacoTheme") || "lofi"
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
      return console.error(
        "No hoy token, no se puede realizar esta operación"
      )
    }else {
      try {
        const decryptedToken = decryptToken(token);
        const res = await crearUsuarioPorAdmin(data,decryptedToken);
        console.log(res)
        return res;
      } catch (error) {
        setError(error)
        return console.error("Error al itentar crear un usuario: ", error);
      }
    }
  };

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

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("nekot");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        return;
      } else {
        const decryptedToken = decryptToken(token);
        try {
          const res = await verificarToken(decryptedToken);
          if (res.status == 201) {
            setIsAuthenticated(true);
            setUser(res.data);
            console.log("Token verificado correctamente");
          } else {
            cerrarSesion();
            console.log("Error al verificar token: Acceso no autorizado");
          }
        } catch (error) {
          console.error("Error al verificar token:", error);
          setIsAuthenticated(false);
          setUser(null);
          console.log("Error al verificar token:", error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    const interval = setInterval(checkLogin, 1000);

    return () => clearInterval(interval);
  }, []);
  //Carga de los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };

    fetchProducts();
  }, []);
  //Carga de los usuarios
  useEffect(() => {
    setLoading(true);
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("nekot");
      if (!token) {
        console.log("No hay token, no se puede realizar la operación");
      } else {
        try {
          const decryptedToken = decryptToken(token);
          const res = await getUsuarios(decryptedToken);
          setUsers(res.data);
        } catch (error) {
          throw new Error(error.response.data.mensaje);
        }
      }
    };
    fetchUsuarios();
    setLoading(false);
  }, []);

  return (
    <createdContext.Provider
      value={{
        error,
        createUserForAdmin,
        actualizarListaUsuarios,
        handleOrdenamientoChange,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        theme,
        changeTheme,
        cartList,
        setCartList,
        total,
        cantidad,
        envioGratis,
        loading,
        cerrarSesion,
        products,
        users,
        deleteUsuarioById,
        deleteMultipleUsuarios,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
