import { Footer } from "../common/footer/footer";
import { Card } from "../common/card/card";
import { Pagination } from "../common/pagination/pagination";
import { useState } from "react";
import { useEffect } from "react";
import { NavBar } from "../common/navBar/navBar.jsx";
import { Loading } from "../common/loading/loading.jsx";
import { FaCheck } from "react-icons/fa";
import { MdOutlineRemove } from "react-icons/md";
import { getProducts } from "../../api/auth.js";
import { useContexto } from "../../context/Context.jsx";
import {
  ordenarPorFechaCreacion,
  ordenarPorFechaCreacionDesc,
  ordenarPorPrecioMayorAMenor,
  ordenarPorPrecioMenorAMayor,
} from "../../helpers/orderArray.js";

export const VinoTeca = () => {
  const { setProducts, products, handleOrdenamientoChange } = useContexto();
  const [productsCopy, setProductsCopy] = useState([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 8;
  const [order, setOrder] = useState(0);
  const maximo = productsCopy.length / porPagina;

  useEffect(() => {
    setProductsCopy(products);
  }, [products]);

  useEffect(() => {
    switch (order) {
      case 0:
        return;
      case 1:
        setProductsCopy([...ordenarPorPrecioMenorAMayor(productsCopy)]);
        break;
      case 2:
        setProductsCopy([...ordenarPorPrecioMayorAMenor(productsCopy)]);
        break;
      case 3:
        setProductsCopy([...ordenarPorFechaCreacion(productsCopy)]);
        break;
      case 4:
        setProductsCopy([...ordenarPorFechaCreacionDesc(productsCopy)]);
        break;
      default:
        alert("Ordenamiento no válido.");
    }
  }, [order]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <NavBar />
      <div
        style={{ minHeight: "calc(100vh - 120px)" }}
        className="flex flex-col justify-center items-center w-full h-auto mt-16 md:mt-28 p-10 bg-base-200"
      >
        {productsCopy.length !== 0 && (
          <div className="flex gap-2 w-full md:w-3/4 mb-4">
            <label
              htmlFor="my-drawer"
              style={{ letterSpacing: "2px" }}
              className="hidden text-xs btn btn-accent text-base-100 uppercase drawer-button rounded-badge"
            >
              Filtrar
            </label>
            <div className="dropdown">
              <label
                tabIndex={0}
                role="button"
                style={{ letterSpacing: "2px" }}
                className="text-xs btn btn-accent text-base-100 uppercase drawer-button rounded-badge"
              >
                Ordenar
              </label>
              <ul
                tabIndex={0}
                className=" mt-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60"
              >
                <li onClick={() => handleOrdenamientoChange(1, setOrder)}>
                  <div className="flex gap-1">
                    {order === 1 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Precio. Bajo a Alto
                  </div>
                </li>
                <li onClick={() => handleOrdenamientoChange(2, setOrder)}>
                  <div className="flex gap-1">
                    {order === 2 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Precio. Alto a Bajo
                  </div>
                </li>
                <li onClick={() => handleOrdenamientoChange(3, setOrder)}>
                  <div className="flex gap-1">
                    {order === 3 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Fecha. Viejo a Nuevo
                  </div>
                </li>
                <li onClick={() => handleOrdenamientoChange(4, setOrder)}>
                  <div className="flex gap-1">
                    {order === 4 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Fecha. Nuevo a Viejo
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {productsCopy.length != 0 && (
          <div className="flex justify-between w-full md:w-3/4 mb-4">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content"></div>
              <div style={{ zIndex: "80" }} className="drawer-side ">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul
                  style={{ letterSpacing: "2px" }}
                  className="text-xs menu p-4 w-80 min-h-full bg-base-200"
                >
                  <h1 className="mb-4 text-2xl">Filtros</h1>
                  <div className="join join-vertical w-full">
                    <div className="collapse collapse-arrow join-item border border-base-300">
                      <input
                        type="radio"
                        name="tipo-vinos"
                        id="vinos-blancos"
                        defaultChecked
                      />
                      <div className="collapse-title text-xl font-medium">
                        Vinos Blancos
                      </div>
                      <div className="collapse-content">
                        <ul>
                          <li>
                            <p>Chardonnay</p>
                          </li>
                          <li>
                            <p>Sauvignon Blanc</p>
                          </li>
                          <li>
                            <p>Riesling</p>
                          </li>
                          <li>
                            <p>Pinot Grigio/Gris</p>
                          </li>
                          <li>
                            <p>Gewürztraminer</p>
                          </li>
                          <li>
                            <p>Albariño</p>
                          </li>
                          <li>
                            <p>Verdejo</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                      <input type="radio" name="tipo-vinos" id="vinos-tintos" />
                      <div className="collapse-title text-xl font-medium">
                        Vinos Tintos
                      </div>
                      <div className="collapse-content">
                        <ul>
                          <li>
                            <p>Cabernet Sauvignon</p>
                          </li>
                          <li>
                            <p>Merlot</p>
                          </li>
                          <li>
                            <p>Pinot Noir</p>
                          </li>
                          <li>
                            <p>Syrah/Shiraz</p>
                          </li>
                          <li>
                            <p>Malbec</p>
                          </li>
                          <li>
                            <p>Tempranillo</p>
                          </li>
                          <li>
                            <p>Zinfandel</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                      <input type="radio" name="tipo-vinos" id="espumantes" />
                      <div className="collapse-title text-xl font-medium">
                        Espumantes
                      </div>
                      <div className="collapse-content">
                        <ul>
                          <li>
                            <p>Champagne</p>
                          </li>
                          <li>
                            <p>Cava</p>
                          </li>
                          <li>
                            <p>Prosecco</p>
                          </li>
                          <li>
                            <p>Espumante</p>
                          </li>
                          <li>
                            <p>Sparkling Shiraz</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border border-base-300">
                      <input
                        type="radio"
                        name="tipo-vinos"
                        id="vinos-rosados"
                      />
                      <div className="collapse-title text-xl font-medium">
                        Vinos Rosados
                      </div>
                      <div className="collapse-content">
                        <ul>
                          <li>
                            <p>Rosé de Pinot Noir</p>
                          </li>
                          <li>
                            <p>Rosé de Syrah</p>
                          </li>
                          <li>
                            <p>Rosé de Garnacha</p>
                          </li>
                          <li>
                            <p>Rosé de Cabernet Sauvignon</p>
                          </li>
                          <li>
                            <p>Rosé de Merlot</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        )}
        {productsCopy.length === 0 && <Loading />}
        {productsCopy.length != 0 && (
          <div className="w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-5">
            <>
              {productsCopy
                .slice(
                  (pagina - 1) * porPagina,
                  (pagina - 1) * porPagina + porPagina
                )
                .map((producto) => (
                  <Card key={producto.id} product={producto} />
                ))}
              <Pagination
                pagina={pagina}
                setPagina={setPagina}
                maximo={maximo}
              />
            </>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
