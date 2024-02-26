import { NavBar } from "../components/navBar/navBar"
import { Footer } from "../components/footer/footer"
import { Card } from "../components/card/card";
import { useState } from "react";
import { Pagination } from "../components/pagination/pagination";
import vino from "./vinos.json"
export const Bodega = () => {
  


  const [pagina, setPagina] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [porPagina, setPorPagina] = useState(8);

  const maximo = vino.length / porPagina;

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center w-full h-auto bg-base-200" style={{marginTop:"70px"}}>
        <div className="h-auto w-full md:w-3/4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-5 m-4">
          {vino
            .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
            .map((product) => (
              <Card key={product.id} product={product} />
            ))}
          <Pagination pagina={pagina} setPagina={setPagina} maximo={maximo} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
