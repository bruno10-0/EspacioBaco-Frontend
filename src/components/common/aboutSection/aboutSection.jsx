import "./aboutSection.css";
import { MdArrowOutward } from "react-icons/md";

export const AboutSection = () => {
  return (
    <section className="mt-16 md:mt-28">
      <div style={{ height: "85vh" }} className="relative h-screen w-full">
        <img
          src="https://images.pexels.com/photos/821054/pexels-photo-821054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Espacio Baco - Tu espacio del buen vino"
          className="select-none w-full h-full object-cover"
          loading="lazy"
        />
        <div className="overlay"></div>

        <div
          style={{ fontSize: "11px" }}
          className="absolute border text-base-100 border-base-100 left-0 top-10 p-2 flex gap-2 justify-center items-center"
        >
          Imagen cortesía de{" "}
          <a
            href="https://www.pexels.com/es-es/@olly/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
           Andrea Piacquadio
          </a>
          <MdArrowOutward className="-ml-1" />
        </div>

        <div className="absolute top-28 flex flex-col gap-2 text-base-100 p-4 md:p-10 text-justify">
          <h1 className="uppercase font-semibold text-xs md:text-lg">
            Espacio Baco
          </h1>
          <h2 className="uppercase font-extrabold text-lg md:text-4xl">
            Tu espacio del buen vino
          </h2>
          <p className="w-4/5 md:text-lg mt-2 md:mt-6">
            EspacioBaco es el sueño del vino hecho realidad, donde la pasión se
            mezcla con la comodidad del hogar. Inspirados por Baco, cada botella
            lleva consigo nuestra dedicación y compromiso con la calidad y la
            confianza. Somos un equipo pequeño con grandes ambiciones, lleno de
            empeño y listo para compartir historias a través de cada vino, en
            este rincón de sueños en tierras misioneras para el mundo.
          </p>
        </div>
      </div>
    </section>
  );
};
