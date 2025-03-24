const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} Simulador de Comisiones. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="/" className="footer-link">
            Términos y Condiciones
          </a>
          <span className="footer-divider">|</span>
          <a href="/" className="footer-link">
            Política de Privacidad
          </a>
          <span className="footer-divider">|</span>
          <a href="/" className="footer-link">
            Contacto
          </a>
        </div>
        <p className="footer-message">
          Develop with ❤️ by{" "}
          <a
            href="https://github.com/franciscoghp"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            franciscoghp
          </a>
        </p>
        <div className="contact-info">
          <p>Contáctame:</p>
          <p>
            WhatsApp:{" "}
            <a
              href="https://wa.me/584141452293"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              +584141452293
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="francisco9mil@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              francisco9mil@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;