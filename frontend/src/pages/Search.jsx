import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Hello")

  const {user, isAuthenticated} = useAuth0();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }


  return(
    <>
      {user && isAuthenticated && (
        <>
          {user.email_verified ? 
          <>
            <h1>IDEA Generator</h1>
            <div className="search_container">
              <input type="text" placeholder="What's on your mind?" className="search_input" onChange={handleChange} maxLength={80}/>
              <Link to="/content" state={{searchTerm: searchTerm}}><button className="search_button">GO</button></Link>
            </div>
          </>
          : 
          <>
            <h1>Verify your account start enjoy Searching :)</h1>
            <p>Your email account: {user.email}</p>
          </>
          }
        </>
      )}
      {!user && !isAuthenticated && (
        <>
          <h1>Sign up now to enjoy Searching!</h1>
          <Link to="/"><p>back to home page...</p></Link>
        </>
      )}
    </>
  )
}

export default Search