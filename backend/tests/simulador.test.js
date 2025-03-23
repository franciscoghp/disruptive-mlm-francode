const request = require("supertest")
const mongoose = require("mongoose")
const express = require("express")
const simuladorRoutes = require("../routes/simulador")

// Crear app de express para testing
const app = express()
app.use(express.json())
app.use("/api", simuladorRoutes)

// Mock para axios
jest.mock("axios", () => ({
  post: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          address: "0xF0aa1D166d26f18E0EDdB06E4cfCfc13B705B655",
          network: "BSC",
          fundsGoal: 5,
          smartContractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          accounts: ["0xe0bA37eFF02939576D2593c8B01b4361F453679F"],
        },
      },
    }),
  ),
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: {
          network: "BSC",
          address: "0xF0aa1D166d26f18E0EDdB06E4cfCfc13B705B655",
          amountCaptured: 0,
          smartContractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          smartContractSymbol: "USDC",
          status: "WAITING",
          fundStatus: "WAITING",
          processStep: 1,
          processTotalSteps: 22,
          fundsGoal: 5,
          fundsExpirationAt: 1742439548,
          currentBalance: 0,
          forwardAddresses: [],
        },
      },
    }),
  ),
}))

// Mock para el modelo Simulacion
jest.mock("../models/Simulacion", () => {
  return () => ({
    save: jest.fn().mockResolvedValue(true),
  })
})

describe("API de Simulador", () => {
  // Prueba de simulación con beneficio simple
  test("POST /api/simular - Beneficio Simple", async () => {
    const res = await request(app).post("/api/simular").send({
      capital: 1000,
      plazo: 3,
      tipoBeneficio: "simple",
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("capitalInicial", 1000)
    expect(res.body).toHaveProperty("plazo", 3)
    expect(res.body).toHaveProperty("tasaMensual", 1)
    expect(res.body).toHaveProperty("tipoBeneficio", "simple")
    expect(res.body).toHaveProperty("tabla")
    expect(res.body.tabla.length).toBe(3)
  })

  // Prueba de simulación con beneficio compuesto
  test("POST /api/simular - Beneficio Compuesto", async () => {
    const res = await request(app).post("/api/simular").send({
      capital: 1000,
      plazo: 3,
      tipoBeneficio: "compuesto",
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("capitalInicial", 1000)
    expect(res.body).toHaveProperty("plazo", 3)
    expect(res.body).toHaveProperty("tasaMensual", 1)
    expect(res.body).toHaveProperty("tipoBeneficio", "compuesto")
    expect(res.body).toHaveProperty("tabla")
    expect(res.body.tabla.length).toBe(3)
  })

  // Prueba de creación de pago
  test("POST /api/crear-pago", async () => {
    const res = await request(app).post("/api/crear-pago").send({
      fundsGoal: 1000,
    })

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toHaveProperty("address")
    expect(res.body.data).toHaveProperty("network", "BSC")
  })

  // Prueba de verificación de pago
  test("GET /api/verificar-pago/:address", async () => {
    const res = await request(app).get("/api/verificar-pago/0xF0aa1D166d26f18E0EDdB06E4cfCfc13B705B655")

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty("data")
    expect(res.body.data).toHaveProperty("address")
    expect(res.body.data).toHaveProperty("status")
  })
})

