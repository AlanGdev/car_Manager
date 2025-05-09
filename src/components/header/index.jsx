import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import brandImg from '../../assets/VroomTrack-logo.png'
import './index.css'
function Header() {
  return (
    <>
      <Navbar expand="lg" className="navbar-vroom bg-body-tertiary m-1 position-relative z-3">
        <Container fluid className="px-0">
          <Navbar.Brand href="#home" className="d-flex align-items-center m-0 p-0">
            <img src={brandImg} alt="Logo VroomTrack" height="120" className="p-2" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Accueil
              </Nav.Link>
              <Nav.Link as={Link} to="/vehicule">
                Vehicule
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Header
