import { useState, useEffect } from "react";
import { useContexto } from "../../../context/Context";
import { getFecha } from "../../../utils/getFecha.js";
import { RiEditBoxLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FormComponent } from "./FormComponent.jsx";
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
        <div className="w-full md:w-1/2 rounded-lg shadow-lg flex flex-col justify-center items-center">
          <div className="bg-base-100 w-full flex flex-col justify-center items-center gap-4 p-10 relative">
            <div className="avatar placeholder mt-14 md:mt-10 mb-4">
              <div className="bg-primary text-neutral-content rounded-full w-32">
                <span className="text-5xl">{primeraLetra}</span>
              </div>
            </div>
            <h1 className="text-xl font-extrabold">
              {user.nombre} {user.apellido}{" "}
            </h1>
            <h3 className="text-info">{user.correo}</h3>

            <RiEditBoxLine
              onClick={() =>
                document.getElementById("modalEditarPerfil").showModal()
              }
              className="text-3xl absolute top-4 right-4 cursor-pointer"
            />
            <dialog id="modalEditarPerfil" className="modal">
              <div className="modal-box relative">
                <h3 className="font-bold text-lg">Editar datos</h3>
                <FormComponent/>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn absolute top-2 right-2 text-red-500">
                      <IoClose />
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>

          <div className="bg-base-300 w-full grid gap-6 grid-cols-1 md:grid-cols-2 p-10">
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
