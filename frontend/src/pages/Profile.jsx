import { useAuth0 } from "@auth0/auth0-react"

const Profile = () => {
  const {user, isAuthenticated} = useAuth0();

  return (
    <>
      <h1>Profile Page</h1>
      {isAuthenticated && (
        <div className="user-profile">
          <p>{JSON.stringify(user)}</p>
          <img src={user?.picture} alt="user-image" />
          <p>Username: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      )}
      {!isAuthenticated && (
        <h2>Not log in yet!</h2>
      )}
    </>
  )
}

export default Profile