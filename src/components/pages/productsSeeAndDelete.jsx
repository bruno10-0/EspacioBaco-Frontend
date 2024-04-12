import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { useEffect, useState } from "react";
import { useContexto } from "../../context/Context";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin7Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/auth.js";

export const ProductsSeeAndDelete = () => {
  const { products, setProducts, DeleteProductoById, deleteMultipleProductos } =
    useContexto();
  const [productCopy, setProductCopy] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleDeleteProduct = async () => {
    if (selectedProductId.length === 1) {
      await DeleteProductoById(selectedProductId[0]);
    } else {
      await deleteMultipleProductos(selectedProductId);
    }
  };

  const handleCheckboxChange = (index) => {
    if (index === -1) {
      // Checkbox del encabezado seleccionado, marcar todos los checkboxes de las filas
      const allChecked = productCopy.every((product) => product.checked);
      const updatedProductCopy = productCopy.map((product) => ({
        ...product,
        checked: !allChecked,
      }));
      setProductCopy(updatedProductCopy);
      setSelectedProductId(
        allChecked ? [] : productCopy.map((product) => product.id)
      );
    } else {
      setProductCopy((prevProductCopy) =>
        prevProductCopy.map((product, i) =>
          i === index ? { ...product, checked: !product.checked } : product
        )
      );

      setSelectedProductId((prevIds) => {
        const productId = productCopy[index].id;
        if (prevIds.includes(productId)) {
          return prevIds.filter((id) => id !== productId);
        } else {
          return [...prevIds, productId];
        }
      });
    }
  };

  useEffect(() => {
    // Agregar el campo "checked" a cada producto en productCopy
    const updatedProductCopy = products.map((product) => ({
      ...product,
      checked: false,
    }));
    setProductCopy(updatedProductCopy);
  }, [products]);

  useEffect(() => {
    setSelectedProductId([]);
    const filteredProducts = products.filter(
      (product) =>
        product.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        product.nombreBodega.toLowerCase().includes(searchText.toLowerCase()) ||
        product.descripcion_corta
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        product.descripcion_detallada
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        product.tipo.toLowerCase().includes(searchText.toLowerCase())
    );
    setProductCopy(filteredProducts);
  }, [searchText, products]);

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data); // Establece la lista de productos en el estado
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProducts();
  }, []);

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data); // Establece la lista de productos en el estado
      } catch (error) {
        console.error("Error al buscar los productos:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="w-full overflow-x-hidden">
      <NavBar />
      <div className="mt-16 md:mt-32 bg-base-100 w-full">
        <div className="w-full pt-4 px-4 font-bold">
          <h1 style={{ letterSpacing: "2px" }}>Administración de Productos.</h1>
          <h2
            style={{ letterSpacing: "2px" }}
            className="mt-4 text-xs font-light"
          >
            Busca por Nombre, Bodega, Tipo o Descripción.
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
                to="/super-administrador/productos/crear"
                className="carousel-item btn bg-primary text-base-100"
              >
                <IoMdAdd className="text-lg" />
              </Link>
              {selectedProductId.length > 0 && (
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
                        ¿Estás seguro de eliminar este vino?
                      </h3>
                      <p className="py-4 text-sm">
                        Borrar este vino es como sacar el corcho de una botella
                        de vino reserva: una vez que se descorcha, no se puede
                        volver atrás.
                      </p>

                      <div className="modal-action">
                        <form method="dialog">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                handleDeleteProduct();
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
                      checked={productCopy.every((product) => product.checked)}
                      onChange={() => handleCheckboxChange(-1)}
                    />
                  </label>
                </th>
                <th>Precio</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Bodega</th>
                <th>N° identificador</th>
                <th>Descripción pequeña</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {productCopy.map((product, index) => (
                <tr key={index}>
                  <td>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={product.checked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    </label>
                  </td>
                  <td>
                    <h1>${product.precio}</h1>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-14 rounded-full">
                          <img
                            src={product.imagen}
                            className="object-fill  w-full h-full bg-primary"
                          />
                        </div>
                      </div>
                      <h2>{product.nombre}</h2>
                    </div>
                  </td>
                  <td>{product.tipo}</td>
                  <td>{product.nombreBodega}</td>
                  <td>{product.id}</td>
                  <td>{product.descripcion_corta}</td>
                  <td>
                    <Link
                      to={`/super-administrador/productos/detalles/${product.id}`}
                      className="btn btn-accent text-base-100"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Precio</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Bodega</th>
                <th>N° identificador</th>
                <th>Descripción pequeña</th>
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
