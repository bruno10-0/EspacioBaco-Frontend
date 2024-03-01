/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const createdContext = createContext();

export const Context = ({ children }) => {
  const [freeShipping, setFreeShipping] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [cartList, setCartList] = useState(() => {
    const storedValue = localStorage.getItem("carritoCompras");
    return storedValue ? JSON.parse(storedValue) : [];
  });
  const [theme, setTheme] = useState(
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("reactMarketTheme") || "light"
    )
  );

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
  };

  const isFree = () => {
    if (totalCompra > 99) {
      setFreeShipping(true);
    } else {
      setFreeShipping(false);
    }
  };

  const calcularTotalCompra = () => {
    let total = 0;
    // Recorremos cada objeto en 'cartList'
    cartList.forEach((item) => {
      const precio = item.price;
      // Multiplicamos el precio por la cantidad y lo sumamos al total
      total += precio * item.quantity;
    });
    return total;
  };

  const calcularCantidad = () => {
    var cantidad = 0;
    cartList.forEach((item) => {
      cantidad += item.quantity;
    });
    return cantidad;
  };

  const eliminarItem = (estado, id) => {
    var nuevoEstado = [];
    for (var i = 0; i < estado.length; i++) {
      if (estado[i].id !== id) {
        nuevoEstado.push(estado[i]);
      }
    }
    return nuevoEstado;
  };

  useEffect(() => {
    const total = calcularTotalCompra();
    const cantidad = calcularCantidad();
    setTotalCompra(total);
    setCantidad(cantidad);
    isFree();
  }, [cartList, setCartList, totalCompra]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("espacioBacoTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carritoCompras", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <createdContext.Provider
      value={{
        theme,
        changeTheme,
        cartList,
        setCartList,
        totalCompra,
        cantidad,
        freeShipping,
        eliminarItem,
      }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
