import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <h1>Simulador de Comdasdasdasdaisiones</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

