import React, { useState } from 'react';

const Hero = () => {
  const [imagenActual, setImagenActual] = useState(0);

  const imagenesBanner = [
    '/img/Elden Ring.webp',
    '/img/The Legend of ZeldaTears of the Kingdom.avif',
    '/img/God of War Ragnarök.webp',
    '/img/Halo Infinite1.webp'
  ];

  const siguienteImagen = () => {
    setImagenActual((prev) => (prev === imagenesBanner.length - 1 ? 0 : prev + 1));
  };

  const anteriorImagen = () => {
    setImagenActual((prev) => (prev === 0 ? imagenesBanner.length - 1 : prev - 1));
  };

  return (
    /* AQUÍ AGREGAMOS EL id="home" */
    <section className="hero" id="home">
      <div className="hero-text">
        <h2>TIENDA GAMER</h2>
        <p>Encuentra los mejores títulos para PlayStation, Xbox, Nintendo Switch y PC con entrega inmediata.</p>
        <a href="#productos-destacados" className="btn-primary">Ver catálogo</a>
      </div>
      <div className="hero-image">
        <div className="carousel">
          <div className="carousel-slide active">
            <img src={imagenesBanner[imagenActual]} alt="Banner Principal" />
          </div>
          <button className="carousel-btn prev" onClick={anteriorImagen}>&#10094;</button>
          <button className="carousel-btn next" onClick={siguienteImagen}>&#10095;</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;