import { IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context";
import { Loading2 } from "../loading/loading2";
import { Link } from "react-router-dom";

export const DetailsOrderAdminSection = () => {
  const [searchText, setSearchText] = useState("");
  const { orders, getAllOrders, deleteOrderUser, crearRegistroVenta } =
    useContexto();
  const [loading, setLoading] = useState(false);
  const [ordersCopy, setOrdersCopy] = useState(null);

  const handleDarDeAltaOrden = async (orden) => {
    const ids = orden.listaProductos.map((producto) => producto.id);
    const values = {
      metodoDePago: orden.metodoDePago,
      usuarioId: orden.idUsuario,
      productos: ids,
      total: orden.total,
      ordenId: orden.id,
    };
    //console.log(values);
    await crearRegistroVenta(values);
  };

  const handleEliminarOrden = async (id) => {
    setLoading(true);
    await deleteOrderUser(id);
    setLoading(false);
  };

  useEffect(() => {
    if (orders && orders.orders) {
      const filteredOrders = orders.orders.filter((orden) =>
        orden.id.toString().includes(searchText.toLowerCase())
      );
      setOrdersCopy(filteredOrders);
    }
  }, [searchText, orders]);

  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    try {
      getAllOrders();
    } catch (error) {
      console.error("Error al intentar cargar las ordenes: ", error);
    }
    setLoading(false); // Desactiva el estado de carga
  }, []);
  return (
    <div className="flex flex-col mt-16 md:mt-32 bg-base-100 w-full">
      {loading && <Loading2 />}
      <div className="w-full pt-4 px-4 font-bold">
        <h1 style={{ letterSpacing: "2px" }}>Administración de Ordenes.</h1>
        <h2
          style={{ letterSpacing: "2px" }}
          className="mt-4 text-xs font-light"
        >
          Busca por el #NUMERO_ORDEN la orden de un cliente.
        </h2>
        <div className="bg-base-100 z-20 navbar w-auto">
          <div className="w-screen flex gap-2">
            <div className="flex items-center border gap-2 w-2/4 md:w-2/4">
              <IoSearchOutline className="text-2xl mx-2 text-gray-500" />
              <input
                value={searchText}
                type="text"
                placeholder="Buscar..."
                className="w-full bg-transparent p-3 focus:outline-none"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ minHeight: "calc(100vh - 200px)" }}
        className="overflow-x-auto"
      >
        <table className="table transition-all ease-in-out">
          {/* head */}
          <thead>
            <tr>
              <th>#NUMERO_ORDEN</th>
              <th>Id usuario</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Total</th>
              <th>Envíos</th>
              <th>Dar de alta</th>
              <th>Cancelar</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {ordersCopy && ordersCopy.length > 0 ? (
              ordersCopy.map((orden, index) => (
                <tr key={index}>
                  <td>{orden.id}</td>
                  <td>{orden.idUsuario}</td>
                  <td
                    className={orden.estado ? "text-green-500" : "text-red-500"}
                  >
                    {orden.estado ? "Activa" : "Inactiva"}
                  </td>
                  <td
                    className={
                      orden.pago ? "text-green-500" : "text-yellow-500"
                    }
                  >
                    {orden.pago ? "Activa" : "Pendiente"}
                  </td>
                  <td>${orden.total}</td>
                  <td>{orden.envios ? "Envíos gratis disponible" : "Envíos gratis no disponible"}</td>
                  <td>
                    <button
                      onClick={() =>
                        document
                          .getElementById(`modalDarDeAltaOrden-${orden.id}`)
                          .showModal()
                      }
                      className="btn font-normal bg-success text-white w-full"
                    >
                      Pagado
                    </button>
                    {/*Modal para dar de alta una order*/}
                    <dialog
                      id={`modalDarDeAltaOrden-${orden.id}`}
                      className="modal"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Advertencia</h3>
                        <p className="py-4">
                          Estás a punto de marcar esta orden como pagada.
                          <br />
                          Una vez realizada esta acción,{" "}
                          <span className="text-green-500">
                            se considerará que la orden ha sido completada
                          </span>
                          . Por favor, asegúrate de que la orden ha sido
                          efectivamente pagada antes de continuar.
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="font-normal btn mr-2">
                              Cerrar
                            </button>
                            <button
                              onClick={() => {
                                handleDarDeAltaOrden(orden);
                              }}
                              className="font-normal btn text-white bg-green-500"
                            >
                              Aceptar
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        document
                          .getElementById(
                            `modalCancelarOrden-${orden.idUsuario}`
                          )
                          .showModal()
                      }
                      className="btn font-normal  border border-error text-error w-full"
                    >
                      Cancelar
                    </button>
                    {/*Modal para cancelar una order*/}
                    <dialog
                      id={`modalCancelarOrden-${orden.idUsuario}`}
                      className="modal"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Advertencia</h3>
                        <p className="py-4">
                          Estás a punto de eliminar una orden de un usuario.{" "}
                          <br />
                          <span className="text-error">
                            Esta acción es irreversible
                          </span>{" "}
                          y eliminará permanentemente todos los datos asociados
                          con esta orden. Por favor, asegúrate de que deseas
                          proceder antes de continuar.
                        </p>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="font-normal btn mr-2">
                              Cerrar
                            </button>
                            <button
                              onClick={() => {
                                handleEliminarOrden(orden.idUsuario);
                              }}
                              className="font-normal btn text-white btn-error"
                            >
                              Eliminar
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>
                  <Link className="link" to={"/super-administrador/ordenes/detalles/"+orden.id}>Más info</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  No hay órdenes disponibles
                </td>
              </tr>
            )}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>#NUMERO_ORDEN</th>
              <th>Id usuario</th>
              <th>Estado</th>
              <th>Pago</th>
              <th>Total</th>
              <th>Envíos</th>
              <th>Dar de alta</th>
              <th>Cancelar</th>
              <th>Detalles</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
