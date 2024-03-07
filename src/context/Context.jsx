/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { dataDecrypt } from "../helpers/data-decrypt.js";
import { dataEncrypt } from "../helpers/data-encrypt.js";
const createdContext = createContext();

export const Context = ({ children }) => {
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

  const calcularTotal = () => {
    let total = 0;
    cartList.forEach((item) => {
      total += item.cantidad * item.precio;
    });
    if (total > 100) {
      setEnvioGratis(true);
    }else{
      setEnvioGratis(false)
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
  const [theme, setTheme] = useState(
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("espacioBacoTheme") || "light"
    )
  );
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
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

  return (
    <createdContext.Provider
      value={{
        theme,
        changeTheme,
        cartList,
        setCartList,
        total,
        cantidad,
        envioGratis,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
