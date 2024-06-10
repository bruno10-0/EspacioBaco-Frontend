import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context";
import { getFecha } from "../../../utils/getFecha.js";
import { RiEditBoxLine } from "react-icons/ri";
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
    <div>
      <div className="md:p-10 mt-20 md:mt-32 w-full h-auto flex items-center justify-center">
        <div className="w-full md:w-2/5 rounded-lg border shadow-lg flex flex-col justify-center items-center">
          <div className="bg-base-300 w-full flex flex-col justify-center items-center gap-4 p-10 relative">
            <div className="avatar placeholder mt-14 md:mt-10 mb-4">
              <div className="bg-neutral text-neutral-content rounded-full w-32">
                <span className="text-5xl">{primeraLetra}</span>
              </div>
            </div>
            <h1 className="text-xl font-extrabold">
              {user.nombre} {user.apellido}{" "}
            </h1>
            <h3 className="text-neutral-600">{user.correo}</h3>

            <RiEditBoxLine className="text-3xl absolute top-4 right-4 cursor-pointer" />
          </div>

          <div className="w-full grid gap-6 grid-cols-1 md:grid-cols-2 p-10">
            <div className="w-full flex flex-col gap-2">
              <h2 className="text-sm">Celular</h2>
              <h3 className="font-semibold">{user.telefono}</h3>
            </div>

            <div className="w-full flex flex-col gap-2">
              <h2 className="text-sm">Creación</h2>
              <h3 className="font-semibold">{fecha}</h3>
            </div>

            <div className="w-full flex flex-col gap-2">
              <h2 className="text-sm">Correo Electrónico</h2>
              <h3 className="font-semibold">{user.correo}</h3>
            </div>

            <div className="w-full flex flex-col gap-2">
              <h2 className="text-sm">Dirección</h2>
              <h3 className="font-semibold">{user.direccion}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary text-base-100 text-sm w-full p-2 text-center">
        Esta información es privada y se utilizará exclusivamente para ponernos
        en contacto contigo.
      </div>
    </div>
  );
};
