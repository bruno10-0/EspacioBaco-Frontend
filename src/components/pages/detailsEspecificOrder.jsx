import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading2 } from "../common/loading/loading2.jsx";
import { useContexto } from "../../context/Context.jsx";
import { getOrdenesbyId, getUsuarioById } from "../../api/auth.js";
import { decryptToken } from "../../helpers/token-decrypt.js";
import { getFecha, getFechaDetallada } from "../../utils/getFecha.js";

export const DetailsEspecificOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orden, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [fecha, setFecha] = useState();
  const [primeraLetra, setPrimeraLetra] = useState();

  useEffect(() => {
    if (user) {
      setPrimeraLetra(user.nombre.charAt(0));
      setFecha(getFecha(user.createdAt));
    } else {
      setPrimeraLetra("");
    }
  }, [user]);

  useEffect(() => {
    const getOrden = async () => {
      setLoading(true);
      if (!id) {
        console.error("No hay un id valido para buscar la orden");
        return navigate("/super-administrador/ordenes");
      }
      try {
        const res = await getOrdenesbyId(id);
        setOrder(res.data);
        try {
          const token = localStorage.getItem("nekot");
          const decryptedToken = decryptToken(token);
          const resUser = await getUsuarioById(
            res.data.idUsuario,
            decryptedToken
          );
          setUser(resUser);
        } catch (error) {
          console.log("Error al buscar la al usuario de la orden: " + error);
        }
      } catch (error) {
        console.log("Error al buscar la orden: " + error);
      }
      setLoading(false);
    };
    getOrden();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading2 />
      </div>
    );
  }
  if (!loading && !orden)
    return (
      <div>
        <NavBar />
        <div className="h-screen w-full flex justify-center items-center">
          <h1>No encontramos la orden que estas buscando...</h1>
        </div>
        <Footer />
      </div>
    );
  return (
    <div>
      <NavBar />
      <div className="mt-20 md:mt-32 bg-base-200 w-full h-screen flex justify-center items-center">
        <div className="h-full w-full md:w-3/4 p-2 md:p-8">
          <h1 className="font-extrabold text-2xl">Detalles de Orden</h1>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center mt-2 p-2 gap-4">
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">ID de Orden</h2>
              <h3 className="font-medium">#{orden.id}</h3>
            </div>
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">Nombre completo</h2>
              <h3 className="font-medium">
                {user.nombre} {user.apellido}
              </h3>
            </div>
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">Estado</h2>
              <h3
                className={`font-medium ${
                  orden.estado ? "text-green-500" : "text-red-500"
                }`}
              >
                {orden.estado ? "Activa" : "Inactiva"}
              </h3>
            </div>
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">Pago</h2>
              <h3
                className={`font-medium ${
                  orden.pago ? "text-green-500" : "text-yellow-500"
                }`}
              >
                {orden.pago ? "Pagado" : "Pendiente"}
              </h3>
            </div>
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">Envio Gratis</h2>
              <h3
                className={`font-medium ${
                  orden.estado ? "text-green-500" : "text-red-500"
                }`}
              >
                {orden.estado ? "Disponible" : "No disponible"}
              </h3>
            </div>
            <div className="bg-base-100 p-2 rounded-lg">
              <h2 className="text-neutral-400">Creación de la orden</h2>
              <h3 className="font-medium">{getFechaDetallada(orden.createdAt)}</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
