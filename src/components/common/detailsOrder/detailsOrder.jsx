import { Link } from "react-router-dom";
import { getFechaDetallada } from "../../../utils/getFecha";
import { calcularTiempoRestante } from "../../../utils/getFecha";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContexto } from "../../../context/Context";
import { IoIosInformationCircleOutline } from "react-icons/io";
export const DetailsOrder = ({ userOrders }) => {
  const { deleteOrder, setUserOrders,handleWhatsAppMessage } = useContexto();
  const [tiempoRestante, setTiempoRestante] = useState(
    calcularTiempoRestante(userOrders.createdAt)
  );

  const tiempoRestanteTotal =
    tiempoRestante.horas * 3600 +
    tiempoRestante.minutos * 60 +
    tiempoRestante.segundos;
  const esMenorA2Horas = tiempoRestanteTotal < 7200;

  useEffect(() => {
    const intervalo = setInterval(() => {
      const tiempoRestante = calcularTiempoRestante(userOrders.createdAt);
      if (
        tiempoRestante.horas < 1 &&
        tiempoRestante.minutos < 1 &&
        tiempoRestante.segundos < 1
      ) {
        deleteOrder();
        setUserOrders(null);
      }
      setTiempoRestante(tiempoRestante);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="border border-base-300 w-full h-full p-4 bg-base-100 shadow-lg">
      <div>
        <h2 className="font-bold text-lg"># {userOrders.id}</h2>
        <h1 className="text-sm">Detealles de tú orden</h1>
      </div>
      <div className="flex justify-around text-xs py-4 gap-2">
        <div className="flex flex-col gap-2">
          <h3 className="text-neutral">Creado</h3>
          <h4 className="text-primary text-xs">
            {getFechaDetallada(userOrders.createdAt)}
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-neutral">Pago</h3>
          <h4
            title={
              userOrders.pago
                ? "El pago de la orden está completado."
                : "El pago de la orden está pendiente."
            }
            className={`text-primary text-xs px-2 rounded-lg ${
              userOrders.pago
                ? " bg-green-500 text-white "
                : "bg-yellow-500 text-white "
            }`}
          >
            {userOrders.pago ? "Echo" : "Pendiente"}
          </h4>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-neutral">Estado</h3>
          <h4
            title={
              userOrders.estado
                ? "Esta orden está activa."
                : "Esta orden está Inactiva."
            }
            className={`text-primary text-xs px-2 rounded-lg ${
              userOrders.estado
                ? "border text-green-600 border-green-600 "
                : "border text-red-500 border-red-500"
            }`}
          >
            {userOrders.estado ? "Activo" : "Inactivo"}
          </h4>
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-2">
        <div className="w-full pt-2 pb-2 flex justify-between">
          <p className="font-bold">Tiempo restante para realizar el pago</p>
          <IoIosInformationCircleOutline
            title="Los productos serán liberados cuando la cuenta regresiva llegue a 00:00:00"
            className="text-xl text-neutral"
          />
        </div>
        <div className="w-full grid grid-flow-col grid-cols-3 gap-5 text-center auto-cols-max">
          <div
            className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm ${
              esMenorA2Horas ? "text-red-500" : ""
            }`}
          >
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": tiempoRestante.horas }}></span>
            </span>
            Hs.
          </div>
          <div
            className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm ${
              esMenorA2Horas ? "text-red-500" : ""
            }`}
          >
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": tiempoRestante.minutos }}></span>
            </span>
            Min.
          </div>
          <div
            className={`flex flex-col p-2 bg-neutral rounded-box text-neutral-content text-sm ${
              esMenorA2Horas ? "text-red-500" : ""
            }`}
          >
            <span className="countdown font-mono text-3xl">
              <span style={{ "--value": tiempoRestante.segundos }}></span>
            </span>
            Seg.
          </div>
        </div>
      </div>

      <div className="mt-2 max-h-32 overflow-y-auto">
        <h2 className="font-bold pb-2 sticky top-0 bg-base-100 z-10">
          Produtos
        </h2>
        {userOrders.listaProductos.map((producto) => (
          <div key={producto.id} className="mb-2 w-full flex flex-col">
            <div className="w-full flex gap-4 items-start">
              <div className="avatar ">
                <div className="w-16 md:w-20 bg-primary rounded-full">
                  <img src={producto.imagen} />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <h2>{producto.nombre}</h2>
                <div className="w-full text-xs flex justify-between">
                  <h3>Precio c/u</h3>
                  <h3>${producto.precio}</h3>
                </div>
                <div className="w-full text-xs flex justify-between">
                  <h3>Cantidad</h3>
                  <h3>x{producto.cantidad}</h3>
                </div>
                <Link
                  to={"/vinoteca/detalles-vino/" + producto.id}
                  className="link mt-1 text-sm"
                >
                  Ver más info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-4 flex flex-col gap-2">
        <h3 className="text-lg font-bold">Pago</h3>
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <h3>Total:</h3>
            <h3>${userOrders.total}</h3>
          </div>
          <div className="flex justify-between text-xs">
            <h3>Envios:</h3>
            <h3>
              {userOrders.envios
                ? "¡Envío gratis disponible!"
                : "Envío gratis no disponible"}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => document.getElementById("modalOrder").showModal()}
          className="text-xs md:text-base btn"
        >
          Cancelar
        </button>
        <dialog id="modalOrder" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              ¿Estás seguro de cancelar tu orden?
            </h3>
            <p className="py-4 text-sm">
              Al cancelar esta orden, los productos seleccionados se liberarán y
              tu oden será cancelada .¿Estás seguro de que deseas continuar?
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-2">
                <button className="btn">Volver</button>
                <button
                  onClick={() => {
                    deleteOrder();
                  }}
                  className="btn bg-red-500 text-white hover:text-primary"
                >
                  Cancelar Orden
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <button onClick={()=>{handleWhatsAppMessage()}} className="text-xs md:text-base btn bg-green-500 text-white hover:text-primary">
          <FaWhatsapp className="text-lg" />
          Contactarme
        </button>
      </div>
    </div>
  );
};
