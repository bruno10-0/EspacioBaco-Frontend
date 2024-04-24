import "./aboutSection.css";
import imagenFondo from "../../../assets/others/fondoAbout.jpg";
import { MdArrowOutward } from "react-icons/md";
import imagenFondo2 from "../../../assets/others/fondoAbout2.jpg";
import imagenFondo3 from "../../../assets/others/fondoAbout1.jpg";
import imagenFondo4 from "../../../assets/others/fondoAbout6.jpg";
import imagenFondo5 from "../../../assets/others/fondoAbout7.jpg";

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
          className="absolute bg-base-100 left-0 top-10 p-2 flex gap-2 justify-center items-center"
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
          <MdArrowOutward className="-ml-1" />
        </div>

        <div className="absolute left-5 md:left-10 top-40 flex gap-2 flex-col text-base-100">
          <h1 className="uppercase font-semibold text-xs md:text-lg">
            Espacio Baco
          </h1>
          <h2 className="uppercase font-extrabold text-lg md:text-4xl">
            Tu espacio del buen vino
          </h2>
        </div>

        <p className="w-4/5 md:text-lg absolute bottom-28 md:bottom-48 left-5 md:left-10 text-base-100">
          En este espacio te brindamos el deleite en cada sorbo, la esencia en
          cada encuentro. Aspiramos a ser líderes en la venta de vinos,
          ofreciendo experiencias excepcionales que inspiran y transforman.
          Guiados por valores de respeto y autenticidad, creamos momentos únicos
          y memorables para ti.
        </p>
      </div>
      <div className="conteinerImagenes1 bg-base-200 relative md:grid-cols-2 z-10">
        <div className="flex flex-col justify-center md:order-2">
          <img
            src={imagenFondo2}
            alt="Imagen de vino y quesos"
            className="imagenFondo2"
          />
          <img
            src={imagenFondo3}
            alt="Imagen de vinos"
            className="imagenFondo3 hidden md:block -bot"
          />
        </div>
        <div className="flex flex-col md:justify-center gap-4 md:gap-8 p-5 md:ml-20 md:order-1">
          <h1 className="uppercase font-extrabold text-lg md:text-4xl">
            VALORES
          </h1>
          <h2 className="md:text-lg">
            En nuestra tienda nos basamos en valores clave: respeto,
            autenticidad, responsabilidad y excelencia. Estos principios nos
            guían hacia la creación de experiencias únicas y enriquecedoras para
            nuestros clientes.
          </h2>
        </div>
      </div>
      <div className="relative h-screen w-full bg-base-200 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="w-full h-full">
          <img
            src={imagenFondo4}
            alt="imagen de vino y comida"
            className="imagenFondo4"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 md:gap-8 p-5 md:ml-20 md:pt-60">
          <h1 className="uppercase font-extrabold text-lg md:text-4xl">
            MISIÓN
          </h1>
          <h2 className="md:text-lg">
            Ser el destino preferido para los amantes del vino, ofreciendo
            calidad, servicio excepcional y experiencias únicas que inspiren y
            deleiten a nuestros clientes.
          </h2>
        </div>
      </div>
      <div className="relative w-full bg-base-200 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">
        <div className="w-full h-full">
          <img
            src={imagenFondo5}
            alt="imagen de vino y comida"
            className="imagenFondo5"
          />
        </div>
        <div className="z-10 flex flex-col gap-4 md:gap-8 p-5 md:ml-20">
          <h1 className="uppercase font-extrabold text-lg md:text-4xl">
            VISIÓN
          </h1>
          <h2 className="md:text-lg md:pb-20 ">
            Ser líderes en la venta de vinos, brindando experiencias
            excepcionales y enriquecedoras que redefinan el placer de disfrutar
            del vino.
          </h2>
        </div>
        <div className="hidden md:block corte bg-base-100 absolute"></div>
      </div>
    </section>
  );
};
