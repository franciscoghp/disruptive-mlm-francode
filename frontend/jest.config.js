module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest", // Usa Babel para transformar archivos JS y JSX
    },
    transformIgnorePatterns: [
      "node_modules/(?!axios)", // Ignora todos los módulos excepto axios
    ],
  };