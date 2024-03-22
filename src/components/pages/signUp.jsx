import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { crearUsuario } from "../../api/auth.js";
import { Loading2 } from "../common/loading/loading2.jsx";
import { useContexto } from "../../context/Context.jsx";
import { encryptToken } from "../../helpers/token-encrypt.js";
import img from "../../assets/EspacioBaco_blanco+champagne.png"
export const SignUp = () => {
  const { setIsAuthenticated, isAuthenticated } = useContexto();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentSetp, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
    telefono: "",
    direccion: "",
  });

  const form_0 = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("El nombre es obligatorio"),
      apellido: Yup.string().required("El apellido es obligatorio"),
    }),
    onSubmit: (values) => {
      setFormData((prevData) => ({
        ...prevData,
        nombre: values.nombre,
        apellido: values.apellido,
      }));
      setCurrentStep(1);
    },
  });

  const form_1 = useFormik({
    initialValues: {
      telefono: "",
      direccion: "",
    },
    validationSchema: Yup.object({
      telefono: Yup.string()
        .required("El celular es obligatorio")
        .matches(/^\d+$/, "El celular debe contener solo números")
        .min(10, "El celular debe tener al menos 10 dígitos"),
      direccion: Yup.string()
        .required("La dirección es obligatoria")
        .min(15, "La dirección debe tener al menos 15 caracteres"),
    }),
    onSubmit: (values) => {
      setFormData((prevData) => ({
        ...prevData,
        telefono: values.telefono,
        direccion: values.direccion,
      }));
      setCurrentStep(2);
    },
  });

  const form_2 = useFormik({
    initialValues: {
      correo: "",
      contrasenia: "",
      confirmar_contrasenia: "",
    },
    validationSchema: Yup.object({
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
      confirmar_contrasenia: Yup.string()
        .required("Confirmar contraseña es obligatorio")
        .oneOf(
          [Yup.ref("contrasenia"), null],
          "Las contraseñas deben coincidir"
        ),
    }),
    onSubmit: async (values) => {
      setFormData((prevData) => ({
        ...prevData,
        correo: values.correo,
        contrasenia: values.contrasenia,
      }));
      setLoading(true);
      setErrors({});
      try {
        console.log(formData);
        const res = await crearUsuario(formData); // Assuming crearUsuario is defined elsewhere
        console.log(res);
        if (res.status === 201) {
          const tokenEncrypted = encryptToken(res.data.token); // Assuming encryptToken is defined elsewhere
          localStorage.setItem("nekot", tokenEncrypted);
          setIsAuthenticated(true); // Assuming setIsAuthenticated is defined elsewhere
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({ correo: error.response.data.mensaje });
        } else {
          console.error("Error al crear usuario:", error);
          setErrors({
            general: "Error al crear usuario. Inténtalo de nuevo más tarde.",
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  return (
    <div className="overflow-hidden">
      <NavBar />
      {loading && <Loading2 />}
      <div className="mt-16 md:mt-20 w-full h-auto flex justify-between items-center">
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="w-full md:w-1/2 flex flex-col text-center justify-center items-center"
        >
          <h1
            style={{ letterSpacing: "6px" }}
            className="font-bold mb-2 uppercase text-2xl w-full"
          >
            Registrarse
          </h1>
          <h1
            style={{ letterSpacing: "2px" }}
            className="text-xs text-gray-400 mt-2 w-full"
          >
            Complete el formulario para crear una cuenta
          </h1>

          <ul className="steps my-4">
            <li
              style={{ letterSpacing: "2px" }}
              className={`step text-xs uppercase ${
                currentSetp >= 0 ? "step-primary" : ""
              }`}
            >
              Identidad
            </li>
            <li
              style={{ letterSpacing: "2px" }}
              className={`step text-xs uppercase ${
                currentSetp >= 1 ? "step-primary" : ""
              }`}
            >
              Contacto
            </li>
            <li
              style={{ letterSpacing: "2px" }}
              className={`step text-xs uppercase ${
                currentSetp === 2 ? "step-primary" : ""
              }`}
            >
              Credenciales
            </li>
          </ul>

          <div className="w-5/6 lg:w-2/3" onSubmit={form_0.handleSubmit}>
            {/* Campos del formulario */}
            <div className="w-full flex flex-col justify-start">
              {currentSetp === 0 && (
                <form>
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
                    value={form_0.values.nombre}
                    onChange={form_0.handleChange}
                    onBlur={form_0.handleBlur}
                    placeholder="Nombre"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_0.touched.nombre && form_0.errors.nombre && (
                    <div className="my-2 text-error text-start text-xs">
                      {form_0.errors.nombre}
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
                    value={form_0.values.apellido}
                    onChange={form_0.handleChange}
                    onBlur={form_0.handleBlur}
                    placeholder="Apellido"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_0.touched.apellido && form_0.errors.apellido && (
                    <div className="my-2 text-error text-start text-xs">
                      {form_0.errors.apellido}
                    </div>
                  )}

                  <button
                    style={{ letterSpacing: "4px" }}
                    type="submit"
                    className="mt-2 w-full btn bg-accent text-base-100 hover:text-primary py-2 rounded-badge uppercase"
                    disabled={form_0.isSubmitting}
                  >
                    Siguiente
                  </button>
                </form>
              )}

              {currentSetp === 1 && (
                <form onSubmit={form_1.handleSubmit}>
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
                    value={form_1.values.telefono}
                    onChange={form_1.handleChange}
                    onBlur={form_1.handleBlur}
                    placeholder="Celular"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_1.touched.telefono && form_1.errors.telefono && (
                    <div className="my-2 text-error text-start text-xs">
                      {form_1.errors.telefono}
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
                    value={form_1.values.direccion}
                    onChange={form_1.handleChange}
                    onBlur={form_1.handleBlur}
                    placeholder="Direccion"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_1.touched.direccion && form_1.errors.direccion && (
                    <div className="my-2 text-error text-start text-xs">
                      {form_1.errors.direccion}
                    </div>
                  )}

                  <button
                    style={{ letterSpacing: "4px" }}
                    type="submit"
                    className="mt-2 w-full btn bg-accent text-base-100 hover:text-primary py-2 rounded-badge uppercase"
                    disabled={form_1.isSubmitting}
                  >
                    Siguiente
                  </button>
                </form>
              )}

              {currentSetp === 2 && (
                <form onSubmit={form_2.handleSubmit}>
                  <label
                    style={{ letterSpacing: "2px" }}
                    htmlFor="correo"
                    className="block my-1 uppercase text-xs text-start w-full"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="text"
                    id="correo"
                    name="correo"
                    value={form_2.values.correo}
                    onChange={form_2.handleChange}
                    onBlur={form_2.handleBlur}
                    placeholder="Correo Electrónico"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_2.touched.correo && form_2.errors.correo && (
                    <div className="my-1 text-error text-start text-xs">
                      {form_2.errors.correo}
                    </div>
                  )}

                  <label
                    style={{ letterSpacing: "2px" }}
                    htmlFor="contrasenia"
                    className="block my-1 uppercase text-xs text-start w-full"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="contrasenia"
                    name="contrasenia"
                    value={form_2.values.contrasenia}
                    onChange={form_2.handleChange}
                    onBlur={form_2.handleBlur}
                    placeholder="Contraseña"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_2.touched.contrasenia && form_2.errors.contrasenia && (
                    <div className="my-1 text-error text-start text-xs">
                      {form_2.errors.contrasenia}
                    </div>
                  )}
                  <label
                    style={{ letterSpacing: "2px" }}
                    htmlFor="confirmar_contrasenia"
                    className="block my-1 uppercase text-xs text-start w-full"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmar_contrasenia"
                    name="confirmar_contrasenia"
                    value={form_2.values.confirmar_contrasenia}
                    onChange={form_2.handleChange}
                    onBlur={form_2.handleBlur}
                    placeholder="Confirmar contraseña"
                    className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
                  />
                  {form_2.touched.confirmar_contrasenia &&
                    form_2.errors.confirmar_contrasenia && (
                      <div className="my-1 text-error text-start text-xs">
                        {form_2.errors.confirmar_contrasenia}
                      </div>
                    )}

                  <button
                    style={{ letterSpacing: "4px" }}
                    type="submit"
                    className="mt-1 w-full btn bg-success text-base-100 hover:text-primary py-2 rounded-badge uppercase"
                    disabled={form_2.isSubmitting}
                  >
                    Registrarme
                  </button>

                  {errors.correo && (
                    <div className="my-1 text-error text-start text-xs">
                      {errors.correo}
                    </div>
                  )}
                  {errors.general && (
                    <div className="my-1 text-error text-start text-xs">
                      {errors.general}
                    </div>
                  )}
                </form>
              )}
            </div>

            <div className="mt-4 -mb-4 w-full justify-center items-center flex gap-2">
              <h2>¿Ya tienes una cuenta?</h2>
              <Link to="/iniciar-sesion" className="link">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{ minHeight: "calc(100vh - 80px)" }}
          className="hidden md:flex w-1/2 h-full justify-center items-center bg-gradient-to-br from-accent to-primary via-secondary"
        >
          <img
            className="w-1/2 object-fill"
            src={img}
            alt="logo"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
