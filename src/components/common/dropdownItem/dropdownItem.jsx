import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import { useContexto } from "../../../context/Context";
import { getProductById } from "../../../api/auth.js";
import { useEffect } from "react";
export const DropdownItem = ({ item }) => {
  const {
    incrementarCantidadProducto,
    actualizarCarritoUsuario,
    decrementarCantidadProducto,
    eliminarProducto,
    carrito,
    setCarrito,
  } = useContexto();
  const [product, setProduct] = useState([]);

  const handdleAgregar = async () => {
    try {
      const res = await actualizarCarritoUsuario(
        incrementarCantidadProducto(item.id)
      );
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleRestar = async () => {
    try {
      const res = await actualizarCarritoUsuario(
        decrementarCantidadProducto(item.id)
      );
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handdleRemover = async () => {
    try {
      const res = await actualizarCarritoUsuario(eliminarProducto(item.id));
      setCarrito(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(item.id);
        setProduct(response);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProduct();
  }, [carrito]);

  return (
    <div
      style={{ height: "120px" }}
      className="w-full flex items-center justify-center mb-4"
    >
      <div
        className=" relative md:bg-accent rounded-full"
        style={{ width: "100px", height: "80px" }}
      >
        <img
          src={product.imagen}
          alt="miniatura de el vino"
          className="z-10 w-full h-full object-contain"
        />
      </div>
      <div className="w-full h-full gap-4 flex flex-col p-2">
        <div className="w-full h-full gap-4 flex flex-col">
          <h1 className="bold text-sm">{product.nombre}</h1>
          <h2 className="text-sm">${product.precio}c/u</h2>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className=" p-2 border flex items-center">
            <IoRemoveSharp
              onClick={() => {
                handdleRestar();
              }}
              className="text-neutral cursor-pointer mr-6 ml-2"
            />
            <span className="select-none">{item.cantidad}</span>
            <IoAddSharp
              onClick={() => {
                handdleAgregar();
              }}
              className="text-neutral cursor-pointer ml-6 mr-2"
            />
          </div>
          <button
            onClick={() => {
              handdleRemover();
            }}
            className="ml-2 cursor-pointer text-accent"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
