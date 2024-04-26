import "./infiniteSlider.css"
import logoLosance from "../../../assets/logos_slider/logo-bodega-losance.png"
export const InfiniteSlider = () => {
  return (
    <div className="mt-4">
      <div className="logos-content bg-base-100">
        <div className="logos-slide">
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
        </div>
        <div className="logos-slide">
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
          <img src={logoLosance} alt="logo de vino losance"/>
        </div>
      </div>
    </div>
  );
};
