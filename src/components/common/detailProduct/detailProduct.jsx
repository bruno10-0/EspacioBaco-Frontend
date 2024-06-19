import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContexto } from "../../../context/Context.jsx";
import { getProductById } from "../../../api/auth.js";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { NavBar } from "../navBar/navBar.jsx";
import { Loading } from "../loading/loading.jsx";
import { Link } from "react-router-dom";
import "./detailProduct.css";

export const DetailProduct = () => {
  const { setCarrito, carrito, actualizarCarritoUsuario,user,products } = useContexto();
  const [product, setProduct] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [response, setResponse] = useState(true);
  const [loading, setLoading] = useState(true);
  const [itemFound, setItemFound] = useState(false);
  const { id } = useParams();

  const buscarVinoEnCartList = async () => {
    let encontradoLocal = false;
    for (let i = 0; i < carrito.productos.length; i++) {
      if (carrito.productos[i].id === product.id) {
        encontradoLocal = true;
        break;
      }
    }
    if (!encontradoLocal) {
      let nuevaLista = [...carrito.productos];
      nuevaLista.push({
        ...product,
        cantidad: productQuantity,
      });
      const res = await actualizarCarritoUsuario(nuevaLista);
      setCarrito(res.data);
    }
  };

  const incrementQuantity = () => {
    if (productQuantity < product.stock) {
      setProductQuantity(productQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
    }
  };
  // Esta función busca un objeto en la lista del carrito basado en su ID.
  // Si encuentra el objeto, establece el estado de itemFound en true, de lo contrario, lo establece en false.
  const handleIdSearch = (idToSearch) => {
    const foundObject = carrito.productos.find((obj) => obj.id == idToSearch);
    if (foundObject) {
      setItemFound(true);
    } else {
      setItemFound(false);
    }
  };
  //Busca el producto en base al id del req.params
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch (error) {
        if (error.response.status === 404) {
          setResponse(false);
        } else {
          console.error("Error al buscar los productos:", error);
        }
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id,products]);

  useEffect(() => {
    handleIdSearch(id);
  }, [id, setCarrito, carrito]);
  return (
    <>
      <NavBar />

      {loading && (
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="w-full flex justify-center items-center"
        >
          <Loading />
        </div>
      )}

      {response === false && !loading && (
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="w-full flex justify-center items-center text-center"
        >
          <p>El producto que estás buscando no se encontró. ¡Lo sentimos!</p>
        </div>
      )}

      {response === true && !loading && (
        <div className="overflow-hidden mt-20 md:mt-32 p-10 relative mb-2 w-full flex flex-col items-center lg:items-start lg:flex-row justify-around">
          <div className="ContainerImg">
            <div className="carousel w-full h-full">
              <div className="carousel-item relative flex justify-center items-center w-full h-full">
                <img
                  src={product.imagen}
                  alt="imagen de el vino"
                  className="z-20 w-full h-full object-contain select-none"
                />
                <div className="absolute w-full lg:w-4/5 lg:h-4/5 lg:bg-primary lg:rounded-full flex justify-center overflow-hidden">
                  <img
                    style={{ transform: "rotate(85deg)" }}
                    src="https://video-public.canva.com/VAFGRruTyzw/v/03eab254de.gif"
                    alt=""
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="ContainerInfo">
            <div className="w-full flex flex-col my-2 gap-5 justify-center items-center">
              <h1
                className="uppercase"
                style={{ fontSize: "11px", letterSpacing: ".2em" }}
              >
                {product.nombreBodega}
              </h1>
              <h2
                className="text-xl uppercase"
                style={{ letterSpacing: "2px" }}
              >
                {product.nombre}
              </h2>
              <h3
                className="uppercase"
                style={{ fontSize: "16px", letterSpacing: "1px" }}
              >
                ${product.precio}
              </h3>
            </div>
            <div className="w-full">
              <div className="w-2/5 flex justify-between gap-2 items-center border border-accent p-2">
                <button onClick={decrementQuantity}>
                  <IoRemoveSharp className="text-accent" />
                </button>
                <span className="text-accent">{productQuantity}</span>
                <button onClick={incrementQuantity}>
                  <IoAddSharp className="text-accent" />
                </button>
              </div>
              <h4
                style={{ letterSpacing: "1px" }}
                className="mt-4 text-xs md:text-sm"
              >
                Aprovecha, tenemos{" "}
                <span className="text-xl font-semibold mx-1">
                  {product.stock}
                </span>{" "}
                botellas en stock!{" "}
              </h4>
              <div>
                <Link
                  onClick={() => buscarVinoEnCartList()}
                  disabled={itemFound || !user}
                  className=" w-full btn btn-accent text-base-100 rounded-badge p-2 uppercase my-4"
                  style={{
                    fontSize: "13px",
                    fontWeight: "inherit",
                    letterSpacing: "4px",
                  }}
                >
                   {!itemFound && !user && <h2>Inicia sesion para llevarlo</h2>}
                  {!itemFound && user && <h2>Lo llevo</h2>}
                  {itemFound && <h2>Agregado al carrito</h2>}
                </Link>
              </div>
              <div>
                <p
                  style={{ fontSize: "13px", letterSpacing: "1px" }}
                  className="flex flex-col text-justify"
                >
                  {product.descripcion_detallada}
                  <br />
                  <br />
                  <span> Recomendamo maridarlo con {product.maridaje}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
