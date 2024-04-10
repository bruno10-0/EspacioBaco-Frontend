import pagaA from "../../../assets/Icons/EspacioBaco_IconoPAGA.png";
import pagaB from "../../../assets/Icons/EspacioBaco_IconoPAGA B.png";
import compraA from "../../../assets/Icons/EspacioBaco_IconoCOMPRA.png";
import compraB from "../../../assets/Icons/EspacioBaco_IconoCOMPRA B.png";
import encontraA from "../../../assets/Icons/EspacioBaco_IconoENCONTRA.png";
import encontraB from "../../../assets/Icons/EspacioBaco_IconoENCONTRA B.png";
import vinoA from "../../../assets/Icons/EspacioBaco_IconoDESCUBRI.png";
import vinoB from "../../../assets/Icons/EspacioBaco_IconoDESCUBRI B.png";
import "./sliderStyles.css";

export const SiliderMobile = () => {
  return (
    <div
      className="h-72 w-full flex justify-center items-center"
      style={{ top: "50%" }}
    >
      <div className="carousel w-full md:w-auto h-full p-2 gap-2">
        <div className="card1 z-10 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
          <h1 className="my-1" style={{ letterSpacing: "2px" }}>
            Medios de pago
          </h1>
          <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
            <img
              style={{ width: "110px" }}
              src={compraA}
              alt="logo Compra"
              className="compraA z-10 absolute"
            />
            <img
              src={compraB}
              alt="logo Compra"
              className="compraB z-10 w-20 absolute"
            />
          </div>
          <h2 className="text-center my-2 text-sm">
            Desarrollando medios de pago para tu confort
          </h2>
          {/*
          <button className="btn hover:text-primary text-base-100 border-none p-1 glass w-full text-sm bg-accent rounded-badge">
            Testimonios
</button>*/}
        </div>

        <div className="card2 z-10 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
          <h1 className="my-1" style={{ letterSpacing: "2px" }}>
            Buscar rapido
          </h1>
          <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
            <img
              style={{ width: "110px" }}
              src={encontraA}
              alt="logo Encontra"
              className="encontraA z-10 absolute"
            />
            <img
              src={encontraB}
              alt="logo Encontra"
              className="encontraB z-10 w-20 absolute"
            />
          </div>
          <h2 className="card5 text-center my-2 text-sm">
            Buscalo con palabras claves. Ejemplo: "Equilibrado"
          </h2>
          {/*
          <button className="btn hover:text-primary text-base-100 border-none p-1 glass w-full text-sm bg-accent rounded-badge">
            Ver
          </button>
          */}
        </div>

        <div className="card3 z-10 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 cursor-pointer">
          <h1 className="my-1" style={{ letterSpacing: "2px" }}>
            Oportunidades
          </h1>
          <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
            <img
              style={{ width: "110px" }}
              src={pagaA}
              alt="logo Encontra"
              className="PagaA z-10 absolute"
            />
            <img
              src={pagaB}
              alt="logo Encontra"
              className="PagaB z-10 w-20 absolute"
            />
          </div>
          <h2 className="text-center my-2 text-sm">
            Podes encontrar buenos vinos y de gran prestigio
          </h2>
          {/*
          <button className="btn hover:text-primary text-base-100 border-none p-1 glass w-full text-sm bg-accent rounded-badge">
            Ver
          </button>
        */}
        </div>

        <div className="card4 z-10 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
          <h1 className="my-1" style={{ letterSpacing: "2px" }}>
            Variedad
          </h1>
          <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
            <img
              style={{ width: "110px" }}
              src={vinoA}
              alt="logo vinoA"
              className="vinoA z-10 absolute"
            />
            <img
              src={vinoB}
              alt="logo vinoA"
              className="vinoB z-10 w-20 absolute"
            />
          </div>
          <h2 className="text-center my-2 text-sm">
            Variedades de sabores, explora y descubrí
          </h2>
          {/*
          <button className="btn hover:text-primary text-base-100 border-none p-1 glass w-full text-sm bg-accent rounded-badge">
            Testimonios
</button>*/}
        </div>
      </div>
    </div>
  );
};
