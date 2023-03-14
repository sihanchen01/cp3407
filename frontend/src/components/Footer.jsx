import {AiFillGithub} from "react-icons/ai"

const Footer = () => {
  return (
    <>
    <footer>
      <div className="footer_container">
        <span>Powered by <a href="https://platform.openai.com/docs/introduction" target={"_blank"}>OpenAI</a></span>
        <a href="https://github.com/sihanchen01/cp3407" target={"_blank"}><span className="icon"><AiFillGithub size={35}/></span></a>
      </div>
    </footer>
    </>
  )
}

export default Footer;