import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useContexto } from "../../context/Context";
import { Loading2 } from "../common/loading/loading2";
import { useNavigate } from "react-router-dom";
import lineas from "../../assets/Patron/lineas.png";

export const ProductCreate = () => {
  const { createProduct } = useContexto();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [error, setError] = useState();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      nombreBodega: "",
      descripcion_detallada: "",
      descripcion_corta: "",
      precio: 0,
      stock: 0,
      tipo: "",
      anio: 0,
      region: "",
      pais: "",
      maridaje: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio."),
      nombreBodega: Yup.string().required(
        "El nombre de la Bodega es obligatorio."
      ),
      descripcion_detallada: Yup.string()
        .required("La descripción detallada es obligatoria.")
        .min(
          30,
          "La descripción debe ser mas detallada? al menos 30 caracteres."
        ),
      descripcion_corta: Yup.string()
        .required("La descripción corta es obligatoria.")
        .max(30, "No puede ser mayor a 20 caracteres la descripcion pequeña"),
      precio: Yup.number()
        .required("El precio es obligatorio.")
        .min(0.01, "El precio debe ser mayor que cero."),
      stock: Yup.number()
        .required("El stock es obligatorio.")
        .min(0, "El stock no puede ser menor que cero."),
      tipo: Yup.string().required("El tipo es obligatorio."),
      region: Yup.string().required(
        "Debe ingresar la región de donde proviene el vino."
      ),
      pais: Yup.string().required(
        "Debe ingresar el pais de donde proviene el vino."
      ),
      maridaje: Yup.string().required(
        "Agrega una descripción de posibles buenos maridajes para este vino."
      ),
      anio: Yup.number().required(
        "Debe ingresar el año en que se creo este vino."
      ),
    }),
    onSubmit: async (values) => {
      console.log("entro aca");
      setLoading(true);
      let flag = false;
      if (!imagen) {
        flag = true;
      }
      if (!flag) {
        // Crear formData con los valores del formulario
        const formData = new FormData();
        formData.append("nombre", values.nombre);
        formData.append("nombreBodega", values.nombreBodega);
        formData.append("descripcion_detallada", values.descripcion_detallada);
        formData.append("descripcion_corta", values.descripcion_corta);
        formData.append("precio", values.precio);
        formData.append("stock", values.stock);
        formData.append("tipo", values.tipo);
        formData.append("pais", values.pais);
        formData.append("region", values.region);
        formData.append("maridaje", values.maridaje);
        formData.append("anio", values.anio);
        // Agregar imágenes al formData si están presentes
        if (imagen) {
          formData.append("imagen", imagen);
        }

        try {
          await createProduct(formData);
          navigate("/super-administrador/productos");
        } catch (error) {
          console.log(error);
        }
      } else {
        setError("Debes cargar la imágen de el producto.");
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setError();
    }, 1500);

    return () => clearTimeout(timer);
  }, [error]);
  return (
    <>
      <NavBar />
      {loading && <Loading2 />}
      <div
        style={{ minHeight: "calc(100vh - 200px)" }}
        className="relative mt-16 md:mt-32 bg-base-100 w-full flex justify-center overflow-hidden"
      >
        <img
          loading="lazy"
          src={lineas}
          alt="fondo"
          className="hidden md:block absolute object-cover w-full h-full"
        />
        <div className="w-full md:w-10/12 bg-base-100 p-5 z-10">
          <div className="w-full flex flex-col justify-center items-center">
            <h1
              style={{ letterSpacing: "2px" }}
              className="font-bold uppercase"
            >
              Creación de un Producto(vino).
            </h1>
            <h2
              style={{ letterSpacing: "2px" }}
              className="text-xs text-gray-400 mt-4"
            >
              Complete el formulario para registrar un nuevo producto.
            </h2>
          </div>
          <form
            className="w-full flex flex-col md:flex-row bg- mt-2 md:p-10"
            onSubmit={formik.handleSubmit}
          >
            <div className="w-full px-4  md:w-1/2 md:p-2">
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="nombre"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.nombre}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="nombreBodega"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Nombre de la Bodega
              </label>
              <input
                type="text"
                id="nombreBodega"
                name="nombreBodega"
                value={formik.values.nombreBodega}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Nombre de la Bodega"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.nombreBodega && formik.errors.nombreBodega && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.nombreBodega}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="descripcion_detallada"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Descripción Detallada
              </label>
              <input
                type="text"
                id="descripcion_detallada"
                name="descripcion_detallada"
                value={formik.values.descripcion_detallada}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Descripción Detallada"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.descripcion_detallada &&
                formik.errors.descripcion_detallada && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.descripcion_detallada}
                  </div>
                )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="descripcion_corta"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Descripción Corta
              </label>
              <input
                type="text"
                id="descripcion_corta"
                name="descripcion_corta"
                value={formik.values.descripcion_corta}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Descripción Corta"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.descripcion_corta &&
                formik.errors.descripcion_corta && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.descripcion_corta}
                  </div>
                )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="precio"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Precio
              </label>
              <input
                type="number"
                id="precio"
                name="precio"
                value={formik.values.precio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Precio"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.precio && formik.errors.precio && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.precio}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="stock"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Stock
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Stock"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.stock && formik.errors.stock && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.stock}
                </div>
              )}
            </div>
            <div className="w-full px-4  md:w-1/2 md:p-2">
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="tipo"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Tipo
              </label>
              <input
                type="text"
                id="tipo"
                name="tipo"
                value={formik.values.tipo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tipo de producto, por ejemplo: tinto, blanco, espumante, etc."
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.tipo && formik.errors.tipo && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.tipo}
                </div>
              )}

              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="año"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                año
              </label>
              <input
                type="number"
                id="anio"
                name="anio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Año en el que se creo el vino, para dar info al usuario"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.anio && formik.errors.anio && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.anio}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="region"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Región
              </label>
              <input
                type="text"
                id="region"
                name="region"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Region en el que se creo el vino."
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.region && formik.errors.region && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.region}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="pais"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                pais
              </label>
              <input
                type="text"
                id="pais"
                name="pais"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Pais en el que se creo el vino."
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.pais && formik.errors.pais && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.pais}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="maridaje"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Maridaje
              </label>
              <input
                type="text"
                id="maridaje"
                name="maridaje"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Maridajes recomendados para el vino."
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.maridaje && formik.errors.maridaje && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.maridaje}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="imagen"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Imagen
              </label>
              <input
                accept="image/*"
                type="file"
                id="imagen"
                name="imagen"
                value={formik.values.imagen}
                onBlur={formik.handleBlur}
                className="file-input file-input-bordered file-input-primary w-full"
                onChange={(e) => setImagen(e.target.files[0])}
              />
              <button
                type="submit"
                className="mt-6 btn bg-primary text-base-100 w-full"
              >
                Crear Producto
              </button>
              {error && (
                <div className="my-2 text-error text-start text-xs">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
