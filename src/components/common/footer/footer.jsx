import { Link } from "react-router-dom";
import { PiInstagramLogoFill } from "react-icons/pi";
import img from "../../../assets/Logo/EspacioBaco_blanco+champagne.png";
export const Footer = () => {
  return (
    <>
      <footer className="footer footer-center p-2 bg-primary text-primary-content">
        <aside>
          <Link to="/">
            <img src={img} alt="Logo" className="w-64 h-auto" />
          </Link>
          <p className="font-bold">
            EspacioBaco. <br />
            Descubre el sabor del mundo en cada copa.
          </p>
          <p>Copyright © 2024 - Todos los derechos resevados</p>
        </aside>
        <nav>
          <p className="font-semibold -mt-4 ">Visita nuestro Instagram</p>
          <div className="grid grid-flow-col gap-4">
            <a className="cursor-pointer">
              <PiInstagramLogoFill className="text-white text-3xl" />
            </a>
          </div>
        </nav>
        <div className="w-full flex justify-center gap-4 -mt-6 font-semibold">
          <div>
            <h1 style={{ letterSpacing: "2px" }} className="uppercase text-xs">
              Desarrollador:
            </h1>
            <a
              href="https://brunodev-zn28.onrender.com/"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              BrunoDev
            </a>
          </div>
          <div></div>
          <div>
            <h1 style={{ letterSpacing: "2px" }} className="uppercase text-xs">
              Diseñador de iconos y logos:
            </h1>
            <a
              href=""
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Seju1000
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};
