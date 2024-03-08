import { useEffect } from "react";
import { TbColorSwatch } from "react-icons/tb";
import { useContexto } from "../../../context/Context";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
export const NavBarAdmin = () => {
  const { changeTheme } = useContexto();

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    localStorage.setItem("espacioBacoTheme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("espacioBacoTheme");
    if (storedTheme) {
      changeTheme(storedTheme);
    }
  }, [changeTheme]);

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-100">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <FaBars></FaBars>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2">
            <div className="flex justify-center">
              <div className="flex gap-10">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M37.5274 0L75.0548 65H0L37.5274 0Z"
                    className="fill-primary"
                  />
                </svg>
              </div>
              <Link to="/">
                <h1>
                  <span className="text-lg font-bold ">Espacio</span>Baco
                </h1>
              </Link>
            </div>
          </div>
          <div className="felx gap-6 mx-4">
            <div
              tabIndex={0}
              className="z-10 dropdown dropdown-end max-h-[calc(100vh-300px)]"
            >
              <TbColorSwatch tabIndex={0} role="button" className="text-2xl" />
              <div
                tabIndex={0}
                className=" shadow-2xl mt-8 rounded-badge dropdown-content max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-10rem)] w-48 md:w-56 overflow-y-auto bg-base-100 flex flex-col gap-2 p-4"
              >
                {themes.map((theme, index) => (
                  <button
                    data-theme={theme}
                    key={index}
                    className="px-4 py-3 gap-2 outline-offset-4 flex justify-evenly items-center rounded-badge bg-base-200 hover:scale-105 ease-in-out duration-100"
                    onClick={() => handleThemeChange(theme)}
                  >
                    <p
                      data-theme={theme}
                      className="flex-grow text-sm bg-base-200"
                    >
                      {theme}
                    </p>
                    <div className="flex h-full gap-1">
                      <span
                        data-theme={theme}
                        className="bg-primary rounded-badge w-2 text-primary"
                      >
                        1
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-secondary rounded-badge w-2 text-secondary"
                      >
                        2
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-accent rounded-badge w-2 text-accent"
                      >
                        3
                      </span>
                      <span
                        data-theme={theme}
                        className="bg-neutral rounded-badge w-2 text-neutral"
                      >
                        1
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="text-end text-xs hidden lg:block">
                <h1>Admin</h1>
                <h2>hola@mundo.com</h2>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <div className="flex items-center gap-2 btn hover:bg-red-500 hover:text-base-100 rounded-badge border-none">
                    <FaPowerOff />
                    <a>Cerrar la sesión</a>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
