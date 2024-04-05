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
          <p className="font-semibold">Nuestro Instagram</p>
          <div className="grid grid-flow-col gap-4">
            <a className="cursor-pointer">
              <PiInstagramLogoFill className="text-white text-3xl" />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};
