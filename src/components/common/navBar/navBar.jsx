import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context.jsx";
import { Link } from "react-router-dom";
import { themes } from "../../../constants/themes.js";
import { DropdownItem } from "../dropdownItem/dropdownItem.jsx";
import { TbColorSwatch } from "react-icons/tb";
import { GrUserAdmin } from "react-icons/gr";
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoReorderThreeOutline,
  IoSearchOutline,
  IoBagOutline,
} from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Loading } from "../loading/loading.jsx";
import img from "../../../assets/EspacioBaco_negro.png";
import { getProducts } from "../../../api/auth.js";
export const NavBar = () => {
  const [primeraLetra, setPrimeraLetra] = useState();
  const [search, setSearch] = useState("");
  const {
    products,
    setProducts,
    changeTheme,
    cartList,
    total,
    cantidad,
    envioGratis,
    user,
    setUser,
    isAuthenticated,
    cerrarSesion,
    loading,
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };

  let results = [];

  if (!search) {
    results = [];
  } else {
    results = products.filter((product) =>
      product.nombre.toLowerCase().includes(search.toLowerCase())
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
                className=" text-base-100 menu menu-sm flex justify-center items-center p-4  gap-10 -ml-2 dropdown-content mt-2 z-[1] shadow bg-primary w-screen"
              >
                <Link
                  to="/"
                  className={`uppercase text-xs p-2 ${
                    location.pathname === "/"
                      ? "border-b border-base-100   scale-110"
                      : ""
                  }`}
                  style={{ letterSpacing: "6px" }}
                >
                  Inicio
                </Link>
                <Link
                  to="/vinoteca"
                  className={`uppercase text-xs p-2 ${
                    location.pathname === "/vinoteca"
                      ? "border-b border-base-100  scale-110"
                      : ""
                  }`}
                  style={{ letterSpacing: "6px" }}
                >
                  Vinoteca
                </Link>
                <Link
                  to="/nosotros"
                  className={`uppercase text-xs p-2 ${
                    location.pathname === "/nosotros"
                      ? "border-b border-base-100  scale-110"
                      : ""
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
              <img src={img} alt="Logo" className="w-32 h-full my-2" />
            </div>
          </Link>

          <div className="navbar-center border-2 rounded-t-badge md:mb-2 w-1/2 md:w-2/3  dropdown dropdown-end">
            <div className="flex justify-start items-center w-full px-5">
              <IoSearchOutline className="text-2xl mx-2 text-gray-500" />
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
                      <p>{product.nombre}</p>
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
                        : "Ingresa un nombre de vino para buscarlo."}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/*User, cart search, theme*/}
          <div className="navbar-end">
            <div
              tabIndex={0}
              className="btn-circle dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <TbColorSwatch className="text-2xl" />
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

            <div className="btn-circle dropdown dropdown-end z-20">
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <AiOutlineUser className="text-2xl" />
              </div>
              <ul
                tabIndex={0}
                className="flex flex-col items-center justify-center dropdown-content z-[1] menu shadow bg-base-100 rounded-box"
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
                          <Link to="/perfil" className="relative">
                            <h2 className="p-2">Perfil</h2>
                            <div className="avatar placeholder absolute right-4">
                              <div className="bg-transparent border-2 border-primary rounded-full w-6">
                                <span
                                  style={{ fontWeight: "bold" }}
                                  className="text-sm text-primary"
                                >
                                  {primeraLetra}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </li>
                        {user && user.tipo == "admin" && (
                          <li>
                            <Link to="/admin" className="relative">
                              <h2 className="p-2">Administración</h2>
                              <GrUserAdmin className="text-2xl absolute right-4 text-primary" />
                            </Link>
                          </li>
                        )}

                        <li onClick={cerrarSesion}>
                          <div className="relative">
                            <h2 className="p-2">Cerrar sesión</h2>
                            <IoLogOutOutline className="text-2xl absolute right-4 text-primary" />
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
              className="btn-circle dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <div className="indicator">
                  <IoBagOutline className="text-2xl" />
                  {cartList.length > 0 && (
                    <span className="badge badge-xs badge-accent indicator-item"></span>
                  )}
                </div>
              </div>

              <div
                tabIndex={0}
                className="relative rounded-badge dropdown-content h-auto max-h-[calc(100vh-90px)] w-72 md:w-96 overflow-hidden overflow-y-auto bg-base-100 flex flex-col gap-2 px-4 z-50"
              >
                <div className="sticky top-0 p-2 bg-base-100">
                  <h1
                    style={{ letterSpacing: "4px" }}
                    className="uppercase py-2 font-semibold"
                  >
                    Carrito
                  </h1>
                  {!envioGratis && (
                    <h2
                      className="border-y py-2"
                      style={{ letterSpacing: "0px", fontSize: "12px" }}
                    >
                      Gasta $100 o más y obtén envío gratis! (SOLO DISPONIBLE
                      PARA PEDIDOS DE POSADAS)
                    </h2>
                  )}

                  {envioGratis && (
                    <h2
                      className="border-y py-2 text-success"
                      style={{ letterSpacing: "0px", fontSize: "12px" }}
                    >
                      Felicidades, tus compras califican para envío gratuito.
                    </h2>
                  )}

                  {loading ? (
                    <div>
                      <div className="w-auto p-4 flex justify-center items-center gap-2">
                        <span className="loading loading-bars loading-md"></span>
                        <h1>Cargando...</h1>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {cartList.length < 1 && (
                        <div>
                          <div
                            style={{ letterSpacing: "4px" }}
                            className="text-xs flex justify-center items-center p-4 gap-4 uppercase"
                          >
                            Carrito vacio
                          </div>
                          <Link
                            to="/vinoteca"
                            className="my-2 w-full btn btn-accent text-base-100 rounded-badge p-2 uppercase"
                          >
                            <h2
                              style={{ letterSpacing: "2px" }}
                              className="text-xs uppercase"
                            >
                              Explorar tienda
                            </h2>
                          </Link>
                        </div>
                      )}

                      {cartList.length >= 1 && (
                        <div>
                          {cartList.map(
                            (item, index) =>
                              <DropdownItem key={index} item={item} /> || (
                                <Loading />
                              )
                          )}

                          <div className="sticky bottom-0 bg-base-100 p-4  w-full h-auto  flex flex-col items-center">
                            <div className="w-full h-auto my-2 flex justify-between text-xs">
                              <h2>Productos({cantidad})</h2>
                              <h3>${total}</h3>
                            </div>
                            {envioGratis && (
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
                              <h1 className="bold">${total}</h1>
                            </div>
                            <button className="w-full btn text-base-100 hover:text-primary bg-accent">
                              Continuar Compra
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="hidden w-auto md:flex justify-center items-center gap-6 p-3 -mt-2 bg-primary text-base-100 font-semibold">
          <Link
            to="/"
            className={`uppercase text-xs p-2 ${
              location.pathname === "/"
                ? "border-b border-base-100  scale-110"
                : ""
            }`}
            style={{ letterSpacing: "6px" }}
          >
            Inicio
          </Link>
          <Link
            to="/vinoteca"
            className={`uppercase text-xs p-2 ${
              location.pathname === "/vinoteca"
                ? "border-b border-base-100  scale-110"
                : ""
            }`}
            style={{ letterSpacing: "6px" }}
          >
            Vinoteca
          </Link>
          <Link
            to="/nosotros"
            className={`uppercase text-xs p-2 ${
              location.pathname === "/nosotros"
                ? "border-b border-base-100  scale-110"
                : ""
            }`}
            style={{ letterSpacing: "6px" }}
          >
            Nosotros
          </Link>
        </nav>
      </div>
    </div>
  );
};
