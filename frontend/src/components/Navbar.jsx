import { useAuth0 }  from "@auth0/auth0-react";
import ProfileIcon from "./ProfileIcon";
import { Button } from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap"
import { useEffect } from "react";

// Bootstrap Navbar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



const MyNavbar = () => {

  const { user,isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
  }, [])
  

  const logoutWithRedirect = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })
  }

  const navItemClick = (e) => {
    e.currentTarget.classList.toggle('nav-active')
  }


  return (
    <>
      <Navbar className="mynavbar" expand="lg">
        <Container>
          <Navbar.Brand className="fs-4 fw-bold">IDEA Generator</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className="fs-5 fw-bold mx-2">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link className="fs-5 fw-bold mx-2">Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/whoami">
                <Nav.Link className="fs-5 fw-bold mx-2">Who Am I</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="fs-5 fw-bold mx-2">About</Nav.Link>
              </LinkContainer>

              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}

              {/* Log In Button */}
              {!isAuthenticated && <Button variant="dark" className="fw-bold" onClick={() => loginWithRedirect()}>Log in</Button> }
              <ProfileIcon />
              {isAuthenticated && <Button variant="danger" className="fw-bold" onClick={() => logoutWithRedirect()}>Log out</Button> }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150"><path fill="#213547" fillOpacity="1" d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,144C1120,160,1280,160,1360,160L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    </>
  )
}

export default MyNavbar