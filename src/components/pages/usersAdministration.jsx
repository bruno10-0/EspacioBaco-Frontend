import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useEffect, useState } from "react";
import { useContexto } from "../../context/Context";
import { IoSearchOutline, IoFilter } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { MdOutlineRemove } from "react-icons/md";
import {
  filtrarUsuariosPorTipo,
  ordenarPorFechaCreacion,
  ordenarPorFechaCreacionDesc,
} from "../../helpers/orderArray.js";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin7Line } from "react-icons/ri";

export const UsersAdministration = () => {
  const { users, deleteUsuarioById, deleteMultipleUsuarios, handleOrdenamientoChange } =
    useContexto();
  const [usersCopy, setUsersCopy] = useState([]);
  const [SelectedUsersId, setSelectedUsersId] = useState([]);
  const [order, setOrder] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleDeleteUser = async () => {
    if (SelectedUsersId.length === 1) {
      const res = await deleteUsuarioById(SelectedUsersId[0]);
      console.log(res);
    } else {
      const res = await deleteMultipleUsuarios(SelectedUsersId);
      console.log(res)
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
  }, [users, order]);

  useEffect(() => {
    // Filtrar la lista de usuarios basándose en el texto de búsqueda
    const filteredUsers = users.filter(
      (user) =>
        user.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        user.apellido.toLowerCase().includes(searchText.toLowerCase()) ||
        user.id.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    setUsersCopy(filteredUsers);
  }, [searchText, users]);

  useEffect(() => {
    switch (order) {
      case 0:
        return;
      case 1:
        setUsersCopy([...ordenarPorFechaCreacionDesc(usersCopy)]);
        break;
      case 2:
        setUsersCopy([...ordenarPorFechaCreacion(usersCopy)]);
        break;
      case 3:
        setUsersCopy([...filtrarUsuariosPorTipo(users, "admin")]);
        break;
      case 4:
        setUsersCopy([...filtrarUsuariosPorTipo(users, "normal")]);
        break;
      default:
        alert("Ordenamiento no válido.");
    }
  }, [order]);

  useEffect(() => {
    console.log(SelectedUsersId);
  }, [SelectedUsersId]);

  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div
        className="mt-16 md:mt-32 bg-base-100 w-full"
      >
        <div className="w-full pt-4 px-4 font-bold">
          <h1 style={{ letterSpacing: "2px" }}>Administración de usuarios.</h1>
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
            <button type="button" className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-primary text-base-100"
              >
                <IoFilter className="text-lg" />
              </div>
              <ul className="p-2 mt-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-60">
                <li onClick={() => handleOrdenamientoChange(1, setOrder)}>
                  <div className="flex gap-1">
                    {order === 1 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Creacion. Nuevo a Viejo
                  </div>
                </li>

                <li onClick={() => handleOrdenamientoChange(2, setOrder)}>
                  <div className="flex gap-1">
                    {order === 2 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Creacion. Viejo a Nuevo
                  </div>
                </li>
                <li onClick={() => handleOrdenamientoChange(3, setOrder)}>
                  <div className="flex gap-1">
                    {order === 3 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Tipo. Administradores
                  </div>
                </li>
                <li onClick={() => handleOrdenamientoChange(4, setOrder)}>
                  <div className="flex gap-1">
                    {order === 4 ? (
                      <FaCheck className="text-xs" />
                    ) : (
                      <MdOutlineRemove className="text-xs" />
                    )}
                    Tipo. Normales
                  </div>
                </li>
              </ul>
            </button>
            <div className="carousel flex gap-2">
              <button className="carousel-item btn bg-primary text-base-100">
                <IoMdAdd className="text-lg" />
              </button>
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
                        ¿Estás seguro de descorchar este usuario?
                      </h3>
                      <p className="py-4 text-sm">
                        Borrar este usuario es como abrir una botella de vino
                        añejo: una vez que se descorcha, no hay vuelta atrás.
                      </p>
                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleDeleteUser();
                              }}
                              className="btn bg-warning text-base-100"
                            >
                              ¡Sí, descorchar!
                            </button>
                            <button className="btn bg-primary text-base-100">
                              ¡No, guardar!
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
        <div className="overflow-x-auto">
          <table className="table transition-all ease-in-out">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input
                      value={false}
                      type="checkbox"
                      className="checkbox"
                      checked={usersCopy.every((user) => user.checked)}
                      onChange={() => handleCheckboxChange(-1)} // Índice -1 indica checkbox del encabezado
                    />
                  </label>
                </th>
                <th>Tipo</th>
                <th>N° identificador</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Más</th>
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
                    <h1>{user.tipo}</h1>
                  </td>
                  <td>{user.id}</td>
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
                    <h1>{user.telefono}</h1>
                  </td>
                  <td>
                    <h1>{user.direccion}</h1>
                  </td>
                  <td>
                    <h1 className="link">Detalles</h1>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Tipo</th>
                <th>N° identificador</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Más</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};
