import {Home} from "./components/pages/home"
import {VinoTeca} from "./components/pages/vinoteca"
import {About} from "./components/pages/about"
import {Details} from "./components/pages/details"
import {NotFound} from "./components/pages/notFound"
import { Admin } from "./components/pages/admin"
import {AdminEditProduct} from "./components/pages/adminEditProduct"
import {Login} from "./components/pages/login"
import {SignUp} from "./components/pages/signUp"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="bg-base-200">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vinoteca" element={<VinoTeca />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/vinoteca/detalles-vino/:id" element={<Details />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/crear-cuenta" element={<SignUp />} />
       
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/editar/vino/:id" element={<AdminEditProduct/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
