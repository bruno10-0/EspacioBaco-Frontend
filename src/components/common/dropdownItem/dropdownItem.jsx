import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import { useContexto } from "../../../context/Context";
import { getProductById } from "../../../api/auth.js";
import { useEffect } from "react";
export const DropdownItem = ({ item }) => {
  const { cartList, setCartList } = useContexto();
  const [product, setProduct] = useState([]);
  const [input, setInput] = useState(item.cantidad);

  const incrementBTN = () => {
    const index = cartList.findIndex((product) => product.id == item.id);
    if (index !== -1) {
      if (cartList[index].cantidad < cartList[index].stock) {
        const updatedCart = [...cartList];
        updatedCart[index].cantidad += 1;
        setCartList(updatedCart);
        setInput(input + 1);
      }
    }
  };

  const decrementBTN = () => {
    const index = cartList.findIndex((product) => product.id == item.id);
    if (index !== -1) {
      if (cartList[index].cantidad > 1) {
        const updatedCart = [...cartList];
        updatedCart[index].cantidad -= 1;
        setCartList(updatedCart);
        setInput(input - 1);
      }
    }
  };

  const removeFromCart = (idToRemove) => {
    setCartList((prevCartList) =>
      prevCartList.filter((item) => item.id !== idToRemove)
    );
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(item.id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProduct();
  }, []);

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
              onClick={decrementBTN}
              className="cursor-pointer mr-6 ml-2"
            />
            <span className="select-none">{input}</span>
            <IoAddSharp
              onClick={incrementBTN}
              className="cursor-pointer ml-6 mr-2"
            />
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="border-primary hover:border-b primary ml-2 uppercase text-xs cursor-pointer"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
