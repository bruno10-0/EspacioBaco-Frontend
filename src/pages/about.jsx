import { NavBar } from "../components/navBar/navBar";
import { Footer } from "../components/footer/footer";
import {AboutSection} from "./../components/aboutSection/aboutSection"
import {Purpose} from "./../components/aboutSection/purpose"
export const About = () => {
  return (
    <div>
      <NavBar />
      <AboutSection/>
      <Purpose />
      <Footer />
    </div>
  );
};
