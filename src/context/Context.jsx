/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { dataDecrypt } from "../helpers/data-decrypt.js";
import { dataEncrypt } from "../helpers/data-encrypt.js";
import { verificarToken } from "../api/auth.js";
import { decryptToken } from "../helpers/token-decrypt.js";
const createdContext = createContext();

export const Context = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();
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
      localStorage.getItem("espacioBacoTheme") || "autumn"
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
    setUser();
    setIsAuthenticated(false);
  };

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
          console.log(res);
          if (res.status == 201) {
            setIsAuthenticated(true);
            setUser(res.data);
            console.log("Token verificado correctamente");
          } else {
            setIsAuthenticated(false);
            setUser(null);
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
  return (
    <createdContext.Provider
      value={{
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
        setProducts,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
