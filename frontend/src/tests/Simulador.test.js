"use client"

import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Simulador from "../components/Simulador"

// Mock completo de axios
jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
}))

// Mock para react-csv
jest.mock("react-csv", () => ({
  CSVLink: ({ children }) => <button data-testid="csv-button">{children}</button>,
}))

// Mock para qrcode.react
jest.mock("qrcode.react", () => ({
  __esModule: true,
  default: () => <div data-testid="qr-code">QR Code</div>,
}))

// Mock para ResultadoTabla
jest.mock("../components/ResultadoTabla", () => ({
  __esModule: true,
  default: ({ resultados }) => <div data-testid="resultado-tabla">Tabla de resultados</div>,
}))

// Mock para Modal
jest.mock("../components/Modal", () => ({
  __esModule: true,
  default: ({ children, onClose }) => (
    <div data-testid="modal">
      {children}
      <button onClick={onClose}>Cerrar</button>
    </div>
  ),
}))

// Mock para Toast
jest.mock("../components/Toast", () => ({
  __esModule: true,
  default: ({ message }) => <div data-testid="toast">{message}</div>,
}))

// Prueba básica para verificar que el componente se renderiza
describe("Componente Simulador", () => {
  test("Renderiza correctamente", () => {
    render(<Simulador />)

    // Verificar elementos básicos
    expect(screen.getByText("Simulador de Comisiones")).toBeInTheDocument()
    expect(screen.getByLabelText(/Capital Semilla/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Plazo de Inversión/i)).toBeInTheDocument()
    expect(screen.getByText(/Beneficio Simple/i)).toBeInTheDocument()
    expect(screen.getByText(/Beneficio Interés Compuesto/i)).toBeInTheDocument()
    expect(screen.getByText("SIMULAR")).toBeInTheDocument()
  })
})

