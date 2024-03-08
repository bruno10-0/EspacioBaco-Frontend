import { LiaEyeSolid } from "react-icons/lia";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
export const OptionsAdmin = () => {
  return (
    <div className="">
      <div className=" flex flex-col gap-4 m-6">
        <h1 style={{ letterSpacing: "2px" }} className="">
          Bienvendo, Admin1
        </h1>
        <h2 style={{ letterSpacing: "2px" }} className="text-xs">
          Aquí es donde la magia sucede. Tu papel como administrador es clave
          para mantener todo en orden y en marcha.{" "}
        </h2>
      </div>
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <div className="w-full bg-base-100 glass p-4 col-span-1 rounded-badge shadow-lg">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="flex gap-2">
              <IoCreateOutline className="text-2xl" />
              <h1>Crear</h1>
            </div>
            <p>
              En esta seccion podras crear todo tus productos y mostrarlos a los
              clientes.
            </p>
            <button className="btn bg-accent text-base-100 hover:text-primary">
              Crear
            </button>
          </div>
        </div>

        <div className="w-full bg-base-100 glass p-4 col-span-1 rounded-badge shadow-lg">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="flex gap-2">
              <LiaEyeSolid className="text-2xl" />
              <h1>Visualizar</h1>
            </div>
            <p>En esta seccion podras visualizar todo tu stock de vinos.</p>
            <button className="btn bg-accent text-base-100 hover:text-primary">
              Ver
            </button>
          </div>
        </div>

        <div className="w-full bg-base-100 glass p-4 col-span-1 rounded-badge shadow-lg">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="flex gap-2">
              <AiOutlineDelete className="text-2xl" />
              <h1>Eliminar</h1>
            </div>
            <p>
              En esta seccion podras eliminar registros de tu stock de vinos.
            </p>
            <button className="btn bg-accent text-base-100 hover:text-primary">
              Eliminar
            </button>
          </div>
        </div>

        <div className="w-full bg-base-100 glass p-4 col-span-1 rounded-badge shadow-lg">
          <div className="w-full h-full flex flex-col gap-2">
            <div className="flex gap-2">
              <CiEdit className="text-2xl" />
              <h1>Editar</h1>
            </div>
            <p>
              En esta seccion podras editar registros de tu stock de vinos.
            </p>
            <button className="btn bg-accent text-base-100 hover:text-primary">
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
