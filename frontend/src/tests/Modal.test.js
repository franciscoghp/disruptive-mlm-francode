import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import Modal from "../components/Modal"

describe("Modal Component", () => {
  const mockOnClose = jest.fn()
  const mockTitle = "Test Modal Title"
  const mockChildren = <div>Test Modal Content</div>

  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks()

    // Restaurar el estilo del body
    document.body.style.overflow = ""
  })

  test("renderiza correctamente el modal con título y contenido", () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Verificar que el título esté presente
    expect(screen.getByText(mockTitle)).toBeInTheDocument()

    // Verificar que el contenido esté presente
    expect(screen.getByText("Test Modal Content")).toBeInTheDocument()

    // Verificar que el botón de cerrar esté presente
    expect(screen.getByText("×")).toBeInTheDocument()
    expect(screen.getByText("Cerrar")).toBeInTheDocument()
  })

  test("llama a onClose cuando se hace clic en el botón de cerrar", () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Hacer clic en el botón de cerrar (×)
    fireEvent.click(screen.getByText("×"))

    // Verificar que se llamó a onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('llama a onClose cuando se hace clic en el botón "Cerrar"', () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Hacer clic en el botón "Cerrar"
    fireEvent.click(screen.getByText("Cerrar"))

    // Verificar que se llamó a onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test("llama a onClose cuando se hace clic en el overlay", () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Hacer clic en el overlay (modal-overlay)
    fireEvent.click(screen.getByClassName("modal-overlay"))

    // Verificar que se llamó a onClose
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test("no llama a onClose cuando se hace clic en el contenido del modal", () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Hacer clic en el contenido del modal
    fireEvent.click(screen.getByText("Test Modal Content"))

    // Verificar que no se llamó a onClose
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  test("establece overflow: hidden en el body cuando se monta", () => {
    render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Verificar que se estableció overflow: hidden en el body
    expect(document.body.style.overflow).toBe("hidden")
  })

  test("restablece el overflow del body cuando se desmonta", () => {
    const { unmount } = render(
      <Modal title={mockTitle} onClose={mockOnClose}>
        {mockChildren}
      </Modal>,
    )

    // Verificar que se estableció overflow: hidden en el body
    expect(document.body.style.overflow).toBe("hidden")

    // Desmontar el componente
    unmount()

    // Verificar que se restableció el overflow del body
    expect(document.body.style.overflow).toBe("unset")
  })
})

