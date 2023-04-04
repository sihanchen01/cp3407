import {useAuth0} from "@auth0/auth0-react"
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav"


const ProfileIcon = () => {
  const {user, isAuthenticated} = useAuth0();

  return (
    <>
    {isAuthenticated && (
      <LinkContainer to="/profile">
        <Nav.Link className="fst-italic text-white mx-2">
          <u> Welcome, {user?.name.includes("@") ? user?.nickname : user?.name} </u>
        </Nav.Link>
      </LinkContainer>
    )}
    </>
  )
}

export default ProfileIcon;