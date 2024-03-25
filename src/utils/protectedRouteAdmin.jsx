import { useContexto } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";
import { Loading2 } from "../components/common/loading/loading2";

export const ProtectedRouteAdmin = () => {
  const { user, loading, isAuthenticated } = useContexto();
  if (loading) return <Loading2 />;
  if (!isAuthenticated || (user && user.tipo !== "admin")) {
    if (isAuthenticated && user && user.tipo === "normal") {
      return <Navigate to="/" replace />; // Redireccionar al inicio si es un usuario normal
    } else {
      return <Navigate to="/iniciar-sesion" replace />; // Redireccionar al inicio de sesión si no está autenticado o no es un admin
    }
  }

  return <Outlet />;
};




