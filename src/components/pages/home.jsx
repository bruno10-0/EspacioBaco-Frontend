import { NavBar } from "../common/navBar/navBar";
import { Footer } from "../common/footer/footer";
import { SliderAuto } from "../common/sliderAuto/sliderAuto";
import { SiliderMobile } from "../common/siliderMobile/siliderMobile";
import { SliderMobile2 } from "../common/siliderMobile/sliderMobile2";
import {InfiniteSlider } from "../common/sliderAuto/infiniteSlider"
export const Home = () => {
  return (
    <div className="bg-base-200">
      <NavBar />
      <SliderAuto />
      <SiliderMobile />
      <SliderMobile2 />
      <InfiniteSlider />
      <Footer />
    </div>
  );
};
