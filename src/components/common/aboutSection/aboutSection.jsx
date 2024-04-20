import "./aboutSection.css";
import imagenFondo from "../../../assets/others/fondoAbout.jpg";
import { MdArrowOutward } from "react-icons/md";
export const AboutSection = () => {
  return (
    <section className="mt-16 md:mt-28">
      <div className="relative contenedorImgTexto w-full">
        <img
          src={imagenFondo}
          alt="Espacio Baco - Tu espacio del buen vino"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          style={{ fontSize: "11px" }}
          className="absolute bg-base-100 left-0 top-10 p-4 flex gap-2 justify-center items-center"
        >
          Imagen cortesía de{" "}
          <a
            href="https://www.instagram.com/cantuariabruno"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Bruno Cantuária
          </a>
          <MdArrowOutward className="-ml-1"/>
        </div>

        <div className="absolute left-5 md:left-10 top-40 flex gap-2 flex-col text-base-100">
          <h1 className="uppercase font-semibold text-xs md:text-lg">
            Espacio Baco
          </h1>
          <h2 className="uppercase font-extrabold text-lg md:text-4xl">
            Tu espacio del buen vino
          </h2>
        </div>

        <div className="md:text-lg md:w-2/3 w-1/12 absolute bottom-48 left-5 md:left-10 text-base-100 ">
          <p>
            En este espacio te brindamos el deleite en cada sorbo, la esencia en
            cada encuentro. Aspiramos a ser líderes en la venta de vinos, ofreciendo experiencias
            excepcionales que inspiran y transforman. Guiados por valores de
            respeto y autenticidad, creamos momentos únicos y memorables para
            ti.
          </p>
        </div>
      </div>
    </section>
  );
};
