import React, { useState, useEffect } from "react";
import { terminosCargaVinos } from "../../../constants/loadingWines.js";
export const Loading = () => {
  const [palabra, setPalabra] = useState("Cargando...");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * terminosCargaVinos.length);
      setPalabra(terminosCargaVinos[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <span className="loading loading-bars loading-lg"></span>
        <h3>{palabra}</h3>
      </div>
    </div>
  );
};
