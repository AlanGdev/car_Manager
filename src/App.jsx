import './styles/bootstrap.scss'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Vehicule from './pages/vehicule'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule" element={<Vehicule />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}
export default App
