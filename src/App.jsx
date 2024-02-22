import { NavBar } from "./components/navBar/navBar"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<NavBar />} />
      </Routes>
    </Router>
    
    </>
  )
}

export default App
