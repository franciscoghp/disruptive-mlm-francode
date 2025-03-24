/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { render, screen, within } from "@testing-library/react"
import "@testing-library/jest-dom"
import ResultadoTabla from "../components/ResultadoTabla"

describe("Componente ResultadoTabla", () => {
  const mockResultados = {
    capitalInicial: 1000,
    plazo: 6,
    tasaMensual: 2,
    tipoBeneficio: "simple",
    porcentajeFee: 2,
    montoFee: 120,
    totalBeneficios: 120,
    montoNetoFinal: 1000,
    tabla: [
      { mes: 1, capital: 1000, beneficio: 20, total: 1020 },
      { mes: 2, capital: 1000, beneficio: 20, total: 1040 },
      { mes: 3, capital: 1000, beneficio: 20, total: 1060 },
      { mes: 4, capital: 1000, beneficio: 20, total: 1080 },
      { mes: 5, capital: 1000, beneficio: 20, total: 1100 },
      { mes: 6, capital: 1000, beneficio: 20, total: 1120 },
    ],
  }

  test("No renderiza nada cuando no hay resultados", () => {
    render(<ResultadoTabla resultados={null} />)
    expect(screen.queryByText("Resultados de la Simulación")).not.toBeInTheDocument()
  })

  test("Renderiza correctamente con resultados proporcionados", () => {
    const { container } = render(<ResultadoTabla resultados={mockResultados} />)

    // Verificar título
    expect(screen.getByText("Resultados de la Simulación")).toBeInTheDocument()

    // Verificar encabezados
    expect(screen.getByText("Resumen")).toBeInTheDocument()
    expect(screen.getByText("Detalle Mensual")).toBeInTheDocument()

    // Verificar que los datos del resumen se renderizan correctamente
    // Buscar los párrafos específicos que contienen la información
    const resumenCard = container.querySelector(".card")

    // Verificar Capital Inicial
    const capitalInicialParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Capital Inicial:") &&
        element.textContent.includes("$1000.00")
      )
    })
    expect(capitalInicialParrafo).toBeInTheDocument()

    // Verificar Plazo
    const plazoParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Plazo:") &&
        element.textContent.includes("6 meses")
      )
    })
    expect(plazoParrafo).toBeInTheDocument()

    // Verificar Tasa Mensual
    const tasaParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Tasa Mensual:") &&
        element.textContent.includes("2%")
      )
    })
    expect(tasaParrafo).toBeInTheDocument()

    // Verificar Tipo de Beneficio
    const tipoParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Tipo de Beneficio:") &&
        element.textContent.includes("Simple")
      )
    })
    expect(tipoParrafo).toBeInTheDocument()

    // Verificar Fee Final
    const feeParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Fee Final:") &&
        element.textContent.includes("2%") &&
        element.textContent.includes("$120.00")
      )
    })
    expect(feeParrafo).toBeInTheDocument()

    // Verificar Total Beneficios
    const beneficiosParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Total Beneficios:") &&
        element.textContent.includes("$120.00")
      )
    })
    expect(beneficiosParrafo).toBeInTheDocument()

    // Verificar Monto Neto a Recibir
    const montoNetoParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Monto Neto a Recibir:") &&
        element.textContent.includes("$1000.00")
      )
    })
    expect(montoNetoParrafo).toBeInTheDocument()

    // Verificar que la tabla se renderiza correctamente
    expect(screen.getByText("Mes")).toBeInTheDocument()
    expect(screen.getByText("Capital")).toBeInTheDocument()
    expect(screen.getByText("Beneficio Mensual")).toBeInTheDocument()
    expect(screen.getByText("Total Acumulado")).toBeInTheDocument()

    // Verificar que se renderizan las filas de la tabla
    expect(screen.getAllByRole("row")).toHaveLength(7) // 6 filas de datos + 1 fila de encabezado

    // Verificar algunos valores específicos de la tabla
    const filas = screen.getAllByRole("row")
    expect(within(filas[1]).getByText("1")).toBeInTheDocument() // Primera fila, columna Mes
    expect(within(filas[6]).getByText("$1120.00")).toBeInTheDocument() // Última fila, columna Total Acumulado
  })

  test("Renderiza 'Interés Compuesto' si el tipo de beneficio es 'compuesto'", () => {
    const resultadosCompuesto = {
      ...mockResultados,
      tipoBeneficio: "compound",
    }

    const { container } = render(<ResultadoTabla resultados={resultadosCompuesto} />)

    const resumenCard = container.querySelector(".card")
    const tipoParrafo = within(resumenCard).getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "p" &&
        element.textContent.includes("Tipo de Beneficio:") &&
        element.textContent.includes("Interés Compuesto")
      )
    })
    expect(tipoParrafo).toBeInTheDocument()
  })
})

