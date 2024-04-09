import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decryptToken } from "../../helpers/token-decrypt.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getProductById } from "../../api/auth.js";
import lineas from "../../assets/Patron/lineas.png";
import { useContexto } from "../../context/Context.jsx";
import { useNavigate } from "react-router-dom";

export const DetailsProduct = () => {

  const navigate = useNavigate();
  const { putProducto } = useContexto();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [response, setResponse] = useState(true);
  const [initialValues, setInitialValues] = useState({
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
  });

  const formik = useFormik({
    initialValues,
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
      try {
        putProducto(values, product.id);
        navigate("/super-administrador/productos")
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (product) {
      setInitialValues({
        nombre: product.nombre || "",
        nombreBodega: product.nombreBodega || "",
        descripcion_detallada: product.descripcion_detallada || "",
        descripcion_corta: product.descripcion_corta || "",
        precio: product.precio || 0,
        stock: product.stock || 0,
        tipo: product.tipo || "",
        anio: product.año || 0,
        region: product.region || "",
        pais: product.pais || "",
        maridaje: product.maridaje || "",
      });
    }
  }, [product]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("nekot");
      if (!token) {
        return console.error("No hay Token, no se puede realizar la operación");
      } else {
        try {
          const decyptedToken = decryptToken(token);
          const res = await getProductById(id, decyptedToken);
          setProduct(res);
        } catch (error) {
          if (error.response.status === 404) {
            setResponse(false);
          } else {
            console.error("Error al buscar los productos:", error);
          }
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />

      {response === false && !loading && (
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="w-full flex justify-center items-center text-center"
        >
          <p>El producto que estás buscando no se encontró.</p>
        </div>
      )}
      {response === true && !loading && (
        <div className="relative mt-16 md:mt-32 bg-base-200 w-full flex justify-center">
          <img
            src={lineas}
            alt="fondo"
            className="hidden md:block absolute object-cover w-full h-full"
          />
          <div className="w-full md:w-10/12 bg-base-100 flex justify-center z-10">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="avatar relative overflow-hidden">
                <div className="relative mt-4 w-40 md:w-80 rounded-full bg-primary">
                  <img src={product.imagen} />
                </div>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col md:flex-row bg- mt-2 md:p-10"
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
                    defaultValue={initialValues.nombre}
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
                    Nombre de bodega
                  </label>
                  <input
                    type="text"
                    id="nombreBodega"
                    name="nombreBodega"
                    defaultValue={initialValues.nombreBodega}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="nombreBodega"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {formik.touched.nombreBodega &&
                    formik.errors.nombreBodega && (
                      <div className="my-2 text-error text-start text-xs">
                        {formik.errors.nombreBodega}
                      </div>
                    )}
                  <label
                    style={{ letterSpacing: "2px" }}
                    htmlFor="descripcion_detallada"
                    className="block my-2 uppercase text-xs text-start w-full"
                  >
                    Descripción detallada
                  </label>
                  <input
                    type="text"
                    id="descripcion_detallada"
                    name="descripcion_detallada"
                    defaultValue={initialValues.descripcion_detallada}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="descripcion_detallada"
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
                    Descripción corta
                  </label>
                  <input
                    type="text"
                    id="descripcion_corta"
                    name="descripcion_corta"
                    defaultValue={initialValues.descripcion_corta}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="descripcion_corta"
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
                    Precio previo{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      ${initialValues.precio}
                    </span>
                  </label>
                  <input
                    type="number"
                    id="precio"
                    name="precio"
                    defaultValue={initialValues.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="precio"
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
                    Stock previo{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {initialValues.stock}
                    </span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    defaultValue={initialValues.stock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="stock"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {formik.touched.stock && formik.errors.stock && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.stock}
                    </div>
                  )}
                </div>
                <div className="w-full px-4 mb-10 md:w-1/2 md:p-2">
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
                    defaultValue={initialValues.tipo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="tipo"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {formik.touched.tipo && formik.errors.tipo && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.tipo}
                    </div>
                  )}
                  <label
                    style={{ letterSpacing: "2px" }}
                    htmlFor="anio"
                    className="block my-2 uppercase text-xs text-start w-full"
                  >
                    Año previo{" "}
                    <span className="text-primary font-bold">
                      {" "}
                      {initialValues.anio}
                    </span>
                  </label>
                  <input
                    type="number"
                    id="anio"
                    name="anio"
                    defaultValue={initialValues.anio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="anio"
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
                    defaultValue={initialValues.region}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="region"
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
                    defaultValue={initialValues.pais}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="pais"
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
                    maridaje
                  </label>
                  <input
                    type="text"
                    id="maridaje"
                    name="maridaje"
                    defaultValue={initialValues.maridaje}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="maridaje"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {formik.touched.maridaje && formik.errors.maridaje && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.maridaje}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="mt-8 btn btn-primary block my2 uppercase text-xs text-start w-full"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
