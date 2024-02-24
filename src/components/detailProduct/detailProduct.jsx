import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";
import { useState } from 'react';
import { NavBar } from "../navBar/navBar"
import "./detailProduct.css"
export const DetailProduct = () => {

    const [productQuantity, setProductQuantity] = useState(1); // Estado para la cantidad de productos

    const incrementarCantidad = () => {
        setProductQuantity(productQuantity + 1); // Incrementa la cantidad de productos
    };

    const decrementarCantidad = () => {
        if (productQuantity > 1) {
            setProductQuantity(productQuantity - 1); // Decrementa la cantidad de productos solo si es mayor que 1
        }
    };
    return (
        <>
        <NavBar/>
            <div className="mt-20 p-2 w-full flex flex-col items-center lg:items-start lg:flex-row justify-around">
                <div className="ContainerImg">
                    <div className="carousel w-full h-full">
                        <div className="carousel-item relative w-full h-full">
                            <img src="https://yonobi.com/cdn/shop/files/IMG_3798_800x.jpg?v=1705593002" alt="" className="w-full h-full object-fill" />
                            <div className="absolute flex justify-between w-full top-1/2">
                                <a href="#slide1" className="btn bg-base-100">❮</a>
                                <a href="#slide3" className="btn bg-base-100">❯</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ContainerInfo">
                    <div className="w-full flex flex-col my-2 gap-5 justify-center items-center">
                        <h1 className="uppercase" style={{ fontSize: "13px", letterSpacing: ".2em" }}>Danish Clay Design</h1>
                        <h2 className="text-xl uppercase" style={{ letterSpacing: "1px" }}>Ikebana Vase - Ishi</h2>
                        <h3 className="uppercase" style={{ fontSize: "16px", letterSpacing: "1px" }}>$1.400</h3>
                    </div>
                    <div className="w-full">
                        <div className="w-2/5 flex justify-between gap-2 items-center border p-2">
                            <button onClick={decrementarCantidad}><IoRemoveSharp /></button>
                            <span>{productQuantity}</span>
                            <button onClick={incrementarCantidad}><IoAddSharp /></button>
                        </div>
                        <div>
                            <button className="btn bg-primary text-base-100 uppercase border text-center my-4 p-3 w-full" style={{ fontSize: "13px", fontWeight: "inherit", letterSpacing: "4px" }}>
                                Agregar
                            </button>
                        </div>
                        <div>
                            <p className="text-xs flex flex-col gap-4">
                                <span>
                                    Los jarrones están inspirados en Ikebana, una forma japonesa de arreglar flores. Trabajan tanto con agua para flores frescas como sin agua para flores secas.
                                </span>
                                <span>
                                    Los jarrones están inspirados en Ikebana, una forma japonesa de arreglar flores. Trabajan tanto con agua para flores frescas como sin agua para flores secas.
                                </span>
                                <span>
                                    El Sr. Laerke Máller Hansen es graduado de la Real Academia Danesa de Diseño. Crea cerámica bajo el nombre de Diseño de arcilla danesa.
                                    Se enamoró de la estética y la cultura japonesa en un viaje de estudio a Japón. Como resultado, su expresión cerámica y su principal fuente de inspiración es la sencillez japonesa.
                                </span>
                                <span>
                                    Para ella, la forma y la estética van de la mano de la funcionalidad y el gran diseño, una sólida base que sigue explorando. Con su cerámica, Lúrke pretende aportar valor incluso a los pequeños momentos de la vida cotidiana y enriquecer su hogar con hermosos y sencillos diseños en colores terrosos.
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
