import { Link } from "react-router-dom";
export const CardAdministration = ({ titulo, icono, descripcion }) => {
  return (
    <div className="shadow-lg relative px-6 py-2 w-full h-full bg-base-100 rounded-badge scale-95 hover:scale-100 transition-transform ease-in-out">
      <div className="absolute top-0 left-0 w-full p-2 bg-primary ">
        <h1 style={{ letterSpacing: "4px" }} className="text-base-100">
          {titulo}
        </h1>
      </div>
      <div
        style={{ letterSpacing: "4px" }}
        className="justify-center items-center py-20 px-2 mt-6 flex flex-col text-center w-full gap-4"
      >
        <span className="text-primary text-7xl">{icono}</span>
        <p className="text-xs">{descripcion}</p>
      </div>
    </div>
  );
};
