import "./detailProduct.css";
import vinos from "../../pages/vinos.json";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { useState } from "react";
import { NavBar } from "../navBar/navBar";
import { useParams } from "react-router-dom";
import { useContexto } from "../../../context/Context";
export const DetailProduct = () => {
  //estados y funciones para controlar el incrementar y decrementar de productos
  const [productQuantity, setProductQuantity] = useState(1);
  const incrementarCantidad = () => {
    setProductQuantity(productQuantity + 1); // Incrementa la cantidad de productos
  };
  const decrementarCantidad = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1); // Decrementa la cantidad de productos solo si es mayor que 1
    }
  };
  //hook para leer la ruta dinamica y buscar el producto que coicida con la informacion de la misma.
  const { id } = useParams();
  const productSelected = vinos.find((vino) => vino.id == id);
  // funcion para setear los productos a el estado de el carrito.
  const { cartList, setCartList } = useContexto();
  //con este handdle verificamos que la cantidad no exceda el stock disponible entre otras cosas...
  const [error, setError] = useState(false);
  const handdleVerification = () => {
    if (productQuantity <= productSelected.stock) {
      window.scrollBy({
        top: -1,
        behavior: "smooth",
      });
      const nuevaLista = [...cartList];
      nuevaLista.push(productSelected);
      setCartList(nuevaLista);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };
  return (
    <>
      <NavBar />
      <div
        style={{ marginTop: "70px" }}
        className="mb-2 p-2 w-full flex flex-col items-center lg:items-start lg:flex-row justify-around"
      >
        <div className="ContainerImg">
          <div className="carousel w-full h-full">
            <div className="carousel-item relative  flex justify-center items-center w-full h-full">
              <img
                src={productSelected.image}
                alt="imagen  de el vino"
                className="z-10 w-full h-full object-contain"
              />
              <div className="absolute flex justify-between w-full top-1/2">
                <a href="#slide1" className="ml-2 text-2xl text-secondary z-10">
                  <FaCaretLeft />
                </a>
                <a href="#slide3" className="mr-2 text-2xl text-secondary z-10">
                  <FaCaretRight />
                </a>
              </div>
              <div className="absolute lg:w-3/4 lg:h-3/4 bg-accent rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="ContainerInfo">
          <div className="w-full flex flex-col my-2 gap-5 justify-center items-center">
            <h1
              className="uppercase"
              style={{ fontSize: "13px", letterSpacing: ".2em" }}
            >
              {productSelected.bodega}
            </h1>
            <h2 className="text-xl uppercase" style={{ letterSpacing: "1px" }}>
              {productSelected.name}
            </h2>
            <h3
              className="uppercase"
              style={{ fontSize: "16px", letterSpacing: "1px" }}
            >
              {productSelected.price}
            </h3>
          </div>
          <div className="w-full">
            <div className="w-2/5 flex justify-between gap-2 items-center border p-2">
              <button onClick={decrementarCantidad}>
                <IoRemoveSharp />
              </button>
              <span>{productQuantity}</span>
              <button onClick={incrementarCantidad}>
                <IoAddSharp />
              </button>
            </div>
            <h4 style={{ fontStyle: "italic" }} className="mt-4">
              Aprovecha, tenemos <span className="text-primary text-2xl mx-1">{productSelected.stock}</span> botellas en stock!{" "}
            </h4>
            <div>
              <button
                className="rounded-box btn hover:bg-primary bg-secondary text-base-100 uppercase border text-center my-2 p-2 w-full"
                style={{
                  fontSize: "13px",
                  fontWeight: "inherit",
                  letterSpacing: "4px",
                }}
                onClick={handdleVerification}
              >
                Lo llevo
              </button>
              {error && (
                <div className=" rounded-box text-base-200 bg-error p-3 flex items-center justify-center gap-2 mb-2">
                  <VscError className="text-2xl"/>
                  <p className="text-sm">Contamos solo con {productSelected.stock} botellas disponibles.</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs flex flex-col gap-4">
                <span>
                  El Malbec es una cepa de uva tinta que se ha vuelto
                  emblemática de Argentina, aunque tiene sus orígenes en
                  Francia. En Argentina, el Malbec se cultiva principalmente en
                  la región de Mendoza, donde las condiciones climáticas y
                  geográficas son ideales para su desarrollo.
                </span>
                <span>
                  Este vino tinto es conocido por su color profundo y su sabor
                  frutado y especiado. Los Malbec argentinos suelen tener notas
                  de frutas negras como ciruelas y moras, así como notas de
                  especias como pimienta negra y regaliz.
                </span>
                <span>
                  El Malbec marida bien con una variedad de platos, desde carnes
                  rojas a la parrilla hasta pastas con salsas ricas. Su cuerpo
                  medio y sus taninos suaves lo hacen versátil y accesible para
                  muchos paladares.
                </span>
                <span>
                  Además de su popularidad en Argentina, el Malbec también se
                  cultiva en otras regiones del mundo, como Francia, Chile y
                  Estados Unidos. Cada región aporta su propio estilo y
                  características al vino, pero el Malbec argentino sigue siendo
                  uno de los más reconocidos a nivel mundial.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
