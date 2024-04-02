import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa6";
import img from "../../../assets/EspacioBaco_blanco+tinto.png"
export const Footer = () => {
  return (
    <>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
        <img src={img} alt="Logo" className="w-40 h-auto"/>
            <h2>¡Productos irresistibles te esperan! <Link to="/vinoteca" className="link">Haz tu pedido ahora.</Link></h2>
        </aside>
        <nav>
          <h6 className="footer-title uppercase" style={{letterSpacing:"4px"}}>Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a className="cursor-pointer">
             <FaInstagram className="text-2xl"/>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};
