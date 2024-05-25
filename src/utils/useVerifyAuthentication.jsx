import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContexto } from "../context/Context";
import { decryptToken } from "../helpers/token-decrypt.js";
import { verificarToken } from "../api/auth.js";
import { verificarCarrito } from "../api/auth.js";
export const UseVerifyAuthentication = ({ children }) => {
  const {
    setIsAuthenticated,
    setUser,
    user,
    setLoading,
    cerrarSesion,
    setCarrito,
    getUserOrder,
  } = useContexto();
  const location = useLocation();

  useEffect(() => {
    async function verificarCarritoCompras() {
      const token = localStorage.getItem("nekot");
      if (!token) return;
      try {
        const decryptedToken = decryptToken(token);
        const res = await verificarCarrito(decryptedToken);
        setCarrito(res.data);
        //console.log("Carrito verificado correctamente");
      } catch (error) {
        console.log(error);
      }
    }
    if (user) {
      verificarCarritoCompras();
      getUserOrder();
    }
  }, [user]);

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
            //console.log("Token verificado correctamente");
          } else {
            cerrarSesion();
            console.log("Error al verificar token: Acceso no autorizado");
          }
        } catch (error) {
          console.error("Error al verificar token:", error);
          console.log("Error al verificar token:", error.message);
          cerrarSesion();
        } finally {
          setLoading(false);
        }
      }
    }
    checkLogin();
  }, [location.pathname]);

  return children;
};
