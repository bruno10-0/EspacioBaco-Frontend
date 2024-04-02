import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { CardImgEdit } from "../common/card/cardImgEdit";
import { useContexto } from "../../context/Context.jsx";
import { useEffect } from "react";
export const CarouselHome = () => {
  const { publicaciones, setPublicaciones } = useContexto();

  useEffect(() => {
    setPublicaciones(publicaciones);
  }, [publicaciones]);
  return (
    <div>
      <NavBar />
      <div className="mt-16 md:mt-32 w-full flex justify-center items-center">
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
