import { CiSearch, CiInstagram } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { FaWhatsapp, FaBars } from "react-icons/fa";
import { TbColorSwatch } from "react-icons/tb";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/Context";
import { Link } from 'react-router-dom';
import "./navBar.css"

export const NavBar = () => {
    const [animate, setAnimate] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    //escucha los eventos del scroll, sirve para ainmar la subida y bajada del navBar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos === 0);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);
    //define la altura a la que se desplazara hacia el top(arriba) el nav bar al hacer scroll hacia abajo
    const navStyle = {
        top: visible ? "0px" : "-80px",
    };
    // sirve para animar al icono de el carrito, al usuario cargar un item en el mismo este realizara una animacion
    useEffect(() => {
        if (animate) {
            const timeoutId = setTimeout(() => {
                setAnimate(false);
            }, 500); // Tiempo de la animación en milisegundos

            return () => clearTimeout(timeoutId);
        }
    }, [animate]);
    //lista de themas, nos ayudara a listar los botones para cambiar de tema
    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
      ];

    const { changeTheme } = useTheme();

    useEffect(() => {
        const storedTheme = localStorage.getItem('reactMarketTheme');
        if (storedTheme) {
            changeTheme(storedTheme);
        }
    }, [changeTheme]);

    const handleThemeChange = (newTheme) => {
        changeTheme(newTheme);
        localStorage.setItem('reactMarketTheme', newTheme);
    };


    return (
        <div>
            <header className="headerNav bg-base-100" style={navStyle}>
                <input type="checkbox" name="" id="chk1" />
                {/*Logo y nombre de la pagina*/}
                <div className="logo cursor-pointer">
                    <Link to="/">
                        <div className="nav-logo">
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 100 100"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" className="fill-primary" />
                            </svg>
                        </div>
                    </Link>
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <h1>
                                <span className="text-lg font-bold ">Vinos</span>Eli
                            </h1>
                        </Link>
                        {/* <button className="bg-white rounded-2xl text-black p-2" onClick={() => setAnimate(true)}>animacion?</button> */}
                    </div>


                </div>
                {/*barra de busqueda*/}
                <div className="search-box">
                    <form action="">
                        <input className="text-sm border rounded-badge" type="text" name="search" placeholder="BUSCAR..." id="srch" />
                        <button type="submit" className="bg-primary rounded-badge"><CiSearch className="text-2xl text-base-100" /></button>
                    </form>
                </div>
                {/*lista de secciones de la pagina, ejemplo: Inicio. 
                Incluye las redes solicales(visible en pantallas menores a 1000px) */}
                <ul className="mx-12 py-40 bg-base-100 lg:py-0">
                    <li><Link to="/" className="lg:hidden uppercase text-sm transition-all hover:border-b-2 border-primary">Inicio</Link></li>
                    <li><Link to="/productos" className="uppercase text-sm transition-all hover:border-b-2 border-primary">Productos</Link></li>
                    <li><Link to="/servicios" className="uppercase text-sm transition-all hover:border-b-2 border-primary">Servicios</Link></li>
                    <div className="items-center justify-evenly gap-10 flex lg:hidden">
                        <FaWhatsapp className="text-2xl cursor-pointer" />
                        <CiInstagram className="text-2xl cursor-pointer" />
                    </div>
                </ul>
                {/*contenedor de iconos de tema y carrito*/}
                <div className="gap-4 flex justify-center items-center mx-4 lg:mr-12">
                    <div tabIndex={0} className="dropdown dropdown-end max-h-[calc(100vh-300px)]">
                        <TbColorSwatch tabIndex={0} role="button" className="text-2xl" />
                        <div
                            tabIndex={0}
                            className=" shadow-2xl mt-8 rounded-badge dropdown-content max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-10rem)] w-48 md:w-56 overflow-y-auto bg-base-100 flex flex-col gap-2 p-4"
                        >

                            {themes.map((theme, index) => (
                                <button
                                    data-theme={theme}
                                    key={index}
                                    className="px-4 py-3 gap-2 outline-offset-4 flex justify-evenly items-center rounded-badge bg-base-200 hover:scale-105 ease-in-out duration-100"
                                    onClick={() => handleThemeChange(theme)}
                                >
                                    <p data-theme={theme} className="flex-grow text-sm bg-base-200">{theme}</p>
                                    <div className="flex h-full gap-1">
                                        <span data-theme={theme} className="bg-primary rounded-badge w-2 text-primary">1</span>
                                        <span data-theme={theme} className="bg-secondary rounded-badge w-2 text-secondary">2</span>
                                        <span data-theme={theme} className="bg-accent rounded-badge w-2 text-accent">3</span>
                                        <span data-theme={theme} className="bg-neutral rounded-badge w-2 text-neutral">1</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div tabIndex={0} className={`cart relative cursor-pointer dropdown dropdown-end max-h-[calc(100vh-300px)] ${animate ? 'animate' : ''}`}>
                        <FiShoppingCart tabIndex={0} role="button" className="text-2xl" />
                        <i className="w-5 h-5 flex items-center justify-center absolute -top-2 -right-3 rounded-full bg-primary text-base-100">
                            <p style={{ letterSpacing: "0px", fontFamily: "sans-serif", fontSize: '10px' }}>1   </p>
                        </i>
                        <div
                            tabIndex={0}
                            className="shadow-2xl mt-8 rounded-badge dropdown-content  h-[calc(100vh-8rem)] w-72 overflow-y-auto bg-base-100 flex flex-col gap-2 p-4"
                        >
                            <h1 className="uppercase py-2 font-bold text-primary">
                                Carrito
                            </h1>
                            <h2 className="border-y py-2 text-primary" style={{ letterSpacing: "0px", fontSize: '12px' }}>
                                Gasta $15.000 o más y obtén envío gratis! (SOLO DISPONIBLE PARA PEDIDOS DE POSADAS)
                            </h2>
                            <div className="flex justify-start items-center text-primary">
                                Tu carrito está vacio
                            </div>
                        </div>
                    </div>
                </div>
                {/*icono de despliegue lateral del menu (visible en pantallas menores a 1000px)*/}
                <label htmlFor="chk1" className="Menu">
                    <FaBars className="text-2xl" />
                </label>
            </header>
        </div>
    )
}
