import {Home} from "./pages/home";
import {Bodega} from "./pages/bodega";
import {Details} from "./pages/details";
import {NotFound} from "./pages/notFound"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="bg-base-200">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bodega" element={<Bodega />} />
        <Route path="/detalles" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
