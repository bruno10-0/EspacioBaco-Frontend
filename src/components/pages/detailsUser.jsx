import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsuarioById } from "../../api/auth.js";
import { decryptToken } from "../../helpers/token-decrypt.js";
import { Loading2 } from "../common/loading/loading2.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContexto } from "../../context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { editarUsuario } from "../../api/auth.js";
import lineas from "../../assets/Patron/lineas.png";

export const DetailsUser = () => {
  const navigate = useNavigate();
  const { actualizarListaUsuarios } = useContexto();
  const { id } = useParams();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [initialValues, setInitialValues] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    tipo: "normal",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
      correo: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo electrónico es obligatorio")
        .matches(
          /@(gmail\.com|hotmail\.com|outlook\.com)$/,
          "El dominio del correo electrónico debe ser gmail.com, hotmail.com o outlook.com"
        ),
      telefono: Yup.string()
        .required("El celular es obligatorio")
        .matches(/^\d+$/, "El celular debe contener solo números")
        .min(10, "El celular debe tener al menos 10 dígitos"),
      direccion: Yup.string()
        .required("La dirección es obligatoria")
        .min(15, "La dirección debe tener al menos 15 caracteres"),
      tipo: Yup.string().required("El tipo es obligatorio"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        values.id = user.id;
        const res = await editarUsuario(values, user.id);
        setUser(res.data);
        await actualizarListaUsuarios();
        setLoading(false);
        navigate("/super-administrador/usuarios");
        return console.log(res);
      } catch (error) {
        setErrorUpdate(error.response.data.mensaje);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        tipo: user.tipo || "normal",
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("nekot");
      if (!token) {
        return console.error("No hay Token, no se puede realizar la operación");
      } else {
        try {
          const decyptedToken = decryptToken(token);
          const res = await getUsuarioById(id, decyptedToken);
          setUser(res);
        } catch (error) {
          return console.error(error);
        }
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading2 />
      </div>
    );
  }
  return (
    <div>
      <NavBar />
      {loading && <Loading2 />}
      <div className="relative mt-16 md:mt-32 bg-base-200 w-full flex justify-center">
        <img
          src={lineas}
          alt="fondo"
          className="hidden md:block absolute object-cover w-full h-full"
        />
        <div className="w-full md:w-10/12 bg-base-100 flex justify-center z-10">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="avatar placeholder">
              <div className="mt-4 w-40 rounded-full bg-primary">
                <span className="text-xl font-semibold text-base-100">D</span>
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
                  defaultValue={user.nombre}
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
                  htmlFor="apellido"
                  className="block my-2 uppercase text-xs text-start w-full"
                >
                  apellido
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  defaultValue={user.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="apellido"
                  className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                />
                {formik.touched.apellido && formik.errors.apellido && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.apellido}
                  </div>
                )}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="correo"
                  className="block my-2 uppercase text-xs text-start w-full"
                >
                  correo
                </label>
                <input
                  type="text"
                  id="correo"
                  name="correo"
                  defaultValue={user.correo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="correo"
                  className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                />
                {formik.touched.correo && formik.errors.correo && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.correo}
                  </div>
                )}
              </div>
              <div className="w-full px-4  md:w-1/2 md:p-2 mb-6">
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="telefono"
                  className="block my-2 uppercase text-xs text-start w-full"
                >
                  celular
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  defaultValue={user.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="celular"
                  className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                />
                {formik.touched.telefono && formik.errors.telefono && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.telefono}
                  </div>
                )}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="direccion"
                  className="block my-2 uppercase text-xs text-start w-full"
                >
                  dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  defaultValue={user.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="dirección"
                  className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                />
                {formik.touched.direccion && formik.errors.direccion && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.direccion}
                  </div>
                )}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="tipo"
                  className="block my-2 uppercase text-xs text-start w-full"
                >
                  tipo
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  defaultValue={user.tipo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                >
                  <option value="admin">admin</option>
                  <option value="normal">normal</option>
                </select>

                {formik.touched.tipo && formik.errors.tipo && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.tipo}
                  </div>
                )}

                <button
                  type="submit"
                  className="mt-6 btn btn-primary block my2 uppercase text-xs text-start w-full"
                >
                  Actualizar
                </button>

                {errorUpdate && (
                  <div className="my-2 text-error text-start text-xs">
                    {errorUpdate}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
