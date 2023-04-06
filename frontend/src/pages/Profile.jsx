import { useAuth0 } from "@auth0/auth0-react"
import { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const {user, isAuthenticated} = useAuth0();
  const [searchHistory, setSearchHistory] = useState([])
  const [resultsNumber, setResultsNumber] = useState(0)

  const getSearchResults = async() => {
    let res = await fetch("http://localhost:8001/getAllResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userEmail: "sihanchen01@outlook.com"})
    })

    let data = await res.json();
    if (data.success){
      setSearchHistory(data.results)
      // setResults();
      // setStoryLoading(false);
    } else {
      // setResults("failed");
    }
  }

  useEffect(() => {
    getSearchResults()
  }, [])

  return (
    <Container>
      <h1 className="text-center fw-bold mb-5">Profile Page</h1>

      {isAuthenticated && (
        <div className="d-flex flex-column align-items-center">
          <p>{JSON.stringify(user)}</p>
          <img src={user?.picture} alt="user-image" className="img-thumbnail my-5 rounded-circle mx-auto d-block"/>
          <p>Username: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <Link to="/history" state={{searchHistory: searchHistory}}>
            <Button className="py-3 px-5">
              View {searchHistory ? searchHistory.length : resultsNumber} Results
            </Button>
          </Link>
        </div>
      )}

      {!isAuthenticated && (
        <h2>Not log in yet!</h2>
      )}
    </Container>
  )
}

export default Profile