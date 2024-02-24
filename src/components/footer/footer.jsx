import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa6";
export const Footer = () => {
    return (
        <>
            <footer className="relative footer footer-center p-5 bg-base-100 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link to="/#" className="link link-hover">Inicio</Link>
                    <Link to="/Bodega" className="link link-hover">Bodega</Link>
                    <Link to="/#" className="link link-hover">Sobre Nosotros</Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <FaInstagram className="text-2xl cursor-pointer" />
                        <FaWhatsapp className="text-2xl cursor-pointer" />
                        <FaFacebookF className="text-2xl cursor-pointer" />
                    </div>
                </nav>
                <aside>
                    <p className="select-none">Copyright © 2024 - All right reserved by WinesEli Industries</p>
                </aside>
            </footer>
        </>
    )
}
