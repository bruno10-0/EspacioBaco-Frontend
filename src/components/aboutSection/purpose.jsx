import React from "react";
import { MdConstruction } from "react-icons/md";
export const Purpose = () => {
  return (
    <div className="carousel rounded-badge h-auto md:justify-center w-full my-5 p-2 gap-2">
      <div
        className="text-center carousel-item flex-col bg-violet-300 rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <h1 className="text-primary text-2xl">Vision</h1>
        <div className="flex">
          <h2>En desarrollo</h2>
          <MdConstruction></MdConstruction>
        </div>
      </div>
      <div
        className="text-center carousel-item flex-col bg-violet-300 rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <h1 className="text-primary  text-2xl">Mision</h1>
        <div className="flex">
          <h2>En desarrollo</h2>
          <MdConstruction></MdConstruction>
        </div>
      </div>
      <div
        className="text-center carousel-item flex-col bg-violet-300 rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <h1 className="text-primary  text-2xl">Valores</h1>
        <div className="flex">
          <h2>En desarrollo</h2>
          <MdConstruction></MdConstruction>
        </div>
      </div>
    </div>
  );
};
