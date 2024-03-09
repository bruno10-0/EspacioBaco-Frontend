import "./error.css"
import { Link } from "react-router-dom"
export const Error = () => {
    return (
        <div>
            <div className="relative body-error bg-base-200 w-full flex flex-col justify-center text-center items-center gap-4"style={{ height: "calc(100vh - 80px)" }}>
                <h1 className="text-error text-5xl">404</h1>
                <h2 style={{ letterSpacing: "1px" }}>La página que estás buscando no se encontró</h2>
                <button>
                    <Link className="btn bg-accent text-base-100 hover:text-primary font-light shadow-md border-none" to="/" style={{ letterSpacing: "4px" }}>Volver al inicio</Link>
                </button>
                <div className="w-full bg-primary text-center text-base-100 absolute bottom-0 p-2" style={{ letterSpacing: "2px", fontSize: "11px" }}>
                    <p>Es posible que la página no exista, esté en mantenimiento o se encuentre en proceso de mejoras. Por favor, inténtalo nuevamente más tarde.</p>
                </div>
            </div>
        </div>
    )
}
