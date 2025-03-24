import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import HelpPage from "../components/HelpPage"

describe("Componente HelpPage", () => {
  test("Renderiza correctamente", () => {
    render(<HelpPage />)

    expect(screen.getByText("Ayuda")).toBeInTheDocument()
    expect(screen.getByText("Bienvenido a la página de ayuda")).toBeInTheDocument()
    expect(screen.getByText(/Este proyecto es un simulador de comisiones/)).toBeInTheDocument()
  })

  test("Muestra las características", () => {
    render(<HelpPage />)

    expect(screen.getByText("Características:")).toBeInTheDocument()
    expect(screen.getByText("Interfaz simple y fácil de usar")).toBeInTheDocument()
    expect(screen.getByText("Cálculos rápidos y precisos")).toBeInTheDocument()
    expect(screen.getByText("Opciones personalizables")).toBeInTheDocument()
  })

  test("Muestra los pasos para empezar", () => {
    render(<HelpPage />)

    expect(screen.getByText("Cómo empezar:")).toBeInTheDocument()
    expect(screen.getByText("Clona este repositorio desde GitHub")).toBeInTheDocument()
    expect(screen.getByText(/Instala las dependencias/)).toBeInTheDocument()
    expect(screen.getByText(/Inicia la aplicación/)).toBeInTheDocument()
  })

  test("Muestra el enlace a GitHub", () => {
    render(<HelpPage />)

    const githubLink = screen.getByText("franciscoghp")

    expect(screen.getByText(/Si necesitas más información/)).toBeInTheDocument()
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute("href", "https://github.com/franciscoghp")
    expect(githubLink).toHaveAttribute("target", "_blank")
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")
  })

  test("Tiene las clases CSS correctas", () => {
    const { container } = render(<HelpPage />)

    expect(container.firstChild).toHaveClass("help-page")
    expect(container.querySelector(".help-content")).toBeInTheDocument()
    expect(screen.getByText("franciscoghp").closest("a")).toHaveClass("help-link")
  })
})

