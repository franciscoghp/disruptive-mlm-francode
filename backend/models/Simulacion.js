const mongoose = require("mongoose")

const SimulacionSchema = new mongoose.Schema({
  capitalInicial: {
    type: Number,
    required: true,
  },
  plazo: {
    type: Number,
    required: true,
  },
  tasaMensual: {
    type: Number,
    required: true,
  },
  tipoBeneficio: {
    type: String,
    required: true,
    enum: ["simple", "compuesto"],
  },
  porcentajeFee: {
    type: Number,
    required: true,
  },
  totalBeneficios: {
    type: Number,
    required: true,
  },
  montoFinal: {
    type: Number,
    required: true,
  },
  montoFee: {
    type: Number,
    required: true,
  },
  montoNetoFinal: {
    type: Number,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Simulacion", SimulacionSchema)

