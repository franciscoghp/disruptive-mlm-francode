const ResultadoTabla = ({ resultados }) => {
  if (!resultados) return null

  return (
    <div className="results-container">
      <h3>Resultados de la Simulación</h3>

      <div className="summary-cards">
        <div className="card">
          <h4>Resumen</h4>
          <p>
            <strong>Capital Inicial:</strong> ${resultados.capitalInicial.toFixed(2)}
          </p>
          <p>
            <strong>Plazo:</strong> {resultados.plazo} meses
          </p>
          <p>
            <strong>Tasa Mensual:</strong> {resultados.tasaMensual}%
          </p>
          <p>
            <strong>Tipo de Beneficio:</strong> {resultados.tipoBeneficio === "simple" ? "Simple" : "Interés Compuesto"}
          </p>
          <p>
            <strong>Fee Final:</strong> {resultados.porcentajeFee}% (${resultados.montoFee.toFixed(2)})
          </p>
          <p>
            <strong>Total Beneficios:</strong> ${resultados.totalBeneficios.toFixed(2)}
          </p>
          <p className="total-amount">
            <strong>Monto Neto a Recibir:</strong> ${resultados.montoNetoFinal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="table-container">
        <h4>Detalle Mensual</h4>
        <table>
          <thead>
            <tr>
              <th>Mes</th>
              <th>Capital</th>
              <th>Beneficio Mensual</th>
              <th>Total Acumulado</th>
            </tr>
          </thead>
          <tbody>
            {resultados.tabla.map((fila, index) => (
              <tr key={index}>
                <td>{fila.mes}</td>
                <td>${fila.capital.toFixed(2)}</td>
                <td>${fila.beneficio.toFixed(2)}</td>
                <td>${fila.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultadoTabla

