import { NavBar } from "../common/navBar/navBar"
import { Footer } from "../common/footer/footer";
import { Error } from "../common/error/error";
export const NotFound = () => {
  return (
    <div>
      <NavBar />
      <Error />
      <Footer />
    </div>
  );
};
