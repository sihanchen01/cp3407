import {AiFillGithub} from "react-icons/ai"

const Footer = () => {
  return (
    <>
    <footer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 70 1440 210"><path fill="#213547" fillOpacity="1" d="M0,224L60,202.7C120,181,240,139,360,117.3C480,96,600,96,720,112C840,128,960,160,1080,160C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
      <div className="footer_container">
        <span className="footer-text">Powered by <a href="https://platform.openai.com/docs/introduction" target={"_blank"}>OpenAI</a></span>
        <a href="https://github.com/sihanchen01/cp3407" target={"_blank"}><span className="icon"><AiFillGithub size={35}/></span></a>
      </div>
    </footer>
    </>
  )
}

export default Footer;