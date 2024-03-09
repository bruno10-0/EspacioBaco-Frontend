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
        className="flex justify-center items-center w-full h-auto mt-16 md:mt-28 p-10 bg-base-200"
      >
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
