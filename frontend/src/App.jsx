import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Search from "./pages/Search"
import Whoami from "./pages/Whoami"
import History from "./pages/History"
import About from "./pages/About"
import Content from "./pages/Content"
import Profile from "./pages/Profile"
import Footer from "./components/Footer"
import {Routes, Route} from "react-router-dom"
import NotFound from "./components/NotFound"
import HistoryDetail from "./pages/HistoryDetail"

function App() {

  return (
    <div className="App">
      <Navbar />
      <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/whoami" element={<Whoami />} />
        <Route path="/about" element={<About />} />
        <Route path="/content" element={<Content />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/historyDetail" element={<HistoryDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer />
    </div>

  )
}

export default App
