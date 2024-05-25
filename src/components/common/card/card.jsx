import { Link } from "react-router-dom";
import { isNew } from "../../../helpers/helpers.js";
import "./card.css";

export const Card = ({ product }) => {
  return (
    <div
      className="Card bg-base-100 rounded-badge shadow-lg p-2"
      style={{ textDecoration: "none" }}
    >
      <div
        className="flex justify-center items-center"
        style={{ height: "220px", flexShrink: "0" }}
      >
        <img
          src={product.imagen}
          alt={product.nombre}
          className="max-w-full max-h-full object-contain object-center"
        />
      </div>

      <div className="flex flex-col items-center justify-evenly gap-2 p-2">
        <div className="h-20">
          <h1
            className="text-center text-primary"
            style={{
              fontWeight: "bolder",
              letterSpacing: "2px",
              fontSize: "14px",
            }}
          >
            {product.nombre}
          </h1>
          <h2 style={{ letterSpacing: "2px", fontSize: "10px" }}>
            {product.descripcion_corta}
          </h2>
        </div>

        <div className="w-full h-auto flex justify-between items-center px-4 gap-1">
          <h3
            className="text-accent"
            style={{ letterSpacing: "2px", fontSize: "12px" }}
          >
            ${product.precio}
          </h3>
          <Link
            aria-label="comprar el produco"
            to={`/vinoteca/detalles-vino/${product.id}`}
            style={{ fontSize: "10px", letterSpacing: "2px" }}
            className="h-full btn btn-accent text-base-100 rounded-badge p-2 uppercase"
          >
            Lo quiero
          </Link>
        </div>
        <div className="w-full flex absolute -top-2 gap-1">
          {isNew(product.createdAt) && (
            <span className="indicator-item badge badge-secondary select-none">
              Nuevo
            </span>
          )}
          <span
            className="indicator-item badge badge-primary select-none cursor-pointer"
            onClick={() =>
              document.getElementById(`my_modal_${product.id}`).showModal()
            }
          >
            Info
          </span>
          <dialog id={`my_modal_${product.id}`} className="modal">
            <div className="modal-box">
              <h1 style={{ letterSpacing: "2px" }} className="font-semibold">
                {product.nombre}
              </h1>
              <p className="text-sm mt-2">
                Producido en{" "}
                <span className="text-primary">{product.pais}</span>, en la
                región de <span className="text-primary">{product.region}</span>
                , en el año {product.año}. Este vino es de tipo{" "}
                <span className="text-primary">{product.tipo}</span>.
              </p>
              <p className="text-sm mt-2">
                Ideal para maridar con{" "}
                <span className="text-primary">{product.maridaje}</span> o
                disfrutarlo como acompañamiento.
              </p>

              <div className="modal-action">
                <form method="dialog">
                  <button
                    style={{ letterSpacing: "2px" }}
                    className="btn text-xs btn-accent text-base-100 uppercase"
                  >
                    Ok!
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          {/*<Link className="indicator-item badge badge-accent">Info</Link>*/}
        </div>
      </div>
    </div>
  );
};
