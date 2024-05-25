import "./aboutSection.css";
import { MdArrowOutward } from "react-icons/md";

export const AboutSection = () => {
  return (
    <section className="mt-16 md:mt-28">
      <div className="relative contenedorImgTexto w-full">
        <img
          src="https://images.pexels.com/photos/112988/pexels-photo-112988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Espacio Baco - Tu espacio del buen vino"
          className="select-none w-full h-full object-cover"
          loading="lazy"
        />
        <div
          style={{ fontSize: "11px" }}
          className="absolute bg-base-100 left-0 top-10 p-2 flex gap-2 justify-center items-center"
        >
          Imagen cortesía de{" "}
          <a
            href="https://www.pexels.com/es-es/@eye4dtail/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            George Becker
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

        <p className="w-4/5 md:text-lg absolute bottom-28 md:bottom-36 left-5 md:left-10 text-base-100">
          EspacioBaco es mucho más que una tienda de vinos en línea. Es la
          expresión de un sueño hecho realidad, donde la pasión por el vino se
          une con la comodidad de comprar desde casa. Inspirados por el dios
          Baco, nuestro emprendimiento representa el esfuerzo y el compromiso de
          ofrecer calidad y confianza en cada botella. <br />Somos un pequeño equipo
          con grandes ambiciones, y cada paso que damos está lleno de dedicación
          y empeño. En espacioBaco, cada vino tiene una historia que contar, y
          estamos aquí para compartir esa experiencia contigo.
        </p>
      </div>
    </section>
  );
};
