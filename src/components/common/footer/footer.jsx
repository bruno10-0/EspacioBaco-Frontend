import { Link } from "react-router-dom";
import { PiInstagramLogoFill } from "react-icons/pi";
import img from "../../../assets/Logo/EspacioBaco_blanco+champagne.png";
export const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <aside>
          <img src={img} alt="Logo EspacioBaco" className="w-60" />
          <p className="font-bold">Tu espacio de confiaza y sabor</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4 -my-5">
            <div className="flex flex-col gap-4 justify-center items-center">
              <h1>Visita nuestro Instagram</h1>
              <PiInstagramLogoFill className="text-3xl" />
            </div>
          </div>
        </nav>
        <div className="flex flex-col md:flex-row">
          Derechos de autor © 2024 - Todos los derechos reservados |
          Desarrollado por{" "}
          <div className="flex gap-2">
            <a href="https://brunodev-zn28.onrender.com" target="_blank" className="link">
              BrunoDev
            </a>
            y <a href="https://wa.me/5493764770071" target="_blank" className="link">Seju1000</a>
          </div>
        </div>
      </footer>
    </>
  );
};
