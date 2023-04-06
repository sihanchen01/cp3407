import { useLocation, useRouteLoaderData } from "react-router-dom"

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
          <p>Story: {h.Story.length > 10 ? h.Story.slice(0, 10) : h.Story}</p>
          <p>Image: <a href={h.ImageUrl}>click</a> </p>
          <p>Creation Date: {h.CreationDate}</p> 
          <hr />
        </div>
      ))}
    </>
  )
}

export default History