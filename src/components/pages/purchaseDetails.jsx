import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useContexto } from "../../context/Context";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  formatPrice,
  calcularPorcentaje,
  calcularFaltaParaObjetivo,
} from "../../helpers/helpers";
import { CiCircleCheck } from "react-icons/ci";
import { Bag } from "../../assets/Icons/svg/bag";
export const PurchaseDetails = () => {
  const navigate = useNavigate();
  const [mostrarAlertaExito, setMostrarAlertaExito] = useState(false);
  const {
    incrementarCantidadProducto,
    actualizarCarritoUsuario,
    decrementarCantidadProducto,
    eliminarProducto,
    carrito,
    setCarrito,
    crearOrden,
    VaciarCarritoDeCompras,
    setUserOrders,
    actualizarOrdenUsuario,
    userOrders,
    handleWhatsAppMessage
  } = useContexto();
  const handdleAgregar = async (id) => {
    try {
      const res = await actualizarCarritoUsuario(
        incrementarCantidadProducto(id)
      );
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleRestar = async (id) => {
    try {
      const res = await actualizarCarritoUsuario(
        decrementarCantidadProducto(id)
      );
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleRemover = async (id) => {
    try {
      const res = await actualizarCarritoUsuario(eliminarProducto(id));
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleCrearOrden = async () => {
    const values = {
      total: carrito.total,
      idUsuario: carrito.usuarioId,
      listaProductos: carrito.productos,
      estado: true,
      metodoDePago: "A definir fuera del sitio web",
      envios: carrito.envioGratis,
    };

    const resCrearOrden = await crearOrden(values);
    if (resCrearOrden.status === 201) {
      setMostrarAlertaExito(true);
      setUserOrders(resCrearOrden.order);

      const resCarrito = await VaciarCarritoDeCompras();
      setCarrito(resCarrito.data.carritoVacio);

      actualizarOrdenUsuario();
      handleWhatsAppMessage();
      const timeout = setTimeout(() => {
        navigate("/");
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };

  


  useEffect(() => {
    if (mostrarAlertaExito) {
      const timeout = setTimeout(() => {
        setMostrarAlertaExito(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [mostrarAlertaExito]);

  return (
    <div className="relative">
      <NavBar />
      {mostrarAlertaExito && (
        <div className="sticky w-full flex justify-center top-16 md:top-32 alert alert-success z-20 md:-mt-8">
          <CiCircleCheck className="text-2xl" />
          <span className="text-sm md:text-base">
            Su orden ha sido procesada con éxito.
          </span>
        </div>
      )}
      <div className="relative flex flex-col-reverse md:flex-row items-start md:gap-6 gap-2 mt-16 md:mt-32 w-full bg-base-200 md:p-10">
        <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-2">
          {carrito.productos.length > 0 ? (
            <>
              {carrito.productos.map((producto, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center shadow-sm col-span-1 md:col-span-2 bg-base-100 pr-4 pl-2 md:px-6 md:py-2"
                >
                  <div
                    style={{ letterSpacing: "2px" }}
                    className="font-semibold w-full border-b uppercase py-4"
                  >
                    {producto.nombreBodega}
                  </div>
                  <div className="w-full flex justify-around gap-6 border-b py-4">
                    <div className="avatar ">
                      <div className="w-20 md:w-24 rounded-full bg-primary">
                        <img src={producto.imagen} />
                      </div>
                    </div>
                    <div className="w-24 md:w-1/2 flex items-start flex-col  gap-2">
                      <h1 className="font-bold truncate w-full text-sm md:text-base">
                        {producto.nombre}
                      </h1>
                      <h2 className="text-xs md:text-sm text-neutral truncate w-full">
                        {producto.descripcion_corta}
                      </h2>
                      <div className="flex justify-center items-start gap-4">
                        <Link
                          className=" text-xs md:text-base"
                          to={`/vinoteca/detalles-vino/${producto.id}`}
                        >
                          Detalles
                        </Link>
                        <button
                          onClick={() => {
                            handdleRemover(producto.id);
                          }}
                          className="text-red-600 text-xs md:text-base"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                    <div className="w-20 md:w-2/12 flex flex-col justify-start items-center gap-2">
                      <div className="w-full p-2 flex justify-between gap-2 items-center border">
                        <button>
                          <IoRemoveSharp
                            onClick={() => {
                              handdleRestar(producto.id);
                            }}
                            className="text-xs md:text-base text-neutral"
                          />
                        </button>
                        <span className="text-xs md:text-base">
                          {producto.cantidad}
                        </span>
                        <button>
                          <IoAddSharp
                            onClick={() => {
                              handdleAgregar(producto.id);
                            }}
                            className="text-xs md:text-base text-neutral"
                          />
                        </button>
                      </div>
                      <p className="text-xs text-neutral">
                        stock {producto.stock}
                      </p>
                    </div>
                    <div className="w-20 md:w-2/12 flex-col items-start justify-start">
                      {/*
                      <div className="flex flex-col md:flex-row  md:gap-2">
                        <h2 className="text-success text-xs">-15%</h2>
                        <h2 className="text-neutral line-through text-xs">
                          ${formatPrice(producto.precio)}
                        </h2>
                      </div>*/}
                      <h1 className="text-xs md:text-2xl">
                        ${formatPrice(producto.precio)}
                      </h1>
                    </div>
                  </div>
                  <div className="font-bold w-full py-4 flex justify-between">
                    <h1>Envío</h1>
                    <h1
                      className={`text-${carrito.envioGratis ? "success" : ""}`}
                    >
                      {carrito.envioGratis
                        ? "Gratis"
                        : `Faltan ${formatPrice(
                            calcularFaltaParaObjetivo(carrito.total)
                          )} para envío gratis`}
                    </h1>
                  </div>
                  <div className="w-full flex-col flex gap-2 my-2 ">
                    <progress
                      className="progress progress-success w-full rounded-lg"
                      value={calcularPorcentaje(carrito.total)}
                      max="100"
                    ></progress>
                    {carrito.envioGratis && (
                      <>
                        <div className="text-xs md:text-base">
                          Aprovechá tu envío gratis agregando más.{" "}
                          <Link
                            to="/vinoteca"
                            className="text-accent link items-center"
                          >
                            Ver más productos.
                          </Link>
                        </div>
                        <p className="text-sm">
                          Los envíos gratuitos son válidos para Posadas
                          únicamente.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div
              style={{ minHeight: "50vh" }}
              className="flex flex-col items-center justify-center shadow-sm col-span-1 md:col-span-2 bg-base-100 pr-4 pl-2 md:px-6 md:py-2"
            >
              <Bag />
              <h1 className="font-thin mt-9 mb-2">
                ¡Comienza a armar tu carrito de compras con solo un clic!
              </h1>
              <h2 className="text-sm text-neutral mb-8">
                Encuentra todo lo que buscas y haz tu pedido fácilmente.
              </h2>
              <Link to="/vinoteca" className="btn btn-accent text-base-100">
                Descubrir productos
              </Link>
            </div>
          )}
        </div>
        <div className="sticky top-16 md:sticky md:top-40 p-3 w-full md:w-1/3 shadow-sm bg-base-100 z-10">
          <h1 className="p-4 border-b font-bold mb-2">Resumen de compra</h1>
          <div className="flex justify-between mb-2">
            <h2 className="text-sm md:text-base px-4">
              Productos({carrito.cantidadProductos})
            </h2>
            <h2 className="text-sm md:text-base px-4">
              ${formatPrice(carrito.total)}
            </h2>
          </div>
          {carrito.envioGratis && (
            <div className="flex justify-between mb-2">
              <h2 className="text-sm md:text-base px-4">Envío</h2>
              <h2 className="text-sm md:text-base px-4 text-success">Gratis</h2>
            </div>
          )}
          <div className="flex justify-between font-bold mb-4">
            <h2 className="px-4">Total</h2>
            <h2 className="px-4 ">${formatPrice(carrito.total)}</h2>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => document.getElementById("modal").showModal()}
              disabled={carrito.productos.length < 1 || userOrders}
              className="btn btn-accent text-base-100 w-4/5"
            >
                {carrito.productos.length < 1 ? "Carrito Vacío" : userOrders ? "Debes procesar tu orden pendiente" : "Confirmar pedido"}
            </button>
            <dialog id="modal" className="modal">
              <div className="modal-box">
                <h3
                  style={{ letterSpacing: "4px" }}
                  className="font-bold uppercase"
                >
                  Importante
                </h3>
                <div className="flex flex-col gap-2 my-4 py-4 text-sm">
                  <p>
                    Genial! Una vez que confirmes tu pedido, tendrás{" "}
                    <span className="text-info">24 horas </span>
                    para realizar el pago. Si necesitas más tiempo, háznoslo
                    saber.
                  </p>
                  <p>
                    De lo contrario, tu pedido se cancelará automáticamente y
                    los productos se liberarán.
                  </p>
                  <p className="font-bold">
                    Te contactaremos con nuestro equipo de ventas para que
                    proceses el pago de tus productos
                  </p>
                </div>
                <p style={{ fontSize: "12px" }} className="hidden">
                  ¡Estamos emocionados de anunciarte que pronto integraremos
                  <span className="text-info"> Mercado Pago </span> para hacer
                  todo este proceso mucho más sencillo para ti! ¡Mantente atento
                  a nuestras actualizaciones 😉!
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn absolute top-2 right-2">
                      <IoMdClose className="text-red-600 text-lg" />
                    </button>
                    <button
                      onClick={() => {
                        handdleCrearOrden();
                      }}
                      className="btn btn-primary text-base-100"
                    >
                      Confirmar
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
