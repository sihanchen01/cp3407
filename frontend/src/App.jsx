import { useState, useEffect } from 'react'
import CircleLoader from "react-spinners/CircleLoader"
import BeatLoader from "react-spinners/BeatLoader"
import Footer from './components/Footer'

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
    if (data.success){
      setImgUrl(data.url);
      setImgLoading(false);
    } else {
      console.log("Image failed")
      setImgUrl("https://media.istockphoto.com/id/182278828/photo/failed-square-stamp.jpg?s=612x612&w=0&k=20&c=Qd54_jcau3xM1Qmn7wzwH9n-cJCn2VWjMw9KMHwr1qM=")
    }
  }

  const getStory = async() => {
    let res = await fetch(STORY_URL);
    let data = await res.json();
    if (data.success){
      console.log(data.story)
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
    <div className="App">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 120 1440 110"><path fill="#213547" fill-opacity="0.95" d="M0,224L80,197.3C160,171,320,117,480,106.7C640,96,800,128,960,144C1120,160,1280,160,1360,160L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      <h1>Batman VS Ironman</h1>
      <div className={storyLoading ? "loading" : "content"}>
        {imgLoading ? <CircleLoader size={120} color={"#36d7b7"} speedMultiplier={0.5}/> : <img src={imgUrl} alt="Story Image" />}
        {storyLoading ? <BeatLoader size={60} color={"#36d7b7"}speedMultiplier={0.5}/> : <p>{story} <br/><span className='chatgpt'>-- ChatGPT</span></p>}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -70 1440 350"><path fill="#213547" fill-opacity="1" d="M0,224L60,202.7C120,181,240,139,360,117.3C480,96,600,96,720,112C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <Footer />
    </div>
  )
}

export default App
