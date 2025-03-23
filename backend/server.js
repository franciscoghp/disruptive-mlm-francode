const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const simuladorRoutes = require("./routes/simulador")

// Cargar variables de entorno
dotenv.config()

const app = express()

// Configuración de CORS más específica
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://tu-dominio-frontend.com"] // Reemplaza con tu dominio real
      : "http://localhost:3000",
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
// Middleware
app.use(express.json())

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/simulador-comisiones", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB conectado correctamente")
    console.log("Usando URI:", process.env.MONGO_URI ? "Variable de entorno configurada" : "URI local por defecto")
  })
  .catch((err) => console.error("Error conectando a MongoDB:", err))

// Rutas
app.use("/api", simuladorRoutes)

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("¡Algo salió mal!")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))

