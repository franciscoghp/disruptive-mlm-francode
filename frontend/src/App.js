import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Simulador from "./components/Simulador"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Simulador />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

