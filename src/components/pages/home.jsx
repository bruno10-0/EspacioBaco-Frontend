import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { SliderAuto } from "../common/sliderAuto/sliderAuto";
import { SiliderMobile } from "../common/siliderMobile/siliderMobile";
export const Home = () => {
  return (
    <div className="bg-base-200">
      <NavBar />
      <SliderAuto />
      <SiliderMobile />
      <Footer />
    </div>
  );
};
