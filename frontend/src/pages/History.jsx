import { Link, useLocation } from "react-router-dom"

const History = () => {
  const location = useLocation();
  const {searchHistory} = location.state;
  
  return (
    <>
      <h1 className="h1-custom">Search History</h1>
      <hr />
      {searchHistory.map((h, index) => (
        <div key={index} className="text-center">
          <p>Search No.{index + 1}</p>
          <p>Search Query: {h.SearchQuery}</p>
          <p>Story: {h.Story?.split(".")[0]} ...</p>
          <p>Image: &nbsp;&nbsp;&nbsp;
          <Link to="/historyDetail" state={{searchResult: h}}>
            <img src={h.ImageUrl || ""} alt="search history image" width={80} height={80}/>
          </Link>
          </p>
          <p>Creation Date: {h.CreationDate || ""}</p> 
          <hr />
        </div>
      ))}
    </>
  )
}

export default History