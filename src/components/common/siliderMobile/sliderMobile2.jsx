import React, { useEffect, useState } from "react";
import { Card } from "../card/card";
import { useContexto } from "../../../context/Context";
import { Link } from "react-router-dom";
import { obtenerObjetosMasRecientes } from "../../../helpers/helpers.js";
import { getProducts } from "../../../api/auth";
import { Loading3 } from "../loading/loading3.jsx";
export const SliderMobile2 = () => {
  const { products, setProducts } = useContexto();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setProducts(products);
    setProductos(obtenerObjetosMasRecientes(products));
  }, [products]);

  useEffect(() => {
    setCargando(true);
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProducts();
    setCargando(false);
  }, []);

  return (
    <div className="my-6 w-full overflow-x-auto">
      {!cargando ? (
        <>
          <h1 style={{ letterSpacing: "2px" }} className="mb-4 px-6">
            Selección fresca de vinos mas recientes.
          </h1>
          <div className="carousel p-6 gap-2 w-full">
            {productos?.map((producto) => (
              <div className="carousel-item mx-auto">
                <Card key={producto.id} product={producto} />
              </div>
            ))}
          </div>
          <div className="px-6 w-full flex justify-start items-center">
            <Link
              to="/vinoteca"
              style={{ letterSpacing: "2px" }}
              className="text-xs btn btn-accent text-base-100 rounded-badge p-2 uppercase"
              aria-label="Ver todos los productos"
            >
              Ver todos
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loading3 loadingText="Buscando los ultimos productos..." />
        </div>
      )}
    </div>
  );
};
