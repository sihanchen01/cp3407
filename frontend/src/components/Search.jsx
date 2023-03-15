import { useState } from "react"
import { Link } from "react-router-dom"

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("Hello")

  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }


  return(
    <>
    <h1>IDEA Generator</h1>
    <div className="search_container">
      <input type="text" placeholder="What's on your mind?" className="search_input" onChange={handleChange} maxLength={80}/>
      <Link to="/content" state={{searchTerm: searchTerm}}><button className="search_button">GO</button></Link>
    </div>
    </>
  )
}

export default Search