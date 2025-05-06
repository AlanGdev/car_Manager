import './styles/bootstrap.scss'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import VehiculePage from './pages/vehiculePage'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <>
      <Router basename="/car_Manager">
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicule" element={<VehiculePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  )
}
export default App
