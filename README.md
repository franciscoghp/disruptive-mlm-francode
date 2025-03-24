# Simulador de Comisiones - MERN Stack
## Ing. Francisco Herrera

## 📋 Descripción

El Simulador de Comisiones es una aplicación web desarrollada con el stack MERN (MongoDB, Express, React, Node.js) que permite a los usuarios calcular cuánto dinero pueden ganar en un rango de tiempo según un capital semilla y diferentes plazos de inversión. La aplicación incluye funcionalidades para simular inversiones, generar códigos QR para pagos en criptomonedas y verificar el estado de los pagos.

## ✨ Características

- **Simulación de inversión** con diferentes plazos (3, 6, 9 y 12 meses)
- **Opciones de beneficio simple o interés compuesto**
- **Cálculo de fee** según el monto invertido
- **Exportación de resultados a CSV**
- **Generación de código QR** para pagos en criptomonedas
- **Verificación del estado de pago**
- **Interfaz responsiva** adaptada a dispositivos móviles y de escritorio
- **Navegación intuitiva** con barra de navegación y página de ayuda


## 🛠️ Tecnologías

- **Frontend**: React, React Router, CSS3, QRCode.react
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Testing**: Jest, React Testing Library
- **Integración de Pagos**: API de Disruptive Payments


## 📦 Requisitos previos

- Node.js v16 o superior
- MongoDB (local o en la nube)
- npm o yarn
- Git


## 🚀 Instalación y ejecución

### Clonar el repositorio

```shellscript
git clone https://github.com/franciscoghp/disruptive-mlm-francode.git
cd disruptive-mlm-francode
```

### Configurar el Backend

```shellscript
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env con las variables de entorno necesarias
# Ejemplo:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/simulador-comisiones
# API_CLIENT_KEY=your_api_key

# Iniciar el servidor
npm start
```

### Configurar el Frontend

```shellscript
# Desde la raíz del proyecto, navegar a la carpeta del frontend
cd ../client

# Instalar dependencias
npm install

# Iniciar la aplicación React
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Ejecutar pruebas

```shellscript
# Para ejecutar las pruebas del frontend
cd client
npm test

# Para ejecutar pruebas específicas
npm test -- -t "Componente ResultadoTabla"
```

## 📱 Capturas de pantalla

![home](<./assets/Screenshot 2025-03-24 104148.png>)

![tabla](<./assets/Screenshot 2025-03-24 104613.png>)

![QR](<./assets/Screenshot 2025-03-24 104714.png>)

![status](<./assets/Screenshot 2025-03-24 104756.png>)

## 🔧 Estructura del proyecto

```plaintext
disruptive-mlm-francode/
├── backend/                # Servidor Express
│   ├── controllers/        # Controladores de la API
│   ├── models/             # Modelos de MongoDB
│   ├── routes/             # Rutas de la API
│   ├── tests/              # Pruebas
│   ├── server.js           # Punto de entrada del servidor
│   └── package.json        # Dependencias del backend
│
├── frontend/                 # Aplicación React
│   ├── public/             # Archivos estáticos
│   ├── src/                # Código fuente
│   │   ├── components/     # Componentes React
│   │   ├── tests/          # Pruebas unitarias
│   │   ├── App.js          # Componente principal
│   │   └── index.js        # Punto de entrada
│   └── package.json        # Dependencias del frontend
│
└── README.md               # Documentación del proyecto
```

## 👥 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request


## 📞 Contacto

Francisco Herrera - [@franciscoghp](https://github.com/franciscoghp) - [francisco9mil@gmail.com](mailto:francisco9mil@gmail.com)

Link del proyecto: [https://github.com/franciscoghp/disruptive-mlm-francode](https://github.com/franciscoghp/disruptive-mlm-francode)