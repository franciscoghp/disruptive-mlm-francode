import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import Navbar from "../components/Navbar"

// Mock para react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, to, className }) => (
    <a href={to} className={className} data-testid={`link-${to}-${className?.replace(/\s+/g, "-") || "default"}`}>
      {children}
    </a>
  ),
}))

// Mock para el componente HelpPage
jest.mock("../components/HelpPage", () => () => <div>Help Page Content</div>)

describe("Navbar Component", () => {
  beforeEach(() => {
    // Limpiar cualquier mock antes de cada prueba
    jest.clearAllMocks()

    // Configurar mock para window.scrollY
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    })
  })

  test("renderiza correctamente el navbar con logo y enlaces", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    )

    // Verificar que el logo esté presente
    expect(screen.getByText("Simulador de Comisiones")).toBeInTheDocument()

    // Verificar que los enlaces estén presentes
    expect(screen.getByText("Inicio")).toBeInTheDocument()
    expect(screen.getByText("Ayuda")).toBeInTheDocument()

    // Verificar que los enlaces tengan las URLs correctas
    // Usamos getAllByTestId y verificamos el primero que corresponde al logo
    expect(screen.getByTestId("link-/-navbar-logo")).toHaveAttribute("href", "/")
    // Verificamos el enlace de Inicio
    expect(screen.getByTestId("link-/-navbar-link")).toHaveAttribute("href", "/")
    // Verificamos el enlace de Ayuda
    expect(screen.getByTestId("link-/ayuda-navbar-link")).toHaveAttribute("href", "/ayuda")
  })

  test("aplica la clase navbar-scrolled cuando se hace scroll", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    )

    // Inicialmente no debe tener la clase navbar-scrolled
    const navbar = screen.getByRole("navigation")
    expect(navbar).toHaveClass("navbar")
    expect(navbar).not.toHaveClass("navbar-scrolled")

    // Simular scroll
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 100,
    })

    // Disparar evento de scroll
    fireEvent.scroll(window)

    // Ahora debe tener la clase navbar-scrolled
    expect(navbar).toHaveClass("navbar")
    expect(navbar).toHaveClass("navbar-scrolled")
  })

  test("elimina el event listener al desmontar el componente", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener")

    const { unmount } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    )

    // Desmontar el componente
    unmount()

    // Verificar que se llamó a removeEventListener
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function))

    // Limpiar el spy
    removeEventListenerSpy.mockRestore()
  })
})

