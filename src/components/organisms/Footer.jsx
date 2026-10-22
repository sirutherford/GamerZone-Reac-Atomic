import React from 'react';

const Footer = ({ navegarA }) => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-info">
          <h4>GamerZone</h4>
          <p>Tu tienda de videojuegos de confianza con los mejores títulos y entregas inmediatas.</p>
        </div>

        <div className="footer-links">
          <h5>Enlaces rápidos</h5>
          <ul>
            <li>
              <a href="#" onClick={(e) => { e.preventDefault(); navegarA && navegarA('home'); }}>
                Home
              </a>
            </li>
            <li>
              <a href="#productos-destacados" onClick={(e) => { e.preventDefault(); navegarA && navegarA('productos'); }}>
                Productos
              </a>
            </li>
            <li>
              <a href="#nosotros" onClick={(e) => { e.preventDefault(); navegarA && navegarA('nosotros'); }}>
                Nosotros
              </a>
            </li>
            <li>
              <a href="#blogs" onClick={(e) => { e.preventDefault(); navegarA && navegarA('home', 'blogs'); }}>
                Blogs
              </a>
            </li>
            <li>
              <a href="#contacto" onClick={(e) => { e.preventDefault(); navegarA && navegarA('home', 'contacto'); }}>
                Contacto
              </a>
            </li>
            <li>
              <a href="#nosotros" onClick={(e) => { e.preventDefault(); navegarA && navegarA('nosotros'); }}>
                Equipo GZ
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h5>Síguenos</h5>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i className="fab fa-discord"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GamerZone. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;