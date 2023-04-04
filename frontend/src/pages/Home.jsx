import {Button, Col, Container, Row} from "react-bootstrap"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <h1 className="h1-custom">Get inspired for your next BIG IDEA!</h1>
      <Container className="text-center">
        <Link to="/about">
          <Button className="fw-bold mt-5 py-2">Learn More</Button>
        </Link>
      </Container>
    </>
  )
}

export default Home