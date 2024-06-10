import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading2 } from "../common/loading/loading2.jsx";
import { getOrdenesbyId, getUsuarioById } from "../../api/auth.js";
import { decryptToken } from "../../helpers/token-decrypt.js";
import {
  getFechaDetallada,
  calcularTiempoRestante,
} from "../../utils/getFecha.js";
import { useContexto } from "../../context/Context.jsx";
import { Link } from "react-router-dom";

export const DetailsEspecificOrder = () => {
  const { deleteOrder, setUserOrders } = useContexto();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [orden, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({});

  const tiempoRestanteTotal =
    tiempoRestante.horas * 3600 +
    tiempoRestante.minutos * 60 +
    tiempoRestante.segundos;

  const esMenorA2Horas = tiempoRestanteTotal < 7200;

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

  useEffect(() => {
    const intervalo = setInterval(() => {
      const tiempoRestante = calcularTiempoRestante(orden.createdAt);
      if (
        tiempoRestante.horas < 1 &&
        tiempoRestante.minutos < 1 &&
        tiempoRestante.segundos < 1
      ) {
        //borrar esta orden
      }
      setTiempoRestante(tiempoRestante);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [orden]);

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
      {orden && (
        <div className="mt-20 md:mt-32 bg-base-200 w-full flex justify-center items-center">
          <div className="h-auto w-full md:w-3/4 p-2 md:p-8">
            <h2 className="font-extrabold text-2xl">Detalles de Orden</h2>
            <h4 className="text-xs md:text-sm">Datos relevantes de la orden.</h4>
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
                <h3 className="font-medium">
                  {getFechaDetallada(orden.createdAt)}
                </h3>
              </div>
            </div>

            <div className="w-full mt-2">
              <h2 className="font-extrabold text-2xl">Tiempo restante</h2>
              <h4 className="text-xs md:text-sm">
                Cuando la cuenta regresiva llegue a{" "}
                <span className="text-lg text-red-500">00:00:00</span>, los
                productos de esta orden serán liberados para la venta y esta
                orden será eliminada automáticamente.
              </h4>

              <div className="mt-4 w-full grid grid-flow-col grid-cols-3 gap-4 text-center auto-cols-max">
                <div
                  className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm md:text-lg md:p-4 ${
                    esMenorA2Horas ? "text-red-500" : ""
                  }`}
                >
                  <span className="countdown font-mono text-4xl md:text-5xl">
                    <span style={{ "--value": tiempoRestante.horas }}></span>
                  </span>
                  Hs.
                </div>
                <div
                  className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm md:text-lg md:p-4 ${
                    esMenorA2Horas ? "text-red-500" : ""
                  }`}
                >
                  <span className="countdown font-mono text-4xl md:text-5xl">
                    <span style={{ "--value": tiempoRestante.minutos }}></span>
                  </span>
                  Min.
                </div>
                <div
                  className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm md:text-lg md:p-4 ${
                    esMenorA2Horas ? "text-red-500" : ""
                  }`}
                >
                  <span className="countdown font-mono text-4xl md:text-5xl">
                    <span style={{ "--value": tiempoRestante.segundos }}></span>
                  </span>
                  Seg.
                </div>
              </div>
            </div>

            <div className="w-full mt-4">
              <h2 className="font-extrabold text-2xl">Productos</h2>
              <h4 className="text-xs md:text-sm">
                A continuación los productos que encargo el usuario propietario de la orden.
              </h4>
              <div>
                <div className="mt-4 max-h-32 overflow-y-auto">
                  {orden.listaProductos.map((producto) => (
                    <div
                      key={producto.id}
                      className="mb-6 w-full flex flex-col"
                    >
                      <div className="w-full flex gap-4 items-start">
                        <div className="avatar">
                          <div className="w-16 md:w-20 bg-primary rounded-full">
                            <img src={producto.imagen} />
                          </div>
                        </div>
                        <div className="w-full flex flex-col">
                          <h2>{producto.nombre}</h2>
                          <div className="w-full flex justify-between">
                            <h3>Precio c/u</h3>
                            <h3>${producto.precio}</h3>
                          </div>
                          <div className="w-full flex justify-between">
                            <h3>Cantidad</h3>
                            <h3>x{producto.cantidad}</h3>
                          </div>
                          <Link
                            to={"/vinoteca/detalles-vino/" + producto.id}
                            className="link mt-1 text-xs md:text-sm"
                          >
                            Ver más info
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full mt-4 ">
              <h2 className="font-extrabold text-2xl">Pago</h2>
              <div className="py-4 flex flex-col gap-2">
                <div className="w-full flex flex-col gap-1">
                  <div className="flex justify-between">
                    <h3>Total</h3>
                    <h3 className="font-semibold text-green-500">
                      ${orden.total}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <h3>Metodo de pago</h3>
                    <h3 className="font-semibold">{orden.metodoDePago}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};
