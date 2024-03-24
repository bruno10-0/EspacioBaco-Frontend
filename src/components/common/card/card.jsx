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
              fontWeight: "bold",
              fontStyle: "italic",
              letterSpacing: "2px",
              fontSize: "13px",
            }}
          >
            {product.nombre}
          </h1>
          <h2 style={{ letterSpacing: "2px", fontSize: "12px" }}>
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
            to={`detalles-vino/${product.id}`}
            style={{ fontSize: "10px", letterSpacing: "2px" }}
            className="h-full btn btn-accent text-base-100 rounded-badge p-2 uppercase"
          >
            Lo quiero
          </Link>
        </div>
        <div className="w-full flex absolute -top-2 gap-1">
          {isNew(product.updatedAt) && (
            <Link className="indicator-item badge badge-secondary">New</Link>
          )}
          {/*<Link className="indicator-item badge badge-accent">Info</Link>*/}
        </div>
      </div>
    </div>
  );
};
