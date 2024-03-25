import { useContexto } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";
import { Loading2 } from "../components/common/loading/loading2";

export const ProtectedRouteNormal = () => {
  const { user, loading, isAuthenticated } = useContexto();
  if (loading) return <Loading2 />;
  if (!isAuthenticated || (!user)) {
    return <Navigate to="/iniciar-sesion" replace />; // Redireccionar al inicio de sesión si no está autenticado o no es un usuario normal
  }

  return <Outlet />;
};
