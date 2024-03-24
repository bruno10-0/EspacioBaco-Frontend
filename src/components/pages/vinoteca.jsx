import { Footer } from "../common/footer/footer";
import { Card } from "../common/card/card";
import { Pagination } from "../common/pagination/pagination";
import { useState } from "react";
import { getProducts } from "../../api/auth.js";
import { useEffect } from "react";
import { NavBar } from "../common/navBar/navBar.jsx";
import { Loading } from "../common/loading/loading.jsx";
export const VinoTeca = () => {
  const [products, setProducts] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  const maximo = products.length / porPagina;
  console.log(products);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
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
        className="flex flex-col justify-center items-center w-full h-auto mt-16 md:mt-32 p-10 bg-base-200"
      >
        <div className="flex gap-2 w-full md:w-3/4 mb-4">
          <label
            htmlFor="my-drawer"
            style={{ letterSpacing: "2px" }}
            className="text-xs btn btn-accent text-base-100 uppercase drawer-button rounded-badge"
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
              className=" mt-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Precio. Alto a Bajo</a>
              </li>
              <li>
                <a>Precio. Bajo a Alto</a>
              </li>
              <li>
                <a>Fecha. Nuevo a Viejo</a>
              </li>
              <li>
                <a>Fecha. Viejo a Nuevo</a>
              </li>
            </ul>
          </div>
        </div>
        {products.length != 0 && (
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
        {products.length === 0 && <Loading />}
        {products.length != 0 && (
          <div className="w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-5">
            <>
              {products
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
