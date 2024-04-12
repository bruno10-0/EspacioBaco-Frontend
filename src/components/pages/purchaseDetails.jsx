import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { IoRemoveSharp, IoAddSharp } from "react-icons/io5";

export const PurchaseDetails = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-16 md:mt-32 -mb-5 w-full bg-base-200 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div
            style={{ minHeight: "60vh" }}
            className="flex flex-col items-center shadow-sm col-span-1 md:col-span-2 bg-base-100"
          >
            <div
              style={{ letterSpacing: "2px" }}
              className="font-semibold w-full p-4 border-b uppercase"
            >
              Bodega
            </div>

            <div className="w-full flex justify-around p-2 md:p-4 gap-6 border-b">
              <div className="avatar">
                <div className="w-20 md:w-24">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <div className="w-24 md:w-1/2 flex items-start flex-col  gap-2">
                <h1 className="font-bold truncate w-full text-sm md:text-base">nombre producto</h1>
                <h2 className="text-xs md:text-sm text-neutral truncate w-full">
                  descipcion small
                </h2>
                <div className="flex justify-center items-start">
                  <button className="text-accent text-xs md:text-base">Eliminar</button>
                </div>
              </div>
              <div className="w-20 md:w-2/12 flex flex-col justify-start items-center gap-2">
                <div className="w-full p-2 flex justify-between gap-2 items-center border border-accent">
                  <button>
                    <IoRemoveSharp className="text-xs md:text-base text-accent" />
                  </button>
                  <span className="text-xs md:text-base text-accent">100</span>
                  <button>
                    <IoAddSharp className="text-xs md:text-base text-accent" />
                  </button>
                </div>
                <p className="text-xs text-neutral">stock 111</p>
              </div>
              <div className="w-20 md:w-2/12 flex-col items-start justify-start">
                <div className="flex flex-col md:flex-row  md:gap-2">
                  <h2 className="text-success text-xs">-15%</h2>
                  <h2 className="text-neutral line-through text-xs">$14k</h2>
                </div>
                <h1 className="text-xs md:text-2xl">$15k</h1>
              </div>
            </div>
          </div>
          <div className="shadow-sm col-span-1 bg-base-100">hola</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
