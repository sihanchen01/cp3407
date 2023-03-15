import { useState, useEffect } from 'react'
import CircleLoader from "react-spinners/CircleLoader"
import BeatLoader from "react-spinners/BeatLoader"
import { useLocation } from 'react-router-dom'

const IMAGE_URL = "http://127.0.0.1:8001/image"
const STORY_URL = "http://127.0.0.1:8001/story"

const Content = () => {

  const location = useLocation();
  const {searchTerm} = location.state;

  const [imgUrl, setImgUrl] = useState("")
  const [story, setStory] = useState("...")
  const [imgLoading, setImgLoading] = useState(true)
  const [storyLoading, setStoryLoading] = useState(true)

  const getImage = async() => {

    let res = await fetch(IMAGE_URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({reqPrompt: searchTerm})
    });

    let data = await res.json();
    if (data.success){
      setImgUrl(data.url);
      setImgLoading(false);
    } else {
      console.log("Image failed")
      setImgUrl("https://media.istockphoto.com/id/182278828/photo/failed-square-stamp.jpg?s=612x612&w=0&k=20&c=Qd54_jcau3xM1Qmn7wzwH9n-cJCn2VWjMw9KMHwr1qM=")
    }
  }

  const getStory = async() => {
    let res = await fetch(STORY_URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({reqPrompt: searchTerm})
    });
    let data = await res.json();
    if (data.success){
      setStory(data.story);
      setStoryLoading(false);
    } else {
      setStory("Failed to retrieve story...")
    }
  }

  useEffect(() => {
    getImage()
    getStory()
  }, [])

  return (
    <div>
        {searchTerm.length > 40 ? 
          <h1 className='search_term_short'>{searchTerm.slice(0, 40)} ...
            <span className='search_term_full'>{searchTerm}</span>
          </h1> 
        : <h1>{searchTerm}</h1> }

      <div className={storyLoading ? "loading" : "content"}>
        {imgLoading ? <CircleLoader size={120} color={"#36d7b7"} speedMultiplier={0.5}/> : <img src={imgUrl} alt={searchTerm} />}
        {storyLoading ? <BeatLoader size={60} color={"#36d7b7"}speedMultiplier={0.5}/> : <p>{story} <br/><span className='chatgpt'>-- ChatGPT</span></p>}
      </div>
    </div>
  )
}

export default Content
