import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
export const DropdownItem = ({ item }) => {
  return (
    <div
      style={{ height: "120px" }}
      className="w-full flex p-2 items-center justify-center my-4"
    >
      <div
        className="md:bg-accent rounded-full"
        style={{ width: "160px", height: "100px" }}
      >
        <img src={item.image} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="w-full h-full gap-4 flex flex-col p-2">
        <div className="w-full h-full gap-2">
          <h1 className="text-primary bold text-xs">{item.name}</h1>
          <h2 className="text-sm">{item.price}</h2>
        </div>
        <div className="w-full flex items-center">
          <div className="w-1/2 border border-primary flex items-center justify-around">
            <IoRemoveSharp className="cursor-pointer" />
            <input
              className="border-none bg-transparent text-center w-10 p-1"
              type="text"
              value={item.quantity}
            />
            <IoAddSharp className="cursor-pointer" />
          </div>
          <h3 className="border-primary hover:border-b primary ml-2 uppercase text-xs cursor-pointer">Remover</h3>
        </div>
      </div>
    </div>
  );
};
