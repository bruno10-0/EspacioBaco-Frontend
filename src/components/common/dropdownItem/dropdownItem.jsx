import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useState } from "react";
import { useContexto } from "../../../context/Context";
export const DropdownItem = ({ item }) => {
  const { cartList, setCartList,eliminarItem } = useContexto();
  const [input, setInput] = useState(item.quantity);

  const replaceObject = () => {
    let nuevaLista = [];
    cartList.forEach((objeto) => {
      if (objeto.id === item.id) {
        nuevaLista.push(item);
      } else {
        nuevaLista.push(objeto);
      }
      setCartList(nuevaLista);
    });
  };

  const incrementBTN = () => {
    if (input < item.stock) {
      setInput(parseInt(input) + 1);
      item.quantity = input + 1;
      replaceObject();
    }
  };

  const decrementBTN = () => {
    if (parseInt(input) > 1) {
      setInput(parseInt(input) - 1);
      item.quantity = input - 1;
      replaceObject();
    }
  };

  const handleEliminarItem=()=>{
    setCartList(eliminarItem(cartList,item.id))
  }
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
          src={item.image}
          alt="miniatura de el vino"
          className="z-10 w-full h-full object-contain"
        />
      </div>
      <div className="w-full h-full gap-4 flex flex-col p-2">
        <div className="w-full h-full gap-4 flex flex-col">
          <h1 className="bold text-sm">{item.name}</h1>
          <h2 className="text-sm">${item.price}c/u</h2>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className=" p-2 border flex items-center">
            <IoRemoveSharp
              className="cursor-pointer mr-6 ml-2"
              onClick={decrementBTN}
            />
            <span className="select-none">{input}</span>
            <IoAddSharp
              className="cursor-pointer ml-6 mr-2"
              onClick={incrementBTN}
            />
          </div>
          <button onClick={handleEliminarItem} className="border-primary hover:border-b primary ml-2 uppercase text-xs cursor-pointer">
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
