import { NavBar } from "../components/navBar/navBar";
import { Footer } from "../components/footer/footer";
import {Error} from "../components/error/error"
export const NotFound = () => {
  return (
    <div>
      <NavBar/>
      <Error/>
      <Footer/>
    </div>
  )
}
