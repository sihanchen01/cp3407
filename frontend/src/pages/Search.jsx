import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { Button, Container } from "react-bootstrap"
import { FiSearch } from "react-icons/fi"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Hello")

  const {user, isAuthenticated} = useAuth0();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }


  return(
    <Container className="text-center">
      {user && isAuthenticated && (
        <>
          {user.email_verified ? 
          <>
            <h1 className="h1-custom">IDEA Generator</h1>
            <div className="search_container">
              <input type="text" placeholder="What's on your mind?" className="search_input" onChange={handleChange} maxLength={80}/>
              <Link to="/content" state={{searchTerm: searchTerm}}><Button className="py-3 px-5"><FiSearch size={35}/></Button></Link>
            </div>
          </>
          : 
          <>
            <h1 className="h1-custom">Verify your account start enjoy Searching :)</h1>
            <h4 className="fw-bold">Check your email inbox: <u>{user.email}</u></h4>
          </>
          }
        </>
      )}
      {!user && !isAuthenticated && (
        <>
          <h1 className="h1-custom">Sign up now to enjoy Searching!</h1>
          <Link to="/"><h4>Back to home page...</h4></Link>
        </>
      )}
    </Container>
  )
}

export default Search