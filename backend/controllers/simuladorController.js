const axios = require("axios")
const Simulacion = require("../models/Simulacion")

// API para pagos con criptomonedas
const API_URL = "https://my.disruptivepayments.io/api"
const API_KEY = "o0z8y85rjdx28iqef32f4mrl6e56b71742437588342"

// Controller para simular inversión
exports.simularInversion = async (req, res) => {
  try {
    const { capital, plazo, tipoBeneficio } = req.body

    // Validar datos de entrada
    if (!capital || capital <= 0) {
      return res.status(400).json({ msg: "Por favor ingrese un capital válido" })
    }

    if (![3, 6, 9, 12].includes(plazo)) {
      return res.status(400).json({ msg: "Plazo no válido. Debe ser 3, 6, 9 o 12 meses" })
    }

    if (!["simple", "compuesto"].includes(tipoBeneficio)) {
      return res.status(400).json({ msg: "Tipo de beneficio no válido" })
    }

    // Determinar tasa mensual según plazo
    let tasaMensual
    switch (plazo) {
      case 3:
        tasaMensual = 1
        break
      case 6:
        tasaMensual = 2
        break
      case 9:
        tasaMensual = 3
        break
      case 12:
        tasaMensual = 4
        break
      default:
        tasaMensual = 1
    }

    // Calcular fee según monto
    let porcentajeFee
    if (capital <= 1000) {
      porcentajeFee = 2
    } else if (capital <= 10000) {
      porcentajeFee = 1
    } else if (capital <= 35000) {
      porcentajeFee = 0.5
    } else {
      porcentajeFee = 0.25
    }

    // Inicializar variables
    let capitalActual = capital
    let totalBeneficios = 0

    // Generar tabla de resultados
    const tabla = []

    for (let mes = 1; mes <= plazo; mes++) {
      const beneficioMensual = (capitalActual * tasaMensual) / 100
      totalBeneficios += beneficioMensual

      tabla.push({
        mes,
        capital: capitalActual,
        beneficio: beneficioMensual,
        total: capitalActual + totalBeneficios,
      })

      // Si es interés compuesto, añadir el beneficio al capital
      if (tipoBeneficio === "compuesto") {
        capitalActual += beneficioMensual
        totalBeneficios = 0 // Reiniciar porque ya está incluido en el capital
      }
    }

    // Cálculo final
    const montoFinal = capital + totalBeneficios
    const montoFee = (montoFinal * porcentajeFee) / 100
    const montoNetoFinal = montoFinal - montoFee

    // Guardar simulación en BD
    const nuevaSimulacion = new Simulacion({
      capitalInicial: capital,
      plazo,
      tasaMensual,
      tipoBeneficio,
      porcentajeFee,
      totalBeneficios,
      montoFinal,
      montoFee,
      montoNetoFinal,
    })

    await nuevaSimulacion.save()

    // Responder con los resultados
    return res.json({
      capitalInicial: capital,
      plazo,
      tasaMensual,
      tipoBeneficio,
      porcentajeFee,
      totalBeneficios,
      montoFinal,
      montoFee,
      montoNetoFinal,
      tabla,
    })
  } catch (error) {
    console.error("Error en simulación:", error)
    return res.status(500).json({ msg: "Error en el servidor" })
  }
}

// Controller para crear pago
exports.crearPago = async (req, res) => {
  try {
    const { fundsGoal } = req.body

    if (!fundsGoal || fundsGoal <= 0) {
      return res.status(400).json({ msg: "Monto inválido" })
    }

    const response = await axios.post(
      `${API_URL}/payments/single`,
      {
        network: "BSC",
        fundsGoal,
      },
      {
        headers: {
          "content-type": "application/json",
          "client-api-key": API_KEY,
        },
      },
    )

    return res.json(response.data)
  } catch (error) {
    console.error("Error al crear pago:", error)
    return res.status(500).json({ msg: "Error al crear el pago" })
  }
}

// Controller para verificar estado de pago
exports.verificarPago = async (req, res) => {
  try {
    const { address } = req.params

    if (!address) {
      return res.status(400).json({ msg: "Dirección no proporcionada" })
    }

    const response = await axios.get(`${API_URL}/payments/status?network=BSC&address=${address}`, {
      headers: {
        "content-type": "application/json",
        "client-api-key": API_KEY,
      },
    })

    return res.json(response.data)
  } catch (error) {
    console.error("Error al verificar pago:", error)
    return res.status(500).json({ msg: "Error al verificar el pago" })
  }
}

