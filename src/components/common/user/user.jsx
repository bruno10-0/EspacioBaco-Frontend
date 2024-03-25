import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context";
import { getFecha } from "../../../utils/getFecha.js";
export const User = () => {
  const { user, setUser, isAuthenticated } = useContexto();
  const [primeraLetra, setPrimeraLetra] = useState();
  const fecha = getFecha(user.creacion);

  useEffect(() => {
    if (user && user.nombre) {
      setPrimeraLetra(user.nombre.charAt(0));
    } else {
      setPrimeraLetra("");
    }
  }, [setUser, user, isAuthenticated]);
  return (
    <div
      style={{ height: "calc(100vh - 110px)" }}
      className="relative mt-16 md:mt-32 w-full h-screen flex items-center justify-center"
    >
      <div className="absolute top-0 bg-primary text-center text-base-100 w-full p-2 text-xs">
        Sección en desarrollo, próximamente te traeremos novedades que mejoren
        tu experiencia en EspacioBaco.
      </div>
      <div className=" relative w-full mt-10 md:mt-0 md:w-2/3 flex flex-col h-full items-center justify-start">
        <div className="avatar placeholder mt-14 md:mt-10 mb-4">
          <div className="bg-neutral text-neutral-content rounded-full w-24 md:w-48">
            <span className="text-5xl">{primeraLetra}</span>
          </div>
        </div>
        <div
          style={{ letterSpacing: "2px" }}
          className="flex gap-1 text-sm font-bold mb-2"
        >
          <h2>Hola,</h2>
          <h2>{user.nombre}</h2>
          <h2>{user.apellido}.</h2>
        </div>
        <div className="text-xs text-gray-500">
          <h3>Te uniste el: {fecha}</h3>
        </div>

        <div className="mt-10 w-full flex justify-around items-center gap-5 text-center">
          <div className="w-2/5 p-4 flex flex-col md:flex-row items-center justify-around gap-2">
            <div className="flex flex-col">
              <h1
                style={{ letterSpacing: "2px" }}
                className="font-bold text-base"
              >
                Dirección:
              </h1>
              <h2 className="text-sm">{user.direccion}</h2>
            </div>
            <div className="flex flex-col">
              <h1
                style={{ letterSpacing: "2px" }}
                className="font-bold text-base"
              >
                Teléfono:
              </h1>
              <h2 className="text-sm">{user.telefono}</h2>
            </div>
          </div>
          <div className="w-2/5 p-4 flex flex-col md:flex-row items-center justify-around gap-2">
            <div className="flex flex-col">
              <h1
                style={{ letterSpacing: "2px" }}
                className="font-bold text-base"
              >
                Nombre:
              </h1>
              <h2 className="text-sm">{user.nombre}</h2>
            </div>
            <div className="flex flex-col">
              <h1
                style={{ letterSpacing: "2px" }}
                className="font-bold text-base"
              >
                Apellido:
              </h1>
              <h2 className="text-sm">{user.apellido}</h2>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 w-full text-center p-2 text-xs mt-16">
          <p>
            Para asegurarnos de que reciba sus productos sin problemas, le
            pedimos que verifique y confirme la precisión de su información de
            contacto.
          </p>
        </div>
      </div>
    </div>
  );
};
