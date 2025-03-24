"use client"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import Toast from "../components/Toast"

describe("Componente Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test("Renderiza correctamente con mensaje", () => {
    render(<Toast message="Mensaje de prueba" onClose={() => {}} />)

    expect(screen.getByText("Mensaje de prueba")).toBeInTheDocument()
    expect(screen.getByText("×")).toBeInTheDocument()
  })

  test("Aplica la clase correcta según el tipo", () => {
    const { container: containerError } = render(<Toast message="Error" type="error" onClose={() => {}} />)
    expect(containerError.firstChild).toHaveClass("toast-error")

    const { container: containerSuccess } = render(<Toast message="Éxito" type="success" onClose={() => {}} />)
    expect(containerSuccess.firstChild).toHaveClass("toast-success")

    const { container: containerWarning } = render(<Toast message="Advertencia" type="warning" onClose={() => {}} />)
    expect(containerWarning.firstChild).toHaveClass("toast-warning")
  })

  test("Llama a onClose cuando se hace clic en el botón de cerrar", () => {
    const onCloseMock = jest.fn()

    render(<Toast message="Mensaje de prueba" onClose={onCloseMock} />)

    const botonCerrar = screen.getByText("×")
    fireEvent.click(botonCerrar)

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test("Llama a onClose automáticamente después de la duración especificada", () => {
    const onCloseMock = jest.fn()

    render(<Toast message="Mensaje de prueba" onClose={onCloseMock} duration={2000} />)

    expect(onCloseMock).not.toHaveBeenCalled()

    // Avanzar el tiempo 2 segundos
    act(() => {
      jest.advanceTimersByTime(2000)
    })

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })

  test("Usa la duración por defecto de 5000ms si no se especifica", () => {
    const onCloseMock = jest.fn()

    render(<Toast message="Mensaje de prueba" onClose={onCloseMock} />)

    // Avanzar el tiempo 4999ms
    act(() => {
      jest.advanceTimersByTime(4999)
    })

    expect(onCloseMock).not.toHaveBeenCalled()

    // Avanzar 1ms más para llegar a 5000ms
    act(() => {
      jest.advanceTimersByTime(1)
    })

    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})

