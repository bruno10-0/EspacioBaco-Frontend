import { NavBar } from "../common/navBar/navBar.jsx";
import { Footer } from "../common/footer/footer.jsx";
import { useEffect, useState } from "react";
import { useContexto } from "../../context/Context.jsx";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { mostrarAlerta } from "../../helpers/helpers.js";

export const UsersSeeAndDelete = () => {
  const { users, deleteUsuarioById, deleteMultipleUsuarios } = useContexto();
  const [usersCopy, setUsersCopy] = useState([]);
  const [SelectedUsersId, setSelectedUsersId] = useState([]);
  const [searchText, setSearchText] = useState("");
  const handleDeleteUser = async () => {
    if (SelectedUsersId.length === 1) {
      try {
        const res = await deleteUsuarioById(SelectedUsersId[0]);
        if (res.status === 403) {
          mostrarAlerta(res, "error");
        }
        if (res.status === 200) {
          mostrarAlerta(res, "success");
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    } else {
      try {
        const res = await deleteMultipleUsuarios(SelectedUsersId);
        if (res.status === 403) {
          mostrarAlerta(res, "error");
        }
        if (res.status === 200) {
          mostrarAlerta(res, "success");
        }
      } catch (error) {
        console.error("Error al eliminar usuarios múltiples:", error);
        // Manejar otros errores si es necesario
      }
    }
  };

  const handleCheckboxChange = (index) => {
    if (index === -1) {
      // Checkbox del encabezado seleccionado, marcar todos los checkboxes de las filas
      const allChecked = usersCopy.every((user) => user.checked);
      const updatedUsersCopy = usersCopy.map((user) => ({
        ...user,
        checked: !allChecked,
      }));
      setUsersCopy(updatedUsersCopy);
      setSelectedUsersId(allChecked ? [] : usersCopy.map((user) => user.id));
    } else {
      setUsersCopy((prevUsersCopy) =>
        prevUsersCopy.map((user, i) =>
          i === index ? { ...user, checked: !user.checked } : user
        )
      );

      setSelectedUsersId((prevIds) => {
        const productId = usersCopy[index].id;
        if (prevIds.includes(productId)) {
          return prevIds.filter((id) => id !== productId);
        } else {
          return [...prevIds, productId];
        }
      });
    }
  };

  useEffect(() => {
    // Agregar el campo "checked" a cada usuario en usersCopy
    const updatedUsersCopy = users.map((user) => ({ ...user, checked: false }));
    setUsersCopy(updatedUsersCopy);
  }, [users]);

  useEffect(() => {
    setSelectedUsersId([]);
    const filteredUsers = users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        user.direccion.toLowerCase().includes(searchText.toLowerCase())
    );
    setUsersCopy(filteredUsers);
  }, [searchText, users]);

  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div className="mt-16 md:mt-28 bg-base-100 w-full p-2">
        <div className="w-full pt-4 px-4 font-bold">
          <h1 style={{ letterSpacing: "2px" }}>Administración de usuarios.</h1>
          <h2
            style={{ letterSpacing: "2px" }}
            className="mt-4 text-xs font-light"
          >
            Busca por Nombre, Apellido, N° Identificador o Dirección.
          </h2>
        </div>
        <div className="bg-base-100 z-20 navbar w-auto">
          <div className="w-screen flex gap-2">
            {/*Search bar*/}
            <div className="flex items-center border gap-2 w-2/4 md:w-2/4">
              <IoSearchOutline className="text-2xl mx-2 text-gray-500" />
              <input
                value={searchText}
                type="text"
                placeholder="Buscar..."
                className="w-full bg-transparent p-3 focus:outline-none"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="carousel flex gap-2">
              <Link
                to="/super-administrador/usuarios/crear"
                className="carousel-item btn bg-primary text-base-100"
              >
                <IoMdAdd className="text-lg" />
              </Link>
              {SelectedUsersId.length > 0 && (
                <div className="carousel-item">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="carousel-item btn bg-red-500 text-base-100"
                  >
                    <RiDeleteBin7Line className="text-lg" />
                  </button>
                  <dialog id="my_modal_1" className="modal ">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        ¿Estás seguro de eliminar este usuario?
                      </h3>
                      <p className="py-4 text-sm">
                        Estás a punto de eliminar este usuario. Ten en cuenta
                        que esta acción es irreversible.
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleDeleteUser();
                              }}
                              className="btn bg-error text-base-100"
                            >
                              ¡Sí, eliminar!
                            </button>
                            <button className="btn bg-primary text-base-100">
                              ¡No!
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ minHeight: "calc(100vh - 200px)" }}
          className="overflow-x-auto"
        >
          <table className="table transition-all ease-in-out">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={usersCopy.every((user) => user.checked)}
                      onChange={() => handleCheckboxChange(-1)} // Índice -1 indica checkbox del encabezado
                    />
                  </label>
                </th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo</th>
                <th>N° identificador</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {usersCopy.map((user, index) => (
                <tr key={index}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={user.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </label>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-sm">
                            {user.nombre.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <h1>{user.nombre}</h1>
                    </div>
                  </td>
                  <td>
                    <h1>{user.apellido}</h1>
                  </td>
                  <td>
                    <h1>{user.tipo}</h1>
                  </td>
                  <td>{user.id}</td>

                  <td>
                    <h1>{user.telefono}</h1>
                  </td>
                  <td>
                    <h1>{user.direccion}</h1>
                  </td>
                  <td>
                    <Link
                      to={`/super-administrador/usuarios/detalles/${user.id}`}
                      className="btn btn-accent text-base-100"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Tipo</th>
                <th>N° identificador</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Editar</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
