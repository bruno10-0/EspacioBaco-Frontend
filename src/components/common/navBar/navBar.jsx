import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context.jsx";
import { Link } from "react-router-dom";
import { themes } from "../../../constants/themes.js";
import { DropdownItem } from "../dropdownItem/dropdownItem.jsx";
import { TbColorSwatch } from "react-icons/tb";
import { GoUnlock } from "react-icons/go";
import {
  IoLogInOutline,
  IoPower,
  IoReorderThreeOutline,
  IoSearchOutline,
  IoBagOutline,
  IoReceiptOutline,
} from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { formatPrice } from "../../../helpers/helpers.js";
import img from "../../../assets/Logo/EspacioBaco_tinto+champagne.png";
import { DetailsOrder } from "../detailsOrder/detailsOrder.jsx";
export const NavBar = () => {
  const [primeraLetra, setPrimeraLetra] = useState();
  const [search, setSearch] = useState("");
  const {
    products,
    changeTheme,
    user,
    setUser,
    isAuthenticated,
    cerrarSesion,
    loading,
    carrito,
    userOrders,
  } = useContexto();

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("espacioBacoTheme");
    if (storedTheme) {
      changeTheme(storedTheme);
    }
  }, [changeTheme]);

  useEffect(() => {
    if (user && user.nombre) {
      setPrimeraLetra(user.nombre.charAt(0));
    } else {
      setPrimeraLetra("");
    }
  }, [setUser, user, isAuthenticated]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  let results = [];
  if (!search) {
    results = [];
  } else {
    results = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(search.toLowerCase()) ||
        product.descripcion_corta
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.nombreBodega.toLowerCase().includes(search.toLowerCase()) ||
        product.tipo.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <div className="fixed top-0 h-auto w-full z-40">
      <div className="w-full h-full bg-base-100">
        <div className="navbar">
          <div className="navbar-start">
            {/*Hamburger*/}
            <div className="dropdown dropdown-bottom md:hidden">
              <div
                tabIndex={0}
                role="button"
                className=" btn btn-ghost btn-circle"
              >
                <IoReorderThreeOutline className="text-2xl" />
              </div>
              <ul
                tabIndex={0}
                className=" text-primary menu menu-sm flex justify-center items-center py-10  gap-10 -ml-2 dropdown-content mt-2 z-[1] shadow bg-base-100 w-screen"
              >
                <Link
                  to="/"
                  className={`uppercase ${location.pathname === "/" ? "" : ""}`}
                  style={{ letterSpacing: "6px" }}
                >
                  Inicio
                </Link>
                <Link
                  to="/vinoteca"
                  className={`uppercase ${
                    location.pathname === "/vinoteca" ? "" : ""
                  }`}
                  style={{ letterSpacing: "6px" }}
                >
                  Vinoteca
                </Link>
                <Link
                  to="/nosotros"
                  className={`uppercase ${
                    location.pathname === "/nosotros" ? "" : ""
                  }`}
                  style={{ letterSpacing: "6px" }}
                >
                  Nosotros
                </Link>
              </ul>
            </div>
          </div>

          <Link to="/" className="absolute -top-2 left-4 z-50">
            <div
              style={{ letterSpacing: "8px", fontWeight: "bolder" }}
              className="hidden md:block text-xl uppercase cursor-pointer select-none w-full"
            >
              <img src={img} alt="Logo" className="w-40 h-full my-2" />
            </div>
          </Link>
          <div className="border-2 navbar-center md:mb-2 w-1/2 md:w-2/3 dropdown dropdown-end">
            <div className="flex justify-start items-center w-full px-5">
              <IoSearchOutline className="text-xl md:text-2xl mx-2 text-gray-500" />
              <input
                onChange={searcher}
                type="text"
                placeholder="Buscar..."
                className="text-sm w-full  p-2 md:p-4 bg-transparent focus:outline-none"
              />
            </div>

            <ul className="mt-1 p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-b-badge w-full">
              {results.length > 0 ? (
                results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={`/vinoteca/detalles-vino/${product.id}`}
                      style={{ letterSpacing: "1px" }}
                      className="hover:text-base-100 hover:bg-primary rounded-badge p-2 flex"
                    >
                      <div className="hidden md:block avatar">
                        <div className=" w-16 rounded-sm">
                          <img
                            src={product.imagen}
                            className="object-fill bg-base-100"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <div className="flex gap-2">
                          <p>{product.nombre}</p>
                          <p>${product.precio}</p>
                        </div>

                        <p className="hidden md:block text-xs">
                          {product.descripcion_corta}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  {search ? (
                    <li className="hover:text-base-100 hover:bg-primary rounded-badge p-2 text-xs text-center">
                      No se encontraron resultados para tu búsqueda.
                    </li>
                  ) : (
                    <li className="hover:text-base-100 hover:bg-primary rounded-badge p-2 text-xs text-center">
                      {loading
                        ? "Cargando vinos..."
                        : "Ingresa un nombre, tipo, bodega de vino para buscarlo."}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          <div className="navbar-end m-2 md:gap-2">
            <div
              tabIndex={0}
              className="hidden btn-circle dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <TbColorSwatch className="text-xl md:text-2xl" />
              </div>
              <div
                tabIndex={0}
                className="rounded-badge dropdown-content max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-10rem)] w-48 md:w-56 overflow-y-auto bg-base-100 flex flex-col gap-2 p-4 z-50"
              >
                {themes.map((theme, index) => (
                  <button
                    data-theme={theme}
                    key={index}
                    className="px-4 py-3 gap-2 outline-offset-4 flex justify-evenly items-center rounded-badge bg-base-200 hover:scale-105 ease-in-out duration-100"
                    onClick={() => handleThemeChange(theme)}
                  >
                    <p
                      data-theme={theme}
                      className="flex-grow text-sm bg-base-200"
                    >
                      {theme}
                    </p>
                    <div className="flex h-full gap-1">
                      <span
                        data-theme={theme}
                        className="bg-primary rounded-badge w-2 text-primary"
                      >
                        .
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-secondary rounded-badge w-2 text-secondary"
                      >
                        .
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-accent rounded-badge w-2 text-accent"
                      >
                        .
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-neutral rounded-badge w-2 text-neutral"
                      >
                        .
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className=" -mx-2 md:mx-0 btn-circle md:bg-base-200 dropdown dropdown-end z-20">
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <AiOutlineUser className={`text-xl md:text-2xl ${isAuthenticated ? 'text-primary' : ''}`} />
              </div>
              <ul
                tabIndex={0}
                className="border border-base-300 md:top-14 flex flex-col items-center justify-center dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
              >
                {loading ? (
                  <div className="w-auto p-4 flex justify-center items-center gap-2">
                    <span className="loading loading-bars loading-md"></span>
                    <h1>Cargando...</h1>
                  </div>
                ) : (
                  <>
                    {isAuthenticated ? (
                      <div className="w-52 flex flex-col gap-1">
                        <li>
                          <Link to="/perfil" className="relative text-info bg-base-300">
                            <h2 className="p-2">Perfil</h2>
                            <div className="avatar placeholder absolute right-4">
                              <div className="bg-transparent border border-info rounded-full w-6">
                                <span
                                  style={{ fontWeight: "bold" }}
                                  className="text-sm text-info"
                                >
                                  {primeraLetra}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        {user && user.tipo == "admin" && (
                          <li>
                            <Link
                              to="/super-administrador"
                              className="relative text-base-100 bg-success" 
                            >
                              <h2 className="p-2">Administración</h2>
                              <GoUnlock className="absolute right-4 text-2xl text-base-100" />
                            </Link>
                          </li>
                        )}

                        <li onClick={cerrarSesion}>
                          <div className="relative text-base-100 bg-error">
                            <h2 className="p-2">Cerrar sesión</h2>
                            <IoPower  className="absolute right-4 text-2xl text-base-100" />
                          </div>
                        </li>
                      </div>
                    ) : (
                      <div className="w-52">
                        <li>
                          <Link
                            to="/iniciar-sesion"
                            style={{ letterSpacing: "2px" }}
                            className="relative"
                          >
                            <h2 className="p-2">Iniciar sesión</h2>
                            <IoLogInOutline className="text-2xl absolute right-4 text-primary" />
                          </Link>
                        </li>
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>

            <div
              tabIndex={0}
              className="btn-circle md:bg-base-200 dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <div className="indicator">
                  <IoBagOutline className="text-xl md:text-2xl" />
                  {carrito.productos.length > 0 && (
                    <span className="badge badge-xs badge-accent indicator-item"></span>
                  )}
                </div>
              </div>

              <div
                tabIndex={0}
                className="border border-base-300 md:top-14 relative rounded-badge dropdown-content h-auto max-h-[calc(100vh-90px)] w-72 md:w-96 overflow-hidden overflow-y-auto bg-base-100 flex flex-col gap-2 px-4 z-50"
              >
                <div className="sticky top-0 p-2 bg-base-100">
                  {loading ? (
                    <>
                      <div className="p-4 flex justify-center items-center gap-2">
                        <span className="loading loading-bars loading-md"></span>
                        <h1>Cargando...</h1>
                      </div>
                    </>
                  ) : (
                    <>
                      {!user ? (
                        <div className="flex flex-col justify-center items-center gap-5">
                          <h1 className="w-full text-start">¡Bienvenido!</h1>
                          <p className="text-xs">
                            Por favor, inicia sesión para agregar vinos al
                            carrito
                          </p>
                          <Link
                            to="/iniciar-sesion"
                            style={{ letterSpacing: "2px" }}
                            className="w-full btn btn-accent text-base-100 uppercase text-xs max-w-lg"
                          >
                            Ingresar
                          </Link>
                        </div>
                      ) : (
                        <div className="transition-all ease-in-out duration-1000">
                          <h1
                            style={{ letterSpacing: "4px" }}
                            className="-mt-2 py-4 font-semibold border-b sticky top-0 bg-base-100 z-10 uppercase"
                          >
                            Carrito
                          </h1>
                          <>
                            <div className="w-full p-4">
                              <p className="text-xs md:text-sm">
                                {carrito.envioGratis === false
                                  ? "Al gastar $10.000 o más obtendrás envío gratuito (disponible solo para la ciudad de Posadas)."
                                  : ""}
                              </p>
                            </div>
                            {carrito.productos.length < 1 ? (
                              <>
                                <div
                                  style={{
                                    minHeight: "50vh",
                                    letterSpacing: "2px",
                                  }}
                                  className="p-4 w-full flex flex-col justify-center items-center uppercase text-xs md:text-base"
                                >
                                  <p>Tú carrito está vacío</p>
                                </div>
                              </>
                            ) : (
                              <div className="w-full">
                                <div>
                                  {carrito.productos.map((producto) => (
                                    <DropdownItem
                                      key={producto.id}
                                      item={producto}
                                    />
                                  ))}
                                </div>
                                <div className="sticky bottom-2 bg-base-100 p-4  w-full h-auto  flex flex-col items-center">
                                  <div className="w-full h-auto my-2 flex justify-between text-xs">
                                    <h2>
                                      Productos({carrito.cantidadProductos})
                                    </h2>
                                    <h3>${formatPrice(carrito.total)}</h3>
                                  </div>
                                  {carrito.envioGratis && (
                                    <div className="w-full flex mb-2 justify-between text-xs">
                                      <h2>Envios</h2>
                                      <h3 className="text-success">Gratis</h3>
                                    </div>
                                  )}
                                  <div className="w-full flex mb-2 justify-between">
                                    <h1
                                      style={{ letterSpacing: "5px" }}
                                      className="bold text uppercase"
                                    >
                                      Total
                                    </h1>
                                    <h1 className="bold">
                                      ${formatPrice(carrito.total)}
                                    </h1>
                                  </div>
                                  <Link
                                    to="/detalles-compra"
                                    className="w-full btn text-base-100 hover:text-base-100 bg-accent"
                                  >
                                    Continuar Compra
                                  </Link>
                                </div>
                              </div>
                            )}
                          </>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            {userOrders && (
              <div
                tabIndex={0}
                className="btn-circle dropdown md:bg-base-200 dropdown-end max-h-[calc(100vh-300px)]"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="w-full h-full flex justify-center items-center cursor-pointer select-none"
                >
                  <div className="indicator">
                    <IoReceiptOutline className="text-xl md:text-2xl" />
                    <span className="badge badge-xs badge-error indicator-item"></span>
                  </div>
                  <div
                    tabIndex={0}
                    className="cursor-default border border-base-300 top-12 md:top-14 rounded-badge dropdown-content h-auto max-h-[calc(100vh-90px)] w-80 md:w-96 overflow-hidden overflow-y-auto bg-base-100 flex flex-col gap-2 z-50"
                  >
                    <DetailsOrder userOrders={userOrders} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="overflow-hidden relative transition-all hidden w-auto md:flex justify-center items-center gap-10 -mt-3 bg-base-100 text-primary">
          <Link
            to="/"
            className={`uppercase font-bold scale-105 p-5 hover:scale-110 transition-transform ${
              location.pathname === "/" ? "" : ""
            }`}
            style={{ letterSpacing: "6px", fontSize: "10px" }}
          >
            Inicio
          </Link>
          <Link
            to="/vinoteca"
            className={`uppercase font-bold scale-105 p-5 hover:scale-110 transition-transform ${
              location.pathname === "/vinoteca" ? "" : ""
            }`}
            style={{ letterSpacing: "6px", fontSize: "10px" }}
          >
            Vinoteca
          </Link>
          <Link
            to="/nosotros"
            className={`uppercase font-bold scale-105 p-5 hover:scale-110 transition-transform ${
              location.pathname === "/nosotros" ? "" : ""
            }`}
            style={{ letterSpacing: "6px", fontSize: "10px" }}
          >
            Nosotros
          </Link>
        </nav>
      </div>
    </div>
  );
};
