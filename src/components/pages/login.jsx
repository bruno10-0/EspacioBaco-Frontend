import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { iniciarSesion } from "../../api/auth.js";
import { Loading2 } from "../common/loading/loading2.jsx";
import { useContexto } from "../../context/Context.jsx";
import { encryptToken } from "../../helpers/token-encrypt.js";
import img from "../../assets/Logo/EspacioBaco_blanco.png"
export const Login = () => {
  const { setIsAuthenticated, isAuthenticated } = useContexto();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formik = useFormik({
    initialValues: {
      correo: "",
      contrasenia: "",
    },
    validationSchema: Yup.object({
      correo: Yup.string()
        .email("Correo electrónico inválido")
        .required("El correo electrónico es obligatorio"),
      contrasenia: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setErrors({});
      try {
        const res = await iniciarSesion(values);
        setIsAuthenticated(true);
        const tokenEcrypted = encryptToken(res.data.token);
        localStorage.setItem("nekot",tokenEcrypted);
      } catch (error) {
        setErrors(error.response.data);
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
            Bienvenido
          </h1>
          <h1
            style={{ letterSpacing: "2px" }}
            className="text-xs text-gray-400 mb-10 w-full"
          >
            Ingrese sus credenciales
          </h1>

          <form className="w-5/6 lg:w-2/3" onSubmit={formik.handleSubmit}>
            <div className="mb-4 w-full flex flex-col justify-start">
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="correo"
                className="block mb-1 uppercase text-xs text-start w-full"
              >
                Correo electrónico
              </label>
              <input
                type="correo"
                id="correo"
                name="correo"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Correo electrónico"
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.correo && formik.errors.correo && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.correo}
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                style={{ letterSpacing: "2px" }}
                htmlFor="contrasenia"
                className="block mb-1 uppercase text-xs text-start w-full"
              >
                Contraseña
              </label>
              <input
                placeholder="Contraseña"
                type="password"
                id="contrasenia"
                name="contrasenia"
                value={formik.values.contrasenia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="px-6 w-full py-4 border bg-transparent focus:outline-none text-xs"
              />
              {formik.touched.contrasenia && formik.errors.contrasenia && (
                <div className="my-2 text-error text-start text-xs">
                  {formik.errors.contrasenia}
                </div>
              )}
            </div>

            {errors && (
              <div className="my-2 text-error text-start text-xs">
                {errors.mensaje}
              </div>
            )}

            <div className="flex justify-center w-full">
              {/*<div className="flex gap-2 items-center bg-transparent">
                <input
                  id="checkbox"
                  type="checkbox"
                  checked={formik.values.recordarme}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="recordarme"
                />
                <label
                  htmlFor="checkbox"
                  onClick={() =>
                    formik.setFieldValue(
                      "recordarme",
                      !formik.values.recordarme
                    )
                  }
                >
                  <h3>Recordarme</h3>
                </label>
              </div>
              */}
              <h3
                style={{ letterSpacing: "2px" }}
                className="link text-xs font-semibold my-5"
              >
                Olvidé mi contraseña
              </h3>
            </div>
            <div>
              <button
                style={{ letterSpacing: "4px" }}
                type="submit"
                className="w-full btn bg-accent text-base-100 hover:text-primary py-2 rounded-badge uppercase"
                disabled={formik.isSubmitting}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="w-full justify-center items-center my-4 flex gap-2">
              <h2>No tienes cuenta aún?</h2>
              <Link to="/crear-cuenta" className="link">
                Crear
              </Link>
            </div>
          </form>
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
