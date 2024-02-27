/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const createdContext = createContext();

export const Context = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [theme, setTheme] = useState(
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("reactMarketTheme") || "light"
    )
  );

  // Función para cambiar el tema y guardar en localStorage
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("reactMarketTheme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("reactMarketTheme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <createdContext.Provider
      value={{ theme, changeTheme, cartList, setCartList }}
    >
      {children}
    </createdContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useContexto = () => useContext(createdContext);
