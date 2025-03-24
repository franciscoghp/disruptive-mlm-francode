import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Simulador from "./components/Simulador";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import HelpPage from "./components/HelpPage";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Simulador />} />
            <Route path="/ayuda" element={<HelpPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;