"use client"
import { useState } from "react"
import axios from "axios"
import { CSVLink } from "react-csv"
import QRCode from "qrcode.react"
import ResultadoTabla from "./ResultadoTabla"
import Modal from "./Modal"
import Toast from "./Toast"

// Cambia esta línea para apuntar a tu backend en producción
const API_URL = "http://localhost:5000/api"

const Simulador = () => {
  const [formData, setFormData] = useState({
    capital: "",
    plazo: "3",
    tipoBeneficio: "simple",
  })

  const [resultados, setResultados] = useState(null)
  const [toasts, setToasts] = useState([])
  const [showQR, setShowQR] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const [showPaymentStatus, setShowPaymentStatus] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingDeposit, setLoadingDeposit] = useState(false)
  const [loadingVerify, setLoadingVerify] = useState(false)

  const { capital, plazo, tipoBeneficio } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const addToast = (message, type = "error") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const simularInversion = async (e) => {
    e.preventDefault()

    if (!capital || isNaN(capital) || Number.parseFloat(capital) <= 0) {
      addToast("Por favor ingrese un monto válido")
      return
    }

    setLoading(true)

    try {
      const res = await axios.post(`${API_URL}/simular`, {
        capital: Number.parseFloat(capital),
        plazo: Number.parseInt(plazo),
        tipoBeneficio,
      })

      setResultados(res.data)
      setLoading(false)
    } catch (err) {
      addToast("Error al simular la inversión")
      setLoading(false)
      console.error(err)
    }
  }

  const crearPago = async () => {
    if (!resultados) {
      addToast("Debe simular primero")
      return
    }

    setLoadingDeposit(true)

    try {
      const res = await axios.post(`${API_URL}/crear-pago`, {
        fundsGoal: Number.parseFloat(capital),
      })

      setPaymentData(res.data.data)
      setShowQR(true)
      setLoadingDeposit(false)
    } catch (err) {
      addToast("Error al crear el pago")
      setLoadingDeposit(false)
      console.error(err)
    }
  }

  const verificarPago = async () => {
    if (!paymentData) {
      addToast("Debe crear un pago primero")
      return
    }

    setLoadingVerify(true)

    try {
      const res = await axios.get(`${API_URL}/verificar-pago/${paymentData.address}`)

      setPaymentStatus(res.data.data)
      setShowPaymentStatus(true)
      setLoadingVerify(false)
    } catch (err) {
      addToast("Error al verificar el pago")
      setLoadingVerify(false)
      console.error(err)
    }
  }

  const resetSimulador = () => {
    setFormData({
      capital: "",
      plazo: "3",
      tipoBeneficio: "simple",
    })
    setResultados(null)
    setShowQR(false)
    setPaymentData(null)
    setShowPaymentStatus(false)
    setPaymentStatus(null)
  }

  const getCSVData = () => {
    if (!resultados) return []

    const headers = [
      { label: "Mes", key: "mes" },
      { label: "Capital", key: "capital" },
      { label: "Beneficio", key: "beneficio" },
      { label: "Total", key: "total" },
    ]

    const data = resultados.tabla.map((row) => ({
      mes: row.mes,
      capital: row.capital.toFixed(2),
      beneficio: row.beneficio.toFixed(2),
      total: row.total.toFixed(2),
    }))

    return { headers, data }
  }

  const closeModal = () => {
    setShowQR(false)
    setShowPaymentStatus(false)
  }

  return (
    <div className="container">
      <h2>Simulador de Comisiones</h2>

      <form onSubmit={simularInversion}>
        <div className="form-group">
          <label htmlFor="capital">Capital Semilla (USD)</label>
          <input
            type="number"
            className="form-control"
            id="capital"
            name="capital"
            value={capital}
            onChange={onChange}
            placeholder="Ingrese el monto de capital"
            min="1"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="plazo">Plazo de Inversión</label>
          <select className="form-control" id="plazo" name="plazo" value={plazo} onChange={onChange}>
            <option value="3">3 meses (1% mensual)</option>
            <option value="6">6 meses (2% mensual)</option>
            <option value="9">9 meses (3% mensual)</option>
            <option value="12">12 meses (4% mensual)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tipo de Beneficio</label>
          <div>
            <input
              type="radio"
              id="simple"
              name="tipoBeneficio"
              value="simple"
              checked={tipoBeneficio === "simple"}
              onChange={onChange}
            />
            <label htmlFor="simple" style={{ display: "inline", marginLeft: "5px", marginRight: "15px" }}>
              Beneficio Simple
            </label>

            <input
              type="radio"
              id="compuesto"
              name="tipoBeneficio"
              value="compuesto"
              checked={tipoBeneficio === "compuesto"}
              onChange={onChange}
            />
            <label htmlFor="compuesto" style={{ display: "inline", marginLeft: "5px" }}>
              Beneficio Interés Compuesto
            </label>
          </div>
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Calculando..." : "SIMULAR"}
        </button>
      </form>

      {resultados && (
        <>
          <ResultadoTabla resultados={resultados} />

          <div className="button-group" style={{ marginTop: "2rem" }}>
            <CSVLink
              data={getCSVData().data}
              headers={getCSVData().headers}
              filename={`simulacion-inversion-${new Date().toISOString()}.csv`}
              className="btn btn-accent"
              target="_blank"
            >
              Exportar CSV
            </CSVLink>

            <button onClick={crearPago} className="btn btn-success" disabled={loadingDeposit}>
              {loadingDeposit ? "Procesando..." : "DEPOSITAR AHORA"}
            </button>

            {paymentData && (
              <button onClick={verificarPago} className="btn" disabled={loadingVerify}>
                {loadingVerify ? "Verificando..." : "REVISAR PAGO"}
              </button>
            )}

            <button onClick={resetSimulador} className="btn btn-danger">
              RESET/NEW
            </button>
          </div>
        </>
      )}

      {showQR && paymentData && (
        <Modal title="Pago con Criptomoneda" onClose={closeModal}>
          <div className="qr-container">
            <QRCode value={paymentData.address} size={200} className="qr-code" />
            <p>Escanee el código QR o copie la dirección para realizar el pago:</p>
            <div className="qr-address">{paymentData.address}</div>
            <p>
              <strong>Monto a pagar:</strong> ${paymentData.fundsGoal} USD
            </p>
            <p>
              <strong>Red:</strong> {paymentData.network}
            </p>
          </div>
        </Modal>
      )}

      {showPaymentStatus && paymentStatus && (
        <Modal title="Estado del Pago" onClose={closeModal}>
          <div>
            <p>
              <strong>Dirección:</strong> {paymentStatus.address}
            </p>
            <p>
              <strong>Monto capturado:</strong> {paymentStatus.amountCaptured} {paymentStatus.smartContractSymbol}
            </p>
            <p>
              <strong>Estado:</strong> {paymentStatus.status}
            </p>
            <p>
              <strong>Estado de fondos:</strong> {paymentStatus.fundStatus}
            </p>
            <p>
              <strong>Paso del proceso:</strong> {paymentStatus.processStep} de {paymentStatus.processTotalSteps}
            </p>

            {paymentStatus.amountCaptured > 0 && (
              <div className="alert alert-success">¡El pago ha sido recibido! Gracias por su inversión.</div>
            )}
          </div>
        </Modal>
      )}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </div>
  )
}

export default Simulador

