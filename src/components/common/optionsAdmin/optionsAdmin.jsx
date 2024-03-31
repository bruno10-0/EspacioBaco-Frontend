import { CardSmall } from "../card/cardSmall";
import { CardAdministration } from "../card/cardAdministration";
import { FaUsers, FaWineBottle } from "react-icons/fa6";
import { GiWineBottle } from "react-icons/gi";
import { BiCarousel } from "react-icons/bi";
import { useContexto } from "../../../context/Context";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export const OptionsAdmin = () => {
  const { user, users, products } = useContexto();
  
  return (
    <div className="flex flex-col justify-center items-center mt-16 md:mt-32">
      <div className="w-full md:w-11/12 p-4">
        <div className="w-full mb-4">
          <h1 style={{ letterSpacing: "4px" }} className="text-sm mb-2">
            Bienvenido, {user.nombre}
          </h1>
          <p className="text-xs">
            Como administrador, tu papel es fundamental para mantener el orden y
            funcionalidad del sitio, ya que cualquier modificación que realices
            afectará a nuestros clientes directamente.
          </p>
        </div>

        <div className="bg-transparent carousel w-full flex justify-start gap-4 mb-4 p-2">
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<FaUsers />}
              titulo={users.length}
              subTitulo="Usuarios registrados"
            />
          </div>
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<FaWineBottle />}
              titulo={products.length}
              subTitulo="Vinos almacenados"
            />
          </div>
        </div>
        <div
          style={{ letterSpacing: "4px" }}
          className="mb-2 w-full p-2 uppercase text-lg"
        >
          Operaciones con
        </div>
        <div className="grid md:grid-cols-3">
          <Link to="/super-administrador/usuarios" className="col-span-1">
            <CardAdministration
              descripcion="Crea, Elimina, Edita, Visualiza"
              titulo="Usuarios"
              icono={<FaUsers />}
            />
          </Link>
          <Link className="col-span-1">
            <CardAdministration
              descripcion="Crea, Elimina, Edita, Visualiza"
              titulo="Vinos"
              icono={<GiWineBottle />}
            />
          </Link>
          <Link className="col-span-1">
            <CardAdministration
              descripcion="Cambiar las propuestas"
              titulo="Carrusel de inicio"
              icono={<BiCarousel />}
            />
          </Link>
        </div>
      </div>
      <div className="p-2 w-full bg-primary text-base-100 text-center text-sm">
        ¿{user.nombre} necesitas ayuda? Contacta con tu{" "}
        <Link className="link">desarrollador</Link>.
      </div>
    </div>
  );
};
