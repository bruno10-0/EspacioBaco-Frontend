import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsuarioById } from "../../api/auth.js";
import { decryptToken } from "../../helpers/token-decrypt.js";
import { Loading2 } from "../common/loading/loading2.jsx";
import { obtenerFechaHora } from "../../utils/getFecha.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContexto } from "../../context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { editarUsuario } from "../../api/auth.js";
export const DetailsUser = () => {
  const navigate = useNavigate();
  const { actualizarListaUsuarios } = useContexto();
  const { id } = useParams();
  const [editar, setEditar] = useState(false);
  const [user, setUser] = useState();
  const { createdAt } = user || {};
  const { fecha, hora } = obtenerFechaHora(createdAt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      tipo: "normal",
    },
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
        setUser(res.data)
        await actualizarListaUsuarios();
        setLoading(false);
        setEditar(false)
        return console.log(res);
      } catch (error) {
        setError(error.response.data)
        setLoading(false);
        return console.error(error);
      }
    },
  });

  const handleEditar = () => {
    setEditar(!editar);
  };
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
      <div className="mt-16 md:mt-32 bg-base-200 w-full flex justify-center">
        <div className="w-full md:w-3/4 bg-base-100 flex justify-center">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="avatar indicator placeholder mt-14 md:mt-10 mb-4">
              <span className="indicator-item badge badge-secondary">
                ID: {user.id}
              </span>
              <div className="bg-neutral text-neutral-content rounded-full w-24 md:w-36">
                <span className="text-5xl">{user.nombre.charAt(0)}</span>
              </div>
            </div>
            <div
              style={{ letterSpacing: "2px" }}
              className="w-full flex justify-center items-center gap-2 "
            >
              <h1>Usuario:</h1>
              <h1>{user.nombre}</h1>
              <h1>{user.apellido}</h1>
            </div>
            <div
              style={{ letterSpacing: "2px" }}
              className="w-full flex justify-center items-center gap-2 text-xs my-3"
            >
              <p>Registrado el:</p>
              <h1 className="">
                {fecha} a las {hora}hs
              </h1>
            </div>
            <div className="bg-base-100 border-none sticky top-16 md:top-32 z-10 w-full flex justify-center my-2 gap-1 p-1">
              <button
                className="btn border-primary text-base-100 bg-primary text-xs md:text-base md:p-3 "
                onClick={() => handleEditar()}
              >
                {!editar ? "Editar perfil" : "Cancelar edición"}
              </button>
              <div className="w-full">
                {!editar ? (
                  <div className="p-4 text-center text-xs md:text-base md:p-3 bg-primary text-base-100">
                    Editar información del usuario
                  </div>
                ) : (
                  <div className="p-4 text-center  text-xs md:text-base md:p-3 bg-warning text-base-100">
                    Edita los datos con precaución
                  </div>
                )}
              </div>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="relative w-full flex items-end flex-col md:flex-row justify-between gap-0 md:gap-2"
            >
              <div className="w-full gap-2 md:w-1/2 flex flex-col px-10 md:p-4">
                {/* nombre */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="nombre"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Nombre:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.nombre}
                </label>

                {editar && (
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
                )}
                {formik.touched.nombre && formik.errors.nombre && editar && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.nombre}
                  </div>
                )}
                {/* apellido */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="apellido"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Apellido:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.apellido}
                </label>

                {editar && (
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Apellido"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                )}
                {formik.touched.apellido &&
                  formik.errors.apellido &&
                  editar && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.apellido}
                    </div>
                  )}
                {/* correo */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="correo"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Correo:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.correo}
                </label>

                {editar && (
                  <input
                    type="text"
                    id="correo"
                    name="correo"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Correo"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                )}
                {formik.touched.correo && formik.errors.correo && editar && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.correo}
                  </div>
                )}
              </div>
              <div className="w-full gap-2 md:w-1/2 flex flex-col px-10 md:p-4">
                {/* dirección */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="direccion"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Dirección:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.direccion}
                </label>

                {editar && (
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formik.values.direccion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Dirección"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                )}
                {formik.touched.direccion &&
                  formik.errors.direccion &&
                  editar && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.direccion}
                    </div>
                  )}
                {/* telefono */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="telefono"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Telefono:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.telefono}
                </label>

                {editar && (
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={formik.values.telefono}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Teléfono"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                )}
                {formik.touched.telefono &&
                  formik.errors.telefono &&
                  editar && (
                    <div className="my-2 text-error text-start text-xs">
                      {formik.errors.telefono}
                    </div>
                  )}
                {/* tipo */}
                <label
                  style={{ letterSpacing: "2px" }}
                  htmlFor="tipo"
                  className="block my-2 uppercase text-base text-start w-full"
                >
                  Tipo de Usuario:
                </label>

                <label
                  style={{ letterSpacing: "2px" }}
                  className="block my-2 ml-3 text-xs text-start w-full"
                >
                  {user.tipo}
                </label>

                {editar && (
                  <select
                    id="tipo"
                    name="tipo"
                    value={formik.values.tipo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  >
                    <option value="normal">Normal</option>
                    <option value="admin">Admin</option>
                  </select>
                )}
                {formik.touched.tipo && formik.errors.tipo && editar && (
                  <div className="my-2 text-error text-start text-xs">
                    {formik.errors.tipo}
                  </div>
                )}
              </div>
              {editar && (
                <div className="-bottom-20 left-10 md:left-4 absolute ">
                  <button
                    type="submit"
                    className="btn text-base-100 bg-success"
                  >
                    Guardar cambios
                  </button>
                  {error && (
                    <p
                      style={{ letterSpacing: "2px" }}
                      className="text-error text-xs mt-2"
                    >
                      {error.mensaje}
                    </p>
                  )}
                </div>
              )}
            </form>
            <div className="h-24"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
