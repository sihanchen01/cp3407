import { useAuth0 } from "@auth0/auth0-react"
import { Container } from "react-bootstrap";

const Profile = () => {
  const {user, isAuthenticated} = useAuth0();

  return (
    <Container>
      <h1 className="text-center fw-bold mb-5">Profile Page</h1>
      {isAuthenticated && (
        <div className="d-flex flex-column align-items-center">
          <p>{JSON.stringify(user)}</p>
          <img src={user?.picture} alt="user-image" className="img-thumbnail my-5 rounded-circle mx-auto d-block"/>
          <p>Username: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      )}
      {!isAuthenticated && (
        <h2>Not log in yet!</h2>
      )}
    </Container>
  )
}

export default Profile