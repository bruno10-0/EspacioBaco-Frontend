import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useState, useEffect } from "react";

export const SignUp = () => {
  const [currentSetp, setCurrentStep] = useState(0);
  const [data, setData] = useState({
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
      setCurrentStep(1);
      data.nombre = values.nombre;
      data.apellido = values.apellido;
    },
  });
  const form_1 = useFormik({
    initialValues: {
      telefono: "",
      direccion: "",
    },
    validationSchema: Yup.object({
      telefono: Yup.string().required("El teléfono es obligatorio"),
      direccion: Yup.string().required("La dirección es obligatoria"),
    }),
    onSubmit: (values) => {
      setCurrentStep(2);
      data.telefono = values.telefono;
      data.direccion = values.direccion;
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
        .required("El correo electrónico es obligatorio"),
      contrasenia: Yup.string()
        .required("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .matches(/[a-z]/, "La contraseña debe contener al menos una minúscula"),
      confirmar_contrasenia: Yup.string()
        .required("Confirmar contraseña es obligatorio")
        .oneOf(
          [Yup.ref("contrasenia"), null],
          "Las contraseñas deben coincidir"
        ),
    }),
    onSubmit: (values) => {
      const data = {
        correo: values.correo,
        contrasenia: values.contrasenia,
      };
      console.log(data);
    },
  });
  return (
    <div className="overflow-hidden">
      <NavBar />
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

          <div className="w-2/3" onSubmit={form_0.handleSubmit}>
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
                    Telefono
                  </label>
                  <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    value={form_1.values.telefono}
                    onChange={form_1.handleChange}
                    onBlur={form_1.handleBlur}
                    placeholder="Telefono"
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
                </form>
              )}
            </div>

            <div className="w-full justify-center items-center mb-2 flex gap-2">
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
            className="w-1/3 h-1/3 object-fill"
            src="https://media-public.canva.com/8mBPw/MAFyI18mBPw/1/tl.png"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
