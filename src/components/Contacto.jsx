import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'consulta',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Gracias ${formData.nombre}! Tu mensaje ha sido enviado con éxito.`);
    setFormData({ nombre: '', email: '', asunto: 'consulta', mensaje: '' });
  };

  return (
    <section className="seccion-contacto" id="contacto">
      <div className="container">
        <h2 className="titulo-seccion">Contáctanos</h2>
        <p className="subtitulo-contacto">¿Tienes alguna duda o consulta? Escríbenos y te responderemos a la brevedad.</p>
        
        <form className="formulario-contacto" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@correo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto</label>
            <select id="asunto" name="asunto" value={formData.asunto} onChange={handleChange}>
              <option value="consulta">Consulta General</option>
              <option value="soporte">Soporte técnico</option>
              <option value="ventas">Información de envíos</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-primary btn-enviar">Enviar Mensaje</button>
        </form>
      </div>
    </section>
  );
};

export default Contacto;