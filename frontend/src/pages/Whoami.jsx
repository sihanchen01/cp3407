import { useState, useEffect } from "react"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const TESTING = {
  WHOAMI_URL: "http://localhost:8001/whoami"
}

const PRODUCTION = {
  WHOAMI_URL: "https://ase.sihanchen.com:8001/whoami"
}


const Whoami = () => {
  const [hints, setHints] = useState([])
  const [loading, setLoading] = useState(true)
  const [userInput, setUserInput] = useState("")
  const [namelist, setNameList] = useState([])
  const [namesHint, setNamesHint] = useState([])
  const [noMatchingName, setNoMatchingName] = useState(true)
  const [answer, setAnswer] = useState("")
  const [score, setScore] = useState(0)

  const getHints = async() => {
    let res = await fetch(TESTING.WHOAMI_URL)
    let data = await res.json()
    if (data.success) {
      setLoading(false)
      setAnswer(data.answer)
      setNameList([...data.namelist])
      setHints([...data.hints])
    } else {
      toast.error("Hints retrieve failed!")
    }
  }


  const submitAnswer = () => {
    if (userInput.toLowerCase() == answer.toLowerCase()){
      toast.success("That is the correct answer!")
      setScore(prev => prev + 1)
    } else {
      toast.error(`Wrong answer, that is: ${answer}`)
    }
    setLoading(true)
    setUserInput(answer)
    getHints();
  }


  useEffect(()=>{
    if (userInput == ""){
      setNoMatchingName(true)
      return
    }
    const namesFiltered = namelist.filter(name => name.toLowerCase().includes(userInput.toLowerCase()))
    namesFiltered.length > 0 ? setNoMatchingName(false) : setNoMatchingName(true)
    setNamesHint(namesFiltered)
  }, [userInput])

  useEffect(()=> {
    getHints()
  }, [])

  return (
    <>
      <ToastContainer />
    <div className="container" >
      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column text-center">
          <h1 className="h1-custom-2 mx-5">Who Am I?</h1>
          <h3> Score: {score}</h3>
        </div>
          <iframe src="https://giphy.com/embed/xT5LMx8L9rZtLGgCL6" width="176" height="132"  className="mb-5" allowFullScreen></iframe>
      </div>
        <div className="row justify-content-around gap-4">
          { loading ?
          <div className="spinner-border mt-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          :
            hints.map((h, i) => (
            <div className="card col-sm-12 col-md-5 col-lg-3" key={i}>
              <div className="card-body px-2">
                <h4 className="card-title">Hint {i + 1}</h4>
                <p className="card-text">
                  {h}
                </p>
              </div>
            </div>
            ))
          }
      </div>
      <form className="mt-4 w-50 mx-auto">
        <label htmlFor="whoami-userinput" className="form-label my-2">Answer (cap insensitive)</label>
        <input type="text" id="whoami-userinput" className="form-control my-2" placeholder="eg., elon musk" value={userInput} onChange={e => setUserInput(e.target.value)}/>
      </form>
        <button type="submit" className="btn btn-primary my-2" style={{float:"right"}} onClick={() => submitAnswer()}>Submit</button>
      <div className="mt-5">
        {
          noMatchingName ?  <p className="font-bold text-center"><i> No matching name ...  </i> </p>
          :
          namesHint.map((n, i) => <button className="btn btn-secondary m-2" onClick={()=>setUserInput(n)} key={i}>{n}</button>)
        }
      </div>
    </div>
    </>
  )
}

export default Whoami