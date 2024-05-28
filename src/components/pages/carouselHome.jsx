import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { CardImgEdit } from "../common/card/cardImgEdit";
import { useContexto } from "../../context/Context.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export const CarouselHome = () => {
  const { publicaciones, setPublicaciones } = useContexto();

  useEffect(() => {
    setPublicaciones(publicaciones);
  }, [publicaciones]);
  return (
    <div>
      <NavBar />
      <div>
        <div className="w-full pt-4 px-4 font-bold mt-16 md:mt-32 ">
          <h1 style={{ letterSpacing: "2px" }}>
            Administración de Publicaciónes.
          </h1>
          <h2
            style={{ letterSpacing: "2px" }}
            className="mt-4 text-sm font-light"
          >
            Publica aquí lo que se verá en el "Carrusel" de la sección de{" "}
            <Link to={"/"} className="link">
              INICIO
            </Link>
            .
          </h2>

          <h3 className="mt-2 text-xs font-light">
            Nota: Asegúrate de cargar imágenes en los campos correctos para
            mantener la calidad visual de tus publicaciones.
          </h3>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <div className="carousel w-full flex items-center md:grid grid-cols-3 md:gap-2">
          {publicaciones?.map((publicacion) => (
            <CardImgEdit
              key={publicacion.id}
              values={publicacion}
              vacia={false}
            />
          ))}
          <CardImgEdit vacia={true} />
        </div>
      </div>
      <Footer />
    </div>
  );
};
