import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ResultadoTabla from "../components/ResultadoTabla"; // Asegúrate de que la ruta sea correcta

describe("Componente ResultadoTabla", () => {
  const resultados = {
    capitalInicial: 1000,
    plazo: 12,
    tasaMensual: 5,
    tipoBeneficio: "simple",
    porcentajeFee: 10,
    montoFee: 100,
    totalBeneficios: 600,
    montoNetoFinal: 1500,
    tabla: [
      { mes: 1, capital: 1000, beneficio: 50, total: 1050 },
      { mes: 2, capital: 1050, beneficio: 52.5, total: 1102.5 },
      { mes: 3, capital: 1102.5, beneficio: 55.13, total: 1157.63 },
    ],
  };

  test("No renderiza nada si resultados es null", () => {
    const { container } = render(<ResultadoTabla resultados={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  test("Renderiza correctamente con resultados proporcionados", () => {
    render(<ResultadoTabla resultados={resultados} />);

    // Verificar que el título se renderiza correctamente
    expect(screen.getByText("Resultados de la Simulación")).toBeInTheDocument();

    // Verificar que los datos del resumen se renderizan correctamente
    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Capital Inicial: $${resultados.capitalInicial.toFixed(2)}`)
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Plazo: ${resultados.plazo} meses`)
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Tasa Mensual: ${resultados.tasaMensual}%`)
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes("Tipo de Beneficio: Simple")
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Fee Final: ${resultados.porcentajeFee}% ($${resultados.montoFee.toFixed(2)})`)
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Total Beneficios: $${resultados.totalBeneficios.toFixed(2)}`)
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes(`Monto Neto a Recibir: $${resultados.montoNetoFinal.toFixed(2)}`)
        );
      })
    ).toBeInTheDocument();

    // Verificar que la tabla se renderiza correctamente
    expect(screen.getByText("Detalle Mensual")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();

    // Verificar que las filas de la tabla se renderizan correctamente
    resultados.tabla.forEach((fila) => {
      expect(screen.getByText(fila.mes.toString())).toBeInTheDocument();
      expect(screen.getByText(`$${fila.capital.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`$${fila.beneficio.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`$${fila.total.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  test("Renderiza 'Interés Compuesto' si el tipo de beneficio es 'compuesto'", () => {
    const resultadosCompuesto = { ...resultados, tipoBeneficio: "compuesto" };
    render(<ResultadoTabla resultados={resultadosCompuesto} />);

    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === "p" &&
          content.includes("Tipo de Beneficio: Interés Compuesto")
        );
      })
    ).toBeInTheDocument();
  });
});