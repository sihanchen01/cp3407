import {Button, Container} from "react-bootstrap"
import 'bootstrap/dist/js/bootstrap'
import { Link } from "react-router-dom"
import example_1 from "../assets/example_1.png"
import example_2 from "../assets/example_2.png"
import example_3 from "../assets/example_3.png"
import example_4 from "../assets/example_4.png"
import review1 from "../assets/review1.jpg"
import review2 from "../assets/review2.jpg"
import review3 from "../assets/review3.jpg"

const Home = () => {
  return (
    <>
      <header>
        <h1 className="h1-custom"> IDEA Generator: Unleash Your Creativity!</h1>
      </header>
      <section>
        <h2 className="h2-custom">Overcome writer's block with our AI-powerd generator</h2>
        <p className="my-font-custom"> that provides you with <span>captivating</span> stories and <span>stunning</span> images.</p>
        <Container className="text-center">
          <Link to="/about">
            <Button className="fw-bold mt-5 py-2">Learn More</Button>
          </Link>
        </Container>
      </section>
      <hr className="hr-custom" />
      <section>
        <h1 className="h1-custom">Examples</h1>
        <div className="gallery">
          <figure className="gallery__item--1">
            <img src={example_1} alt="example1" className="gallery__img"/>
          </figure>
          <figure className="gallery__item--2">
            <img src={example_2} alt="example2" className="gallery__img"/>
          </figure>
          <figure className="gallery__item--3">
            <img src={example_4} alt="example4" className="gallery__img"/>
          </figure>
          <figure className="gallery__item--4">
            <img src={example_3} alt="example3" className="gallery__img"/>
          </figure>
        </div>
      </section>
      <hr className="hr-custom"/>
      <section>
        <h1 className="h1-custom">Quotes</h1>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={review1} alt="" className="d-blcok w-50" style={{margin:"2rem 0"}}/>
            </div>
            <div className="carousel-item">
              <img src={review2} alt="" className="d-blcok w-50" style={{margin:"2rem 0"}}/>
            </div>
            <div className="carousel-item">
              <img src={review3} alt="" className="d-blcok w-50" style={{margin:"2rem 0"}}/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home