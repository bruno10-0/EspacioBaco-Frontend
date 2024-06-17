import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useContexto } from "../../../context/Context";
import { editMyUser } from "../../../api/auth";
import { decryptToken } from "../../../helpers/token-decrypt";
import { mostrarAlerta } from "../../../helpers/helpers";
import { Loading3 } from "../loading/loading3";
export const FormComponent = () => {
  const [loading, setLoading] = useState(false);
  const { actualizarListaUsuarios, setUser } = useContexto();
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
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
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const token = localStorage.getItem("nekot");

      if (!token) {
        console.log("No hay token, no se puede realizar la operación");
        setLoading(false);
        document.getElementById("modalEditarPerfil").close();
        return;
      }

      const decryptedToken = decryptToken(token);

      const dataToSend = {
        token: decryptedToken,
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        telefono: values.telefono,
        direccion: values.direccion,
      };
      try {
        const res = await editMyUser(dataToSend);
        if (res.status == 200) {
          mostrarAlerta(res, "success");
        }
        setUser(res.data.usuario);
        actualizarListaUsuarios();
        document.getElementById("modalEditarPerfil").close();
        return setLoading(false);
      } catch (error) {
        console.log(error);
        if (error.response.status >= 400) {
          mostrarAlerta(error.response, "error");
        }
        document.getElementById("modalEditarPerfil").close();
        return setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {loading && <Loading3 />}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="nombre" className="block text-sm font-medium">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nombre}
          />
          {formik.touched.nombre && formik.errors.nombre ? (
            <div className="text-red-600 text-sm">{formik.errors.nombre}</div>
          ) : null}
        </div>
        <div className="space-y-2">
          <label htmlFor="apellido" className="block text-sm font-medium">
            Apellido
          </label>
          <input
            id="apellido"
            name="apellido"
            type="text"
            placeholder="Ingresa tu apellido"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.apellido}
          />
          {formik.touched.apellido && formik.errors.apellido ? (
            <div className="text-red-600 text-sm">{formik.errors.apellido}</div>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="correo" className="block text-sm font-medium">
          Correo electrónico
        </label>
        <input
          id="correo"
          name="correo"
          type="email"
          placeholder="ejemplo@gmail.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.correo}
        />
        {formik.touched.correo && formik.errors.correo ? (
          <div className="text-red-600 text-sm">{formik.errors.correo}</div>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="telefono" className="block text-sm font-medium">
          Celular
        </label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          placeholder="1234 567890"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.telefono}
        />
        {formik.touched.telefono && formik.errors.telefono ? (
          <div className="text-red-600 text-sm">{formik.errors.telefono}</div>
        ) : null}
      </div>
      <div className="space-y-2">
        <label htmlFor="direccion" className="block text-sm font-medium">
          Dirección
        </label>
        <textarea
          id="direccion"
          name="direccion"
          placeholder="Ingresa tu dirección"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-primary sm:text-sm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.direccion}
        ></textarea>
        {formik.touched.direccion && formik.errors.direccion ? (
          <div className="text-red-600 text-sm">{formik.errors.direccion}</div>
        ) : null}
      </div>
      <button type="submit" className="mt-4 btn">
        Guardar
      </button>
    </form>
  );
};
