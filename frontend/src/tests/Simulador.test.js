import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import axios from "axios"
import Simulador from "../components/Simulador"

// Mock axios
jest.mock("axios")

// Mock react-csv
jest.mock("react-csv", () => ({
  CSVLink: ({ children }) => <button>{children}</button>,
}))

// Mock qrcode.react
jest.mock("qrcode.react", () => ({
  __esModule: true,
  default: () => <div data-testid="qr-code">QR Code</div>,
}))

describe("Componente Simulador", () => {
  beforeEach(() => {
    axios.post.mockClear()
    axios.get.mockClear()
  })

  test("Renderiza correctamente", () => {
    render(<Simulador />)

    expect(screen.getByText("Simulador de Comisiones")).toBeInTheDocument()
    expect(screen.getByLabelText(/Capital Semilla/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Plazo de Inversión/i)).toBeInTheDocument()
    expect(screen.getByText(/Beneficio Simple/i)).toBeInTheDocument()
    expect(screen.getByText(/Beneficio Interés Compuesto/i)).toBeInTheDocument()
    expect(screen.getByText("SIMULAR")).toBeInTheDocument()
  })

  test("Muestra error cuando no se ingresa capital", async () => {
    render(<Simulador />)

    const botonSimular = screen.getByText("SIMULAR")
    fireEvent.click(botonSimular)

    expect(screen.getByText(/Por favor ingrese un monto válido/i)).toBeInTheDocument()
  })

  test("Simula inversión con éxito", async () => {
    // Mock de la respuesta de axios
    axios.post.mockResolvedValueOnce({
      data: {
        capitalInicial: 1000,
        plazo: 3,
        tasaMensual: 1,
        tipoBeneficio: "simple",
        porcentajeFee: 2,
        totalBeneficios: 30,
        montoFinal: 1030,
        montoFee: 20.6,
        montoNetoFinal: 1009.4,
        tabla: [
          { mes: 1, capital: 1000, beneficio: 10, total: 1010 },
          { mes: 2, capital: 1000, beneficio: 10, total: 1020 },
          { mes: 3, capital: 1000, beneficio: 10, total: 1030 },
        ],
      },
    })

    render(<Simulador />)

    // Completar formulario
    const inputCapital = screen.getByLabelText(/Capital Semilla/i)
    fireEvent.change(inputCapital, { target: { value: "1000" } })

    const selectPlazo = screen.getByLabelText(/Plazo de Inversión/i)
    fireEvent.change(selectPlazo, { target: { value: "3" } })

    const radioBeneficioSimple = screen.getByLabelText(/Beneficio Simple/i)
    fireEvent.click(radioBeneficioSimple)

    // Simular
    const botonSimular = screen.getByText("SIMULAR")
    fireEvent.click(botonSimular)

    // Esperar a que se muestre la tabla de resultados
    await waitFor(() => {
      expect(screen.getByText(/Resultados de la Simulación/i)).toBeInTheDocument()
      expect(screen.getByText(/Capital Inicial:/i)).toBeInTheDocument()
      expect(screen.getByText(/Monto Neto a Recibir:/i)).toBeInTheDocument()
      expect(screen.getByText("Exportar CSV")).toBeInTheDocument()
      expect(screen.getByText("DEPOSITAR AHORA")).toBeInTheDocument()
    })

    // Verificar que se llamó a axios.post con los parámetros correctos
    expect(axios.post).toHaveBeenCalledWith("http://localhost:5000/api/simular", {
      capital: 1000,
      plazo: 3,
      tipoBeneficio: "simple",
    })
  })

  test("Crea QR de pago", async () => {
    // Mock para simulación exitosa
    axios.post.mockResolvedValueOnce({
      data: {
        capitalInicial: 1000,
        plazo: 3,
        tasaMensual: 1,
        tipoBeneficio: "simple",
        porcentajeFee: 2,
        totalBeneficios: 30,
        montoFinal: 1030,
        montoFee: 20.6,
        montoNetoFinal: 1009.4,
        tabla: [
          { mes: 1, capital: 1000, beneficio: 10, total: 1010 },
          { mes: 2, capital: 1000, beneficio: 10, total: 1020 },
          { mes: 3, capital: 1000, beneficio: 10, total: 1030 },
        ],
      },
    })

    // Mock para creación de pago exitosa
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          address: "0xF0aa1D166d26f18E0EDdB06E4cfCfc13B705B655",
          network: "BSC",
          fundsGoal: 1000,
          smartContractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
        },
      },
    })

    render(<Simulador />)

    // Completar formulario y simular
    const inputCapital = screen.getByLabelText(/Capital Semilla/i)
    fireEvent.change(inputCapital, { target: { value: "1000" } })

    const botonSimular = screen.getByText("SIMULAR")
    fireEvent.click(botonSimular)

    // Esperar a que se muestren los resultados
    await waitFor(() => {
      expect(screen.getByText("DEPOSITAR AHORA")).toBeInTheDocument()
    })

    // Hacer clic en DEPOSITAR AHORA
    const botonDepositar = screen.getByText("DEPOSITAR AHORA")
    fireEvent.click(botonDepositar)

    // Esperar a que se muestre el QR
    await waitFor(() => {
      expect(screen.getByText(/Pago con Criptomoneda/i)).toBeInTheDocument()
      expect(screen.getByTestId("qr-code")).toBeInTheDocument()
    })

    // Verificar que se llamó a axios.post con los parámetros correctos
    expect(axios.post).toHaveBeenNthCalledWith(2, "http://localhost:5000/api/crear-pago", { fundsGoal: 1000 })
  })
})

