import { useState } from 'react'
import {AiFillLike, AiFillDislike} from 'react-icons/ai'
import {GrLike, GrDislike} from 'react-icons/gr'

const Feedback = ({setLike}) => {
  const [likeActive, setLikeActive] = useState(false)
  const [dislikeActive, setDislikeActive] = useState(false)

  return (
    <>
    <button className={likeActive ? "feedback-button-like-active" : ""} onClick={() => {
      setLikeActive(true)
      setDislikeActive(false)
      setLike(1)
      }}>
        {likeActive ? <GrLike /> : <AiFillLike/>} 
    </button>
    <button className={dislikeActive ? "feedback-button-dislike-active" : ""} onClick={() => {
      setLikeActive(false)
      setDislikeActive(true)
      setLike(0)
      }}>
        {dislikeActive ? <GrDislike /> : <AiFillDislike/>} 
      </button>
    </>
  )
}

export default Feedback