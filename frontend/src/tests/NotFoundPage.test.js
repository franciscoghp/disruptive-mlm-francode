import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import NotFoundPage from "../components/NotFoundPage"

describe("Componente NotFoundPage", () => {
  test("Renderiza correctamente", () => {
    render(<NotFoundPage />)

    expect(screen.getByText("404 - Página no encontrada")).toBeInTheDocument()
    expect(screen.getByText("Lo sentimos, la página que estás buscando no existe.")).toBeInTheDocument()
    expect(screen.getByText("Volver al inicio")).toBeInTheDocument()
  })

  test("El enlace tiene la ruta correcta", () => {
    render(<NotFoundPage />)

    const enlace = screen.getByText("Volver al inicio")

    expect(enlace).toHaveAttribute("href", "/")
    expect(enlace).toHaveClass("not-found-link")
  })

  test("Tiene las clases CSS correctas", () => {
    const { container } = render(<NotFoundPage />)

    expect(container.firstChild).toHaveClass("not-found-page")
  })
})

