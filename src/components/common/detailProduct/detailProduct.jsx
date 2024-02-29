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
  const { cartList, setCartList } = useContexto();
  const [productQuantity, setProductQuantity] = useState(1);

  const { id } = useParams();
  const productSelected = vinos.find((vino) => vino.id == id);

  const [errorCantidad, setErrorCantidad] = useState(false);
  const [errorExisteObjeto, setErrorExisteObjeto] = useState(false);

  const handdleVerification = () => {
    const verificarExistencia = (id) => {
      const objetoExistente = cartList.find((producto) => producto.id === id);
      return objetoExistente !== undefined;
    };

    const idBuscado = productSelected.id;
    const existeObjeto = verificarExistencia(idBuscado);

    if (!existeObjeto) {
      if (productQuantity <= productSelected.stock) {
        window.scrollBy({
          top: -1,
          behavior: "smooth",
        });
        const nuevaLista = [...cartList];
        productSelected.quantity = productQuantity;
        nuevaLista.push(productSelected);
        setCartList(nuevaLista);
      } else {
        setErrorCantidad(true);
        setTimeout(() => {
          setErrorCantidad(false);
        }, 2000);
      }
    } else {
      setErrorExisteObjeto(true);
      setTimeout(() => {
        setErrorExisteObjeto(false);
      }, 3000);
    }
  };

  const incrementQuantity = () => {
    if (productQuantity < productSelected.stock) {
      setProductQuantity(productQuantity + 1);
    }
  };
  const decrementQuantity = () => {
    if (productQuantity > 1) {
      setProductQuantity(productQuantity - 1);
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
            <div className="carousel-item relative flex justify-center items-center w-full h-full">
              <img
                src={productSelected.image}
                alt="imagen de el vino"
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
              <div className="absolute lg:w-3/5 lg:h-3/5 lg:bg-accent rounded-full flex justify-center overflow-hidden">
                <img
                  style={{ transform: 'rotate(85deg)' }}
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
              ${productSelected.price}
            </h3>
          </div>
          <div className="w-full">
            <div className="w-2/5 flex justify-between gap-2 items-center border p-2">
              <button onClick={decrementQuantity}>
                <IoRemoveSharp />
              </button>
              <span>{productQuantity}</span>
              <button onClick={incrementQuantity}>
                <IoAddSharp />
              </button>
            </div>
            <h4 style={{ fontStyle: "italic" }} className="mt-4">
              Aprovecha, tenemos{" "}
              <span className="text-primary text-2xl mx-1">
                {productSelected.stock}
              </span>{" "}
              botellas en stock!{" "}
            </h4>
            <div>
              <button
                className="rounded-box btn bg-accent text-base-100 uppercase border text-center my-2 p-2 w-full"
                style={{
                  fontSize: "13px",
                  fontWeight: "inherit",
                  letterSpacing: "4px",
                }}
                onClick={handdleVerification}
              >
                Lo llevo
              </button>
              {errorCantidad && (
                <div className=" rounded-box text-base-200 bg-error p-3 flex items-center justify-center gap-2 mb-2">
                  <VscError className="text-2xl" />
                  <p className="text-sm">
                    Contamos solo con {productSelected.stock} botellas
                    disponibles.
                  </p>
                </div>
              )}
              {errorExisteObjeto && (
                <div className=" rounded-box text-base-200 bg-error p-3 flex items-center justify-center gap-2 mb-2">
                  <VscError className="text-2xl" />
                  <p className="text-sm">
                    Al parecer ya tienes esta botella en tu carrito.
                  </p>
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
