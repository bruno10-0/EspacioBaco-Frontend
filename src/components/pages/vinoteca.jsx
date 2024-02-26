import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { Card } from "../common/card/card";
import { Pagination } from "../common/pagination/pagination";
import { useState } from "react";
import vino from "./vinos.json";
export const VinoTeca = () => {
  const [pagina, setPagina] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [porPagina, setPorPagina] = useState(8);

  const maximo = vino.length / porPagina;

  return (
    <div>
      <NavBar />
      <div
        className="flex justify-center items-center w-full h-auto bg-base-200"
        style={{ marginTop: "70px" }}
      >
        <div className="h-auto w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-5 m-4">
          {vino
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
