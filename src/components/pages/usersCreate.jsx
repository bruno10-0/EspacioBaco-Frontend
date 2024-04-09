import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useContexto } from "../../context/Context";
import { Loading2 } from "../common/loading/loading2";
import { useNavigate } from "react-router-dom";
import lineas from "../../assets/Patron/lineas.png";
export const UsersCreate = () => {
  const navigate = useNavigate();
  const { createUserForAdmin, error, actualizarListaUsuarios } = useContexto();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      contrasenia: "",
      confirmarContrasenia: "",
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
      contrasenia: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
          "La contraseña debe contener al menos una minúscula, una mayúscula y un número"
        ),
      confirmarContrasenia: Yup.string()
        .oneOf(
          [Yup.ref("contrasenia"), null],
          "Las contraseñas deben coincidir"
        )
        .required("Confirme la contraseña")
        .test(
          "match-passwords",
          "Las contraseñas deben coincidir",
          function (value) {
            return this.parent.contrasenia === value;
          }
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
        const res = await createUserForAdmin(values);
        if (res.status === 201) {
          setLoading(false);
          await actualizarListaUsuarios();
          navigate("/super-administrador/usuarios");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <div>
      <NavBar />
      {loading && <Loading2 />}
      <div
        style={{ minHeight: "calc(100vh - 200px)" }}
        className="relative mt-16 md:mt-32 bg-base-100 w-full flex justify-center h-auto"
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
              Creación de un usuario
            </h1>
            <h2
              style={{ letterSpacing: "2px" }}
              className="text-xs text-gray-400 mt-4"
            >
              Complete el formulario para registrar un nuevo usuario
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
                htmlFor="apellido"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Apellido
              </label>
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
              {formik.touched.apellido && formik.errors.apellido && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.apellido}
                </div>
              )}

              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="telefono"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Celular
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formik.values.telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Celular"
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
                Dirección
              </label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Direccion"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.direccion && formik.errors.direccion && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.direccion}
                </div>
              )}
            </div>
            <div className="w-full px-4  md:w-1/2 md:p-2">
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="correo"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Correo Electrónico
              </label>
              <input
                type="text"
                id="correo"
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Correo Electrónico"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.correo && formik.errors.correo && (
                <div className="my-1 text-error text-start text-xs">
                  {formik.errors.correo}
                </div>
              )}

              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="contrasenia"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="contrasenia"
                name="contrasenia"
                value={formik.values.contrasenia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Contraseña"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.contrasenia && formik.errors.contrasenia && (
                <div className="my-1 text-error text-start text-xs">
                  {formik.errors.contrasenia}
                </div>
              )}
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="confirmarContrasenia"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmarContrasenia"
                name="confirmarContrasenia"
                value={formik.values.confirmarContrasenia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirmar contraseña"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.confirmarContrasenia &&
                formik.errors.confirmarContrasenia && (
                  <div className="my-1 text-error text-start text-xs">
                    {formik.errors.confirmarContrasenia}
                  </div>
                )}

              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="tipo"
                className="block my-2 uppercase text-xs text-start w-full"
              >
                Tipo de usuario
              </label>
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
              {formik.touched.tipo && formik.errors.tipo && (
                <div className="my-1 text-error text-start text-xs">
                  {formik.errors.tipo}
                </div>
              )}
              <div className="w-full mt-4">
                <button
                  type="submit"
                  className="mt-6 btn btn-primary block my2 uppercase text-xs text-start w-full"
                >
                  Crear
                </button>
                {error && (
                  <p
                    style={{ letterSpacing: "2px" }}
                    className="text-error text-sm"
                  >
                    {error.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
