import './App.css'
import { useState, useEffect } from 'react'
import CircleLoader from "react-spinners/CircleLoader"
import BeatLoader from "react-spinners/BeatLoader"

const IMAGE_URL = "http://127.0.0.1:8001/image"
const STORY_URL = "http://127.0.0.1:8001/story"

function App() {
  const [imgUrl, setImgUrl] = useState("")
  const [story, setStory] = useState("...")
  const [imgLoading, setImgLoading] = useState(true)
  const [storyLoading, setStoryLoading] = useState(true)

  const getImage = async() => {
    let res = await fetch(IMAGE_URL);
    let data = await res.json();
    console.log("Image retrieved");
    setImgUrl(data.url);
    setImgLoading(false);
  }

  const getStory = async() => {
    let res = await fetch(STORY_URL);
    let data = await res.json();
    console.log("Story retrieved");
    setStory(data.story);
    setStoryLoading(false);
  }

  useEffect(() => {
    getImage()
    getStory()
  }, [])

  return (
    <div className="App">
      <h1>Story</h1>
      {imgLoading ? <CircleLoader size={120} color={"#36d7b7"}/> : <img src={imgUrl} alt="Story Image" />}
      {storyLoading ? <BeatLoader size={60} color={"#36d7b7"} /> : <p>{story}</p>}
    </div>
  )
}

export default App
