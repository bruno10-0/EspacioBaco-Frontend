import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { Card } from "../common/card/card";
import { Pagination } from "../common/pagination/pagination";
import { useState } from "react";
import { getProducts } from "../../api/auth.js";
import { useEffect } from "react";
export const VinoTeca = () => {

  const [products, setProducts] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(8);
  const maximo = products.length / porPagina;

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
        className="flex justify-center items-center w-full h-auto bg-base-200"
        style={{ marginTop: "70px" }}
      >
        <div className="h-auto w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-5 m-4">
          {products
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((product) => (
              <Card key={product.id} product={product} />
            ))}
          <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
