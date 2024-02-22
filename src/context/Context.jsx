/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const Context = ({ children }) => {
  const [theme, setTheme] = useState( document.documentElement.setAttribute("data-theme",(localStorage.getItem('reactMarketTheme') || 'light')));

  // Función para cambiar el tema y guardar en localStorage
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('reactMarketTheme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('reactMarketTheme');
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para consumir el contexto del tema
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);
