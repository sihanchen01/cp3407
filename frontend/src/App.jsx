import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Search from "./components/Search"
import About from "./components/About"
import Content from "./components/Content"
import Footer from "./components/Footer"
import {Routes, Route} from "react-router-dom"
import NotFound from "./components/NotFound"

function App() {

  return (
    <div className="App">
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/content" element={<Content />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </div>

  )
}

export default App
