const HelpPage = () => {
    return (
      <div className="help-page">
        <h1>Ayuda</h1>
        <div className="help-content">
          <h2>Bienvenido a la página de ayuda</h2>
          <p>
            Este proyecto es un simulador de comisiones diseñado para ayudarte a
            gestionar tus cálculos de manera eficiente.
          </p>
          <h3>Características:</h3>
          <ul>
            <li>Interfaz simple y fácil de usar</li>
            <li>Cálculos rápidos y precisos</li>
            <li>Opciones personalizables</li>
          </ul>
          <h3>Cómo empezar:</h3>
          <ol>
            <li>Clona este repositorio desde GitHub</li>
            <li>Instala las dependencias ejecutando <code>npm install</code></li>
            <li>Inicia la aplicación con <code>npm start</code></li>
          </ol>
          <p>
            Si necesitas más información, revisa el repositorio en GitHub:{" "}
            <a
              href="https://github.com/franciscoghp"
              target="_blank"
              rel="noopener noreferrer"
              className="help-link"
            >
              franciscoghp
            </a>
          </p>
        </div>
      </div>
    );
  };
  
  export default HelpPage;