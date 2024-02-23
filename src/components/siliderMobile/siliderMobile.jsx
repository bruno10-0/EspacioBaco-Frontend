import { FaWallet } from "react-icons/fa";
import { BsBox2Fill } from "react-icons/bs";
import { IoShieldSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { AiFillCreditCard } from "react-icons/ai";

export const SiliderMobile = () => {
  return (
        <div className="absolute h-72 w-full flex justify-center items-center" style={{ top: "50%" }}>
            <div className="carousel w-full md:w-auto h-full p-2 gap-2">

                <div className="transition-transform ease-in-out hover:scale-95 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
                    <h1 className="my-1 font-semibold" style={{ letterSpacing: "1px" }}>Menos de $5.000</h1>
                    <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
                        <div className="absolute bg-base-200 w-28 h-28 rounded-full"></div>
                        <FaWallet className="w-full h-full text-primary z-10"></FaWallet>
                    </div>
                    <h2 className="text-center my-2 text-sm">Descubrí Productos con bajos precios</h2>
                    <button className="w-full text-sm p-2 bg-primary text-base-100 rounded-badge">
                        Mostrar productos
                    </button>
                </div>

                <div className="transition-transform ease-in-out hover:scale-95 p-4 carousel-item flex flex-col bg-base-100  rounded-badge h-auto w-44 select-none">
                    <h1 className="my-1 font-semibold" style={{ letterSpacing: "1px" }}>Compra protegida</h1>
                    <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
                        <div className="absolute bg-base-200 w-28 h-28 rounded-full"></div>
                        <BsBox2Fill className="w-full h-full text-primary z-10"></BsBox2Fill>
                    </div>
                    <h2 className="text-center my-2 text-sm">Podés devolver tu compra gratis</h2>
                    <button className="w-full text-sm p-2 bg-primary text-base-100 rounded-badge">
                        Cómo funciona
                    </button>
                </div>

                <div className="transition-transform ease-in-out hover:scale-95 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
                    <h1 className="my-1 font-semibold" style={{ letterSpacing: "1px" }}>Seguridad</h1>
                    <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
                        <div className="absolute bg-base-200 w-28 h-28 rounded-full"></div>
                        <IoShieldSharp className="w-full h-full text-primary z-10"></IoShieldSharp>
                    </div>
                    <h2 className="text-center my-2 text-sm">Compra con seguridad y tranquilidad</h2>
                    <button className="w-full text-sm p-2 bg-primary text-base-100 rounded-badge">
                        Testimonios
                    </button>
                </div>

                <div className="transition-transform ease-in-out hover:scale-95 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
                    <h1 className="my-1 font-semibold" style={{ letterSpacing: "1px" }}>Variedad y calidad</h1>
                    <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
                        <div className="absolute bg-base-200 w-28 h-28 rounded-full"></div>
                        <MdCategory className="w-full h-full text-primary z-10"></MdCategory>
                    </div>
                    <h2 className="text-center my-2 text-sm">Encontrá variedad y tu vino ideal.</h2>
                    <button className="w-full text-sm p-2 bg-primary text-base-100 rounded-badge">
                        Ver
                    </button>
                </div>
                
                <div className="transition-transform ease-in-out hover:scale-95 p-4 carousel-item flex flex-col bg-base-100 rounded-badge h-auto w-44 select-none">
                    <h1 className="my-1 font-semibold" style={{ letterSpacing: "1px" }}>Medios de pago</h1>
                    <div className="relative p-6 w-full h-1/2 flex items-center justify-center">
                        <div className="absolute bg-base-200 w-28 h-28 rounded-full"></div>
                        <AiFillCreditCard className="w-full h-full text-primary z-10"></AiFillCreditCard>
                    </div>
                    <h2 className="text-center my-2 text-sm">Usá el medio de pago que más te convenga</h2>
                    <button className="w-full text-sm p-2 bg-primary text-base-100 rounded-badge">
                        Ver
                    </button>
                </div>
            </div>
        </div>
  )
}
