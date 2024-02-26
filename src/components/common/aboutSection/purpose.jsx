import React from "react";
import { LiaEyeSolid } from "react-icons/lia";
import { GiSpaceShuttle,GiShakingHands } from "react-icons/gi";
export const Purpose = () => {
  return (
    <div className="carousel rounded-badge h-auto md:justify-center w-full my-5 p-2 gap-2">
      <div
        className="flex items-center text-center carousel-item flex-col glass rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <LiaEyeSolid className="my-2 text-7xl text-primary" />
        <h1 className="uppercase text-lg mb-2" style={{ letterSpacing: "2px" }}>
          VISIÓN
        </h1>
        <p className="text-start mx-4">
          Ser líderes en la venta de vinos, brindando experiencias excepcionales y
          enriquecedoras que redefinan el placer de disfrutar del vino.
        </p>
      </div>
      <div
        className="flex items-center text-center carousel-item flex-col glass rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <GiSpaceShuttle className="my-2 text-7xl text-primary" />
        <h1 className="uppercase text-lg mb-2" style={{ letterSpacing: "2px" }}>
          MISIÓN
        </h1>
        <p className="text-start mx-4">
          Ser el destino preferido para los amantes del vino, ofreciendo
          calidad, servicio excepcional y experiencias únicas que inspiren y
          deleiten a nuestros clientes.
        </p>
      </div>
      <div
        className="flex items-center text-center carousel-item flex-col glass rounded-badge"
        style={{ width: "300px", height: "350px" }}
      >
        <GiShakingHands className="my-2 text-7xl text-primary" />
        <h1 className="uppercase text-lg mb-2" style={{ letterSpacing: "2px" }}>
          VALORES
        </h1>
       
        <p className="text-start mx-4">
          En nuestra tienda nos basamos en valores clave: <span style={{fontWeight:"600", fontStyle:"italic"}}>respeto, autenticidad,
          responsabilidad y excelencia.</span> Estos principios nos guían
          hacia la creación de experiencias únicas y enriquecedoras para
          nuestros clientes.
        </p>
      </div>
    </div>
  );
};
