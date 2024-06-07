import { Home } from "./components/pages/home";
import { VinoTeca } from "./components/pages/vinoteca";
import { About } from "./components/pages/about";
import { Details } from "./components/pages/details";
import { NotFound } from "./components/pages/notFound";
import { Admin } from "./components/pages/admin";
import { Login } from "./components/pages/login";
import { SignUp } from "./components/pages/signUp";
import { ProtectedRouteAdmin } from "./utils/protectedRouteAdmin";
import { ProtectedRouteNormal } from "./utils/protectedRouteNormal";
import { Profile } from "./components/pages/profile";
import {UsersSeeAndDelete} from "./components/pages/usersSeeAndDelete"
import { UsersCreate } from "./components/pages/usersCreate";
import {DetailsUser} from "./components/pages/detailsUser"
import {CarouselHome} from "./components/pages/carouselHome"
import {UseVerifyAuthentication} from "./utils/useVerifyAuthentication"
import {ProductsSeeAndDelete} from "./components/pages/productsSeeAndDelete"
import {ProductCreate} from "./components/pages/productCreate"
import {DetailsProduct} from "./components/pages/detailsProduct"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PurchaseDetails} from "./components/pages/purchaseDetails"
import {DetailsOrders} from "./components/pages/detailsOrders"
import {DetailsEspecificOrder} from "./components/pages/detailsEspecificOrder"
function App() {
  return (
    <div className="bg-base-200">
      <Router>
      <UseVerifyAuthentication >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vinoteca" element={<VinoTeca />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/vinoteca/detalles-vino/:id" element={<Details />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/crear-cuenta" element={<SignUp />} />
          <Route path="/detalles-compra" element={<PurchaseDetails />} />

          <Route element={<ProtectedRouteNormal />}>
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/super-administrador" element={<Admin />} />
              <Route path="/super-administrador/ordenes" element={<DetailsOrders/>} />
              <Route path="/super-administrador/ordenes/detalles/:id" element={<DetailsEspecificOrder/>} />
              <Route path="/super-administrador/usuarios" element={<UsersSeeAndDelete />} />
              <Route path="/super-administrador/usuarios/crear" element={<UsersCreate/>} />
              <Route path="/super-administrador/usuarios/detalles/:id" element={<DetailsUser/>} />
              <Route path="/super-administrador/slider" element={<CarouselHome/>} />
              <Route path="/super-administrador/productos" element={<ProductsSeeAndDelete/>} />
              <Route path="/super-administrador/productos/crear" element={<ProductCreate/>} />
              <Route path="super-administrador/productos/detalles/:id" element={<DetailsProduct/>} />
            </Route>
            <Route path="/perfil" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        </UseVerifyAuthentication >
      </Router>
    </div>
  );
}

export default App;
