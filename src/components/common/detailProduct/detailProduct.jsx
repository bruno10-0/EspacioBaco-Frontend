import { useState, useEffect } from "react";
import { useParams  } from "react-router-dom";
import { useContexto } from "../../../context/Context.jsx";
import { getProductById } from "../../../api/auth.js";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { NavBar } from "../navBar/navBar";
import "./detailProduct.css";

export const DetailProduct = () => {
  const { cartList, setCartList } = useContexto();
  const [product, setProduct] = useState([]);
  const [productQuantity, setProductQuantity] = useState(1);
  const [itemFound, setItemFound] = useState(false);
  const { id } = useParams();

  const buscarVinoEnCartList = () => {
    let encontradoLocal = false;
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].id === product.id) {
        encontradoLocal = true;
        break;
      }
    }
    if (!encontradoLocal) {
      let nuevaLista = [...cartList];
      nuevaLista.push({
        ...product,
        cantidad: productQuantity,
      });
      setCartList(nuevaLista);
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

  const handleIdSearch = (idToSearch) => {
    const foundObject = cartList.find((obj) => obj.id == idToSearch);
    if (foundObject) {
      setItemFound(true);
    } else {
      setItemFound(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    handleIdSearch(id);
  }, [setCartList, cartList]);
  
  return (
    <>
      <NavBar />
      <div
        style={{ marginTop: "70px" }}
        className="relative mb-2 p-2 w-full flex flex-col items-center lg:items-start lg:flex-row justify-around"
      >
        <div className="ContainerImg">
          <div className="carousel w-full h-full">
            <div className="carousel-item relative flex justify-center items-center w-full h-full">
              <img
                src={product.imagen}
                alt="imagen de el vino"
                className="z-10 w-full h-full object-contain select-none"
              />
              {/*<div className="absolute flex justify-between w-full top-1/2">
                <a href="#slide1" className="ml-2 text-2xl text-secondary z-10">
                  <FaCaretLeft />
                </a>
                <a href="#slide3" className="mr-2 text-2xl text-secondary z-10">
                  <FaCaretRight />
                </a>
              </div>*/}
              <div className="absolute w-full lg:w-3/5 lg:h-3/5 lg:bg-accent lg:rounded-full flex justify-center overflow-hidden">
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
              style={{ fontSize: "13px", letterSpacing: ".2em" }}
            >
              {product.nombreBodega}
            </h1>
            <h2 className="text-xl uppercase" style={{ letterSpacing: "1px" }}>
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
                {product.stock}
              </span>{" "}
              botellas en stock!{" "}
            </h4>
            <div>
              <button
                disabled={itemFound}
                onClick={() => buscarVinoEnCartList(id)}
                className="rounded-box btn bg-accent text-base-100 uppercase border text-center my-2 p-2 w-full"
                style={{
                  fontSize: "13px",
                  fontWeight: "inherit",
                  letterSpacing: "4px",
                }}
              >
                {!itemFound && <h2>Lo llevo</h2>}
                {itemFound && <h2>Agregado al carrito</h2>}
              </button>
            </div>
            <div>
              <p className="text-xs flex flex-col gap-4">
                {product.descripcion_detallada}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
