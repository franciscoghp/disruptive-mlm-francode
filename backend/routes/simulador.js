const express = require("express")
const { simularInversion, crearPago, verificarPago } = require("../controllers/simuladorController")

const router = express.Router()

// Ruta para simular inversión
router.post("/simular", simularInversion)

// Ruta para crear pago
router.post("/crear-pago", crearPago)

// Ruta para verificar pago
router.get("/verificar-pago/:address", verificarPago)

module.exports = router

