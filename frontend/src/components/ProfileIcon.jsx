import {useAuth0} from "@auth0/auth0-react"
import { Link } from "react-router-dom";

const linkStyle = {
  textDecoration: "none",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: 600,
  color: "white"
}


const ProfileIcon = () => {
  const {user, isAuthenticated} = useAuth0();

  return (
    <>
    {isAuthenticated && (
      <li><Link className="user" to="/profile" style={linkStyle}>Welcome, {user?.name.includes("@") ? user?.nickname : user?.name}</Link></li>
    )}
    </>
  )
}

export default ProfileIcon;