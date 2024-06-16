import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { postPublicacion } from "../../../api/auth.js";
import { Loading2 } from "../loading/loading2.jsx";
import { useContexto } from "../../../context/Context.jsx";
import { deletePublicacion } from "../../../api/auth.js";
import { RiDeleteBin7Line } from "react-icons/ri";

export const CardImgEdit = ({ values, vacia }) => {
  const [titulo, setTitulo] = useState("");
  const [imagen1, setImagen1] = useState(null);
  const [imagen2, setImagen2] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const {
    actualizarListaPublicaciones,
    flagPublicaciones,
    setFlagPublicaciones,
  } = useContexto();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError("Por favor ingresa un título.");
      return;
    }
    if (!imagen1 || !imagen2) {
      setError("Por favor selecciona una imagen para ambos campos.");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("imagen1", imagen1);
    formData.append("imagen2", imagen2);

    const closeButton = document.getElementById("closeButton");
    closeButton.click();
    try {
      setLoading(true);
      await postPublicacion(formData);
      setFlagPublicaciones(!flagPublicaciones);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDeletePublicacion = async (id) => {
    setLoading(true);
    try {
      await deletePublicacion(id);
      actualizarListaPublicaciones();
      setFlagPublicaciones(!flagPublicaciones);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError();
    }, 1500);

    return () => clearTimeout(timer);
  }, [error]);
  return (
    <div className="shadow-2xl carousel-item w-full md:col-span-1">
      {loading && <Loading2 />}
      {!vacia && (
        <div className="relative h-auto w-full">
          <img
            style={{ minHeight: "calc(100vh - 145px)" }}
            src={values.secureURL1}
            alt={values.titulo}
            className="object-fill w-full "
          />
          <div className="text-xs top-0 absolute w-full h-full grid bg-black bg-opacity-65 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div
              style={{ letterSpacing: "4px" }}
              className="w-full h-full flex flex-col gap-2 justify-center items-center hover:bg-error hover:bg-opacity-50 hover:text-base-100 text-error uppercase"
            >
              <button
                onClick={() => {
                  handleDeletePublicacion(values.id);
                }}
                className="btn"
              >
                {" "}
                <RiDeleteBin7Line className="text-2xl" />
                Eliminar{" "}
              </button>
            </div>
          </div>
        </div>
      )}
      {vacia && (
        <div
          onClick={() => document.getElementById("my_modal_1").showModal()}
          style={{ minHeight: "calc(100vh - 145px)" }}
          className="btn h-full w-full flex flex-col gap-2 justify-center items-center"
        >
          <div className="flex justify-center items-center gap-2">
            <FaPlus className="text-2xl " />
            <h3 style={{ letterSpacing: "2px" }} className="text-xs">
              Agrega una publicacion más
            </h3>
          </div>

          <dialog id="my_modal_1" className="z-10 modal shadow-2xl">
            <div className="modal-box">
              <form
                onSubmit={handleSubmit}
                className="w-full h-full justify-center items-centerflex flex-col gap-2"
              >
                <h1 className="w-full text-start font-bold block text-lg m-4">
                  Cargar Imagen
                </h1>
                <h2 className="w-full font-normal text-start mt-6">Titulo</h2>
                <input
                  onChange={(e) => setTitulo(e.target.value)}
                  value={titulo}
                  type="text"
                  placeholder="Ingrese el titulo"
                  className="w-full my-2 p-2"
                />
                <h2 className="w-full font-normal text-start mt-6">
                  Imagen para celulares
                </h2>
                <input
                  onChange={(e) => setImagen1(e.target.files[0])}
                  type="file"
                  className="file-input file-input-bordered my-2 w-full"
                />
                <h2 className="w-full font-normal text-start mt-6">
                  Imagen para PC
                </h2>
                <input
                  onChange={(e) => setImagen2(e.target.files[0])}
                  type="file"
                  className="file-input file-input-bordered my-2 w-full"
                />
                <h4 className="w-full text-start mt-4 text-xs font-normal">
                  Nota: Asegúrate de cargar imágenes en los campos correctos
                  para mantener la calidad visual de tus publicaciones.
                </h4>
                {!error && (
                  <button
                    type="submit"
                    className="w-full btn bg-success mt-6 uppercase text-white"
                  >
                    Subir
                  </button>
                )}
                {error && (
                  <p className="w-full text-center text-sm text-error">
                    {error}
                  </p>
                )}
              </form>
              <div className="absolute top-0 right-6 modal-action">
                <form method="dialog">
                  <button
                    id="closeButton"
                    className="btn btn-error btn-circle text-base-100"
                  >
                    <IoClose />
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};
