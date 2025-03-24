import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Footer from "../components/Footer"

describe("Componente Footer", () => {
  test("Renderiza correctamente", () => {
    render(<Footer />)

    // Verificar que se muestra el año actual
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`${currentYear} Simulador de Comisiones`))).toBeInTheDocument()

    // Verificar que se muestran los enlaces
    expect(screen.getByText("Términos y Condiciones")).toBeInTheDocument()
    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument()
    expect(screen.getByText("Contacto")).toBeInTheDocument()
  })

  test("Muestra la información de contacto", () => {
    render(<Footer />)

    expect(screen.getByText("Contáctame:")).toBeInTheDocument()
    expect(screen.getByText(/WhatsApp:/)).toBeInTheDocument()
    expect(screen.getByText("+584141452293")).toBeInTheDocument()
    expect(screen.getByText(/Email:/)).toBeInTheDocument()
    expect(screen.getByText("francisco9mil@gmail.com")).toBeInTheDocument()
  })

  test("Muestra el mensaje de desarrollador", () => {
    render(<Footer />)

    expect(screen.getByText(/Develop with ❤️ by/)).toBeInTheDocument()
    expect(screen.getByText("franciscoghp")).toBeInTheDocument()
  })

  test("Los enlaces tienen los atributos correctos", () => {
    render(<Footer />)

    const terminosLink = screen.getByText("Términos y Condiciones")
    const privacidadLink = screen.getByText("Política de Privacidad")
    const contactoLink = screen.getByText("Contacto")
    const githubLink = screen.getByText("franciscoghp")
    const whatsappLink = screen.getByText("+584141452293")
    const emailLink = screen.getByText("francisco9mil@gmail.com")

    expect(terminosLink).toHaveAttribute("href", "/")
    expect(privacidadLink).toHaveAttribute("href", "/")
    expect(contactoLink).toHaveAttribute("href", "/")
    expect(githubLink).toHaveAttribute("href", "https://github.com/franciscoghp")
    expect(githubLink).toHaveAttribute("target", "_blank")
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer")
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/584141452293")
    expect(whatsappLink).toHaveAttribute("target", "_blank")
    expect(whatsappLink).toHaveAttribute("rel", "noopener noreferrer")
    expect(emailLink).toHaveAttribute("href", "francisco9mil@gmail.com")
    expect(emailLink).toHaveAttribute("target", "_blank")
    expect(emailLink).toHaveAttribute("rel", "noopener noreferrer")
  })

  test("Tiene las clases CSS correctas", () => {
    const { container } = render(<Footer />)

    expect(container.firstChild).toHaveClass("footer")
    expect(container.querySelector(".footer-container")).toBeInTheDocument()
    expect(container.querySelector(".footer-links")).toBeInTheDocument()
    expect(container.querySelector(".footer-message")).toBeInTheDocument()
    expect(container.querySelector(".contact-info")).toBeInTheDocument()
  })
})

