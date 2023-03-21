import { Link } from "react-router-dom"
import { useAuth0 }  from "@auth0/auth0-react";
import ProfileIcon from "./ProfileIcon";

const linkStyle = {
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1.5rem",
  fontWeight: 600,
  color: "white"
}

const Navbar = () => {

  const { user,isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    })
  }

  console.log(isAuthenticated)

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/search" style={linkStyle}>Search</Link></li>
          <li><Link to="/about" style={linkStyle}>About</Link></li>
          {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log in</button> }
          <ProfileIcon />
          {isAuthenticated && <button onClick={() => logoutWithRedirect()}>Log out</button> }
        </ul>
      </nav>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150"><path fill="#213547" fillOpacity="1" d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,144C1120,160,1280,160,1360,160L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
    </>
  )
}

export default Navbar