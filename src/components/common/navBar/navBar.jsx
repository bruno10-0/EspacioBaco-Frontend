import { useState, useEffect } from "react";
import { useRef } from "react";
import { useContexto } from "../../../context/Context.jsx";
import { Link, useLocation } from "react-router-dom";
import { themes } from "../../../constants/themes.js";
import { DropdownItem } from "../dropdownItem/dropdownItem.jsx";
import { TbColorSwatch } from "react-icons/tb";
import {
  IoReorderThreeOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoBagOutline,
} from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

export const NavBar = () => {
  const { changeTheme, cartList, total, cantidad, envioGratis } = useContexto();

  const detailsRef = useRef(null);

  const handleCloseDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

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

  return (
    <div className="fixed top-0 h-auto w-full z-40">
      <div className="w-full h-full bg-base-100 ">
        <div
          className="navbar "
          style={{ transition: "background-color 0.3s ease" }}
        >
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
                      ? "border-b border-base-100 scale-110"
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
                      ? "border-b border-base-100 scale-110"
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
                      ? "border-b border-base-100 scale-110"
                      : ""
                  }`}
                  style={{ letterSpacing: "6px" }}
                >
                  Nosotros
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar-center">
            <a
              style={{ letterSpacing: "8px", fontWeight: "bolder" }}
              className="hidden md:block text-xl uppercase cursor-pointer select-none"
            >
              EspacioBaco
            </a>
          </div>

          {/*User, cart search, theme*/}
          <div className="navbar-end">
            <div
              tabIndex={0}
              className="btn btn-ghost btn-circle dropdown dropdown-end max-h-[calc(100vh-300px)]"
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
                className=" mt-3 md:mt-12 rounded-badge dropdown-content max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-10rem)] w-48 md:w-56 overflow-y-auto bg-base-100 flex flex-col gap-2 p-4 z-50"
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

            <Link to="/admin">
              <button className="btn btn-ghost btn-circle">
                <AiOutlineUser className="text-2xl" />
              </button>
            </Link>

            <div
              tabIndex={0}
              className="p-4 dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <div
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <div className="indicator">
                  <IoBagOutline className="text-2xl" />
                  {cartList.length > 0 && (
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  )}
                </div>
              </div>

              <div
                tabIndex={0}
                className="relative rounded-badge dropdown-content h-auto max-h-[calc(100vh-90px)] w-72 md:w-96 overflow-hidden overflow-y-auto bg-base-100 flex flex-col gap-2 px-4 mt-6 md:mt-16 z-50"
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
                        className="my-2 w-full btn bg-accent text-base-100 hover:text-primary"
                      >
                        <h2
                          style={{ letterSpacing: "2px" }}
                          className="text-xs uppercase"
                        >
                          Exporar tienda
                        </h2>
                      </Link>
                    </div>
                  )}
                </div>

                {cartList.length >= 1 && (
                  <div>
                    {cartList.map((item, index) => (
                      <DropdownItem key={index} item={item} />
                    ))}
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
            </div>

            <details
              ref={detailsRef}
              className="p-4 dropdown dropdown-end"
              tabIndex={0}
            >
              <summary
                tabIndex={0}
                role="button"
                className="w-full h-full flex justify-center items-center cursor-pointer select-none"
              >
                <IoSearchOutline className="text-2xl" />
              </summary>
              <ul
                tabIndex={0}
                className="mt-3 md:mt-16 dropdown-content z-[1] menu p-4 shadow bg-base-100 w-screen -mr-2"
              >
                <div className="w-full h-full flex px-0 md:px-5 lg:px-10 items-center">
                  <IoSearchOutline className="text-2xl text-gray-400" />
                  <input
                    autoFocus
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    type="text"
                    placeholder="BUSCAR..."
                    className="w-full p-2 bg-transparent mx-4 uppercase border-none"
                    style={{ letterSpacing: "2px" }}
                  />
                  <IoCloseOutline
                    onClick={handleCloseDetails}
                    className="text-2xl cursor-pointer text-gray-400"
                  />
                </div>
              </ul>
            </details>
          </div>
        </div>
        <nav className="hidden w-full md:flex justify-center items-center gap-6 p-3 -mt-3 bg-primary text-base-100">
          <Link
            to="/"
            className={`uppercase text-xs p-2 ${
              location.pathname === "/"
                ? "border-b border-base-100 text-base-100 scale-110"
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
                ? "border-b border-base-100 text-base-100 scale-110"
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
                ? "border-b border-base-100 text-base-100 scale-110"
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
