import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CircleLoader from "react-spinners/CircleLoader"
import BeatLoader from "react-spinners/BeatLoader"
import Feedback from '../components/Feedback'
import { Button } from "react-bootstrap";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// TESTING
const TESTING = {
  SEND_FEEDBACK_URL: "http://localhost:8001/story-with-image-feedback",
  STORY_WITH_IMAGE_URL: "http://localhost:8001/story-with-image",
  IMAGE_URL: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-ZaXydM1GAsZ52cjwJ0x4IY47/user-5SSy4KB2scLT6wIa4JNV5GkW/img-iF2NF33ujtNCoNIJ0SU6nf45.png?st=2023-04-08T02%3A31%3A20Z&se=2023-04-08T04%3A31%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-07T21%3A38%3A08Z&ske=2023-04-08T21%3A38%3A08Z&sks=b&skv=2021-08-06&sig=3kAZqtwitl5wjjtDrroR2FyByRt5E5HlMdcuNymcasc%3D",
  STORY: "I am a bird, soaring high above the clouds, searching for new horizons to explore. I am an adventurer, eager to discover all the wonders this world has to offer. From a young age, I knew that flying was my destiny. I spent hours practicing my techniques and honing my skills, determined to become the best flier I could be. I learned to navigate by the stars, to sense changes in the weather, and to find my way through the winds. As I grew older, I ventured further and further from my home, always seeking new sights and sounds. I have seen towering mountains and vast oceans, desert sands and lush jungles, and I know that there are still many new lands waiting to be explored. As I fly, I feel a sense of freedom and exhilaration that cannot be matched by anything else. With every flap of my wings, I am reminded of the endless possibilities that exist in this world, and of the beauty that surrounds me. I am a bird, but I am also more than that. I am a symbol of freedom and adventure, of the power of nature and the limitless potential of the human spirit. I am the embodiment of everything that is wild and wondrous, and I will continue to fly, to explore, and to discover all that this world has to offer."
}

// PRODUCTION URL
const PRODUCTION = {
  SEND_FEEDBACK_URL: "https:///ase.sihanchen.com:8001/story-with-image-feedback",
  STORY_WITH_IMAGE_URL: "https://ase.sihanchen.com:8001/story-with-image",
  FAILED_IMAGE: "https://media.istockphoto.com/id/182278828/photo/failed-square-stamp.jpg?s=612x612&w=0&k=20&c=Qd54_jcau3xM1Qmn7wzwH9n-cJCn2VWjMw9KMHwr1qM="
}

const Content = () => {

  const location = useLocation();
  const {searchTerm, userEmail} = location.state;

  const [searchResult, setSearchResult] = useState({})
  const [loading, setLoading] = useState(true)
  const [storyFeedback, setStoryFeedback] = useState(-1)
  const [imageFeedback, setImageFeedback] = useState(-1)

  const getStoryWithImage = async() => {
    let res = await fetch(PRODUCTION.STORY_WITH_IMAGE_URL, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({reqPrompt: searchTerm, userEmail: userEmail})
      });

      let data = await res.json();
      console.log(data.imageUrl)
      if (data.success){
        setSearchResult(data.searchResult)
        setLoading(false);
      } else {
        toast.error("Search Failed")
        setImageUrl(PRODUCTION.FAILED_IMAGE)
      }
  }


  const sendFeedback = async () => {
    if (storyFeedback !== -1 && imageFeedback !== -1){
      const resultWithFeedback = {
        ...searchResult,
        StoryLike: storyFeedback ? true : false,
        ImageLike: imageFeedback ? true : false
      }
      let res = await fetch(PRODUCTION.SEND_FEEDBACK_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({resultWithFeedback: resultWithFeedback})
      })
      let data = await res.json();
      if (data.success){
        toast.success("Feedback submit succeeded")
      } else {
        toast.error("Feedback submit failed")
      }
      return
    } 
    toast.warn("Both story and image feedback are required");

  }


  useEffect(() => {
    getStoryWithImage()
  }, [])


  return (
    <>
      <ToastContainer />

      {searchTerm.length > 40 ? 
        <h1 className='search_term_short h1-custom'>{searchTerm.slice(0, 40)} ...  <span className='search_term_full'>{searchTerm}</span> </h1> 
      :<h1 className='h1-custom'>{searchTerm}</h1> }

      <div className={loading ? "loading" : "content"}>
        {loading ? 
        <>
          <CircleLoader size={120} color={"#36d7b7"} speedMultiplier={0.5}/> 
          <BeatLoader size={60} color={"#36d7b7"}speedMultiplier={0.5}/> 
        </>
        : 
        <>
          <div ><img src={searchResult.ImageUrl} alt={searchTerm} /><Feedback setLike={setImageFeedback}/></div>
          <div><p>{searchResult.Story} <br/><span className='chatgpt'>-- ChatGPT @ {searchResult.CreationDate}</span></p><Feedback setLike={setStoryFeedback} /></div>
        </>}
      </div>
      <div className="text-center mt-5">
        {loading ? null :<Button onClick={() => sendFeedback()}>Submit Feedback</Button>}
      </div>
    </>
  )
}

export default Content
