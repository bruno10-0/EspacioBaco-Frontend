import { CardSmall } from "../card/cardSmall";
import { CardAdministration } from "../card/cardAdministration";
import { FaUsers } from "react-icons/fa6";
import { BiCarousel } from "react-icons/bi";
import { useContexto } from "../../../context/Context";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, getUsuarios } from "../../../api/auth";
import { decryptToken } from "../../../helpers/token-decrypt";
import { Loading2 } from "../loading/loading2";
import { IoReceiptOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { CiDollar } from "react-icons/ci";

export const OptionsAdmin = () => {
  // Obtiene datos del contexto
  const {
    user,
    users,
    setUsers,
    products,
    setProducts,
    getAllOrders,
    orders,
    getAllVentas,
    ventas,
  } = useContexto();
  const [userCopy, setUserCopy] = useState([]);
  const [loading, setLoading] = useState(false);
  const message = "Hola Bruno, quiero consultarte con respecto a <MI_MOTIVO>";

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data); // Establece la lista de productos en el estado
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Efecto para cargar usuarios y gestionar el estado de carga
  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    const fetchUsuarios = async () => {
      const token = localStorage.getItem("nekot");

      if (!token) {
        console.log("No hay token, no se puede realizar la operación");
      } else {
        try {
          const decryptedToken = decryptToken(token);
          const res = await getUsuarios(decryptedToken);
          setUsers(res.data); // Establece la lista de usuarios en el estado
        } catch (error) {
          console.log(error);
        }
      }

      setLoading(false); // Desactiva el estado de carga al finalizar
    };
    fetchUsuarios();
  }, []);


  //Efecto para cargar todas las ordenes de los usuarios 
  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    getAllOrders();
    setLoading(false); // Desactiva el estado de carga
  }, []);

  //Efecto para cargar todas las ventas 
  useEffect(() => {
    setLoading(true); // Activa el estado de carga
    getAllVentas();
    setLoading(false); // Desactiva el estado de carga
  }, []);

  //cargamos el estado que replica la lista de usuarios
  useEffect(() => {
    setUserCopy(users);
  }, [users]);

  return (
    <div className="flex flex-col justify-center items-center mt-16 md:mt-32">
      {loading && <Loading2 />}
      <div className="w-full md:w-11/12 p-4">
        {/* Sección de bienvenida y descripción */}
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

        {/* Estadísticas de usuarios y productos */}
        <div className="bg-transparent carousel w-full flex justify-start gap-4 mb-4 p-2">
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<FaUsers />}
              titulo={userCopy.length || "No hay"}
              subTitulo="Usuarios registrados"
            />
          </div>
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<CiBoxes />}
              titulo={products.length || "No hay"}
              subTitulo="Publicaciones de vinos"
            />
          </div>
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<IoReceiptOutline />}
              titulo={
                (orders && orders.orders && orders.orders.length) || "No hay"
              }
              subTitulo="Ordenes Activas"
            />
          </div>
          <div className="carousel-item">
            <CardSmall
              color="bg-accent"
              icono={<CiDollar />}
              titulo={(ventas && ventas.length) || "No hay"}
              subTitulo="Ventas realizadas"
            />
          </div>
        </div>

        {/* Operaciones con usuarios, vinos y carrusel */}
        <div
          style={{ letterSpacing: "4px" }}
          className="mb-2 w-full p-2 uppercase text-lg"
        >
          Operaciones con
        </div>
        <div className="grid md:grid-cols-3">
          <Link to="/super-administrador/ordenes" className="col-span-1">
            <CardAdministration
              descripcion="Visualiza las ordenes de los clientes"
              titulo="Ordenes y detalles"
              icono={<IoReceiptOutline />}
            />
          </Link>
          <Link to="/super-administrador/productos" className="col-span-1">
            <CardAdministration
              descripcion="Crea, Elimina, Edita, Visualiza"
              titulo="Vinos"
              icono={<CiBoxes />}
            />
          </Link>
          <Link to="/super-administrador/slider" className="col-span-1">
            <CardAdministration
              descripcion="Cambiar las propuestas"
              titulo="Carrusel de inicio"
              icono={<BiCarousel />}
            />
          </Link>
          <Link to="/super-administrador/usuarios" className="col-span-1">
            <CardAdministration
              descripcion="Crea, Elimina, Edita, Visualiza"
              titulo="Usuarios"
              icono={<FaUsers />}
            />
          </Link>
        </div>
      </div>

      {/* Sección de contacto con el desarrollador */}
      <div className="p-2 w-full bg-primary text-base-100 text-center text-sm">
        ¿{user.nombre} necesitas ayuda? Contacta con tu{" "}
        <a
          href={`https://wa.me/5493765159179?text=${encodeURIComponent(
            message
          )}`}
          target="_blank"
          className="link"
        >
          desarrollador
        </a>
        .
      </div>
    </div>
  );
};
