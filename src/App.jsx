import {Home} from "./pages/home"
import {Bodega} from "./pages/bodega"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-base-200">
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bodega" element={<Bodega />} />
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
