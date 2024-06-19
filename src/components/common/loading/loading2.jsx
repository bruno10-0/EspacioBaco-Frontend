import { useLocation } from "react-router-dom";

export const Loading2 = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  let loadingText = "Aguarde un momento...";

  switch (currentPath) {
    case "/crear-cuenta":
      loadingText = "Creando usuario...";
      break;
    case "/iniciar-sesion":
      loadingText = "Verificando los datos...";
      break;
    default:
      break;
  }
  return (
    <div
      style={{ zIndex: 100 }}
      className="fixed inset-0 flex flex-col justify-center items-center"
    >
      <div className="absolute inset-0 bg-base-300 opacity-50"></div>
      <span className="loading loading-bars loading-lg bg-primary"></span>
      <h3
        style={{ letterSpacing: "4px" }}
        className="text-primary z-10 uppercase text-xs"
      >
        {loadingText}
      </h3>
    </div>
  );
};
